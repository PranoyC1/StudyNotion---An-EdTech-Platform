const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  console.log("USER:", req.user);
  if (courses.length === 0) {
    return res.json({
      success: false,
      message: "Please Provide Course",
    });
  }

  let totalAmount = 0;

  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.json({
          success: false,
          message: "Unable to Find Course",
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.json({
          success: false,
          message: "Student Already Enrolled in the Course",
        });
      }

      totalAmount += course.price;
    } catch (error) {
      return res.json({
        success: false,
        message: "Something Went Wrong Getting Course",
      });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.error("RAZORPAY ERROR FULL:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  //get the payment details
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const { courses } = req.body;
  const userId = req.user.id;
  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Payment details are incomplete",
    });
  }
  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const enrolleStudent = async (courses, userId) => {
    if (!courses || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid courses and user ID",
      });
    }
    try {
      //update the course
      for (const course_id of courses) {
        console.log("verify courses=", course_id);
        const course = await Course.findByIdAndUpdate(
          course_id,
          { $push: { studentsEnrolled: userId } },
          { new: true }
        );
        //update the user
        const user = await User.updateOne(
          { _id: userId },
          { $push: { courses: course_id } },
          { new: true }
        );
        //set course progress
        const newCourseProgress = new CourseProgress({
          userID: userId,
          courseID: course_id,
        });
        await newCourseProgress.save();

        //add new course progress to user
        await User.findByIdAndUpdate(
          userId,
          {
            $push: { courseProgress: newCourseProgress._id },
          },
          { new: true }
        );
        //send email
        const recipient = await User.findById(userId);
        console.log("recipient=>", course);
        const courseName = course.courseName;
        const courseDescription = course.courseDescription;
        const thumbnail = course.thumbnail;
        const userEmail = recipient.email;
        const userName = recipient.firstName + " " + recipient.lastName;
        const emailTemplate = courseEnrollmentEmail(
          courseName,
          userName,
          courseDescription,
          thumbnail
        );
        await mailSender(
          userEmail,
          `You have successfully enrolled for ${courseName}`,
          emailTemplate
        );
      }
      return res.status(200).json({
        success: true,
        message: "Payment successful",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  try {
    //verify the signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (generatedSignature === razorpay_signature) {
      await enrolleStudent(courses, userId);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Data",
    });
  }

  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: {
            studentsEnrolled: userId,
          },
        },
        { new: true }
      );
      if (!enrollStudents) {
        return res.status(500).json({
          success: false,
          message: "Course Not Found",
        });
      }
      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: []
      })
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courseID: courseId,
            courseProgress: courseProgress._id
          },
        },
        { new: true }
      );
      const emailResponse = await mailSender(
        enrollStudents.email,
        `Successfully Enrolled Into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName}`
        )
      );
      console.log("Email Sent Success", emailResponse);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something Went Wrong on Enroll Student",
      });
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" });
  }
};

// Capture the Payment and initiate the Razorpay order
// exports.capturePayment = async(req,res) => {
//     try{
//         // get courseId and userId
//         const {course_id} = req.body;
//         const userId = req.user.id;
//         // validation
//         if(!course_id){
//             return res.json({
//                 success:false,
//                 message: "Please provide valid Course Id"
//             })
//         }
//         let course;
//         try{
//             course = await Course.findById(course_id);
//             if(!course){
//                 return res.json({
//                     success:false,
//                     message: "Could Not Find Course"
//                 })
//             }

//             const uid = new mongoose.Types.ObjectId(userId);
//             if(course.studentEnrolled.includes(uid)){
//                 return res.status(200).json({
//                     success:false,
//                     message:"Student Already Enrolled"
//                 })
//             }
//         }
//         catch(error){
//             return res.status(400).json({
//                 success:false,
//                 message: error.message
//             })
//         }
//         // order create
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId: course_id,
//                 userId
//             }
//         };

//         try{
//             //initiate the payment
//             const paymentResponse = await instance.orders.create(options);

//             return res.status(200).json({
//                 success:true,
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderId: course.orderId,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount,
//             });
//         }
//         catch(error){
//             return res.json({
//                 success:false,
//                 message:"Could not initiate order"
//             })
//         }
//     }
//     catch(error){
//         return res.status(500).json({
//             success: false,
//             message: "Something Went Wrong. Try Again..."
//         })
//     }
// }

// // Verify Signature of Razorpay
// exports.verifyPayment = async (req, res) => {
//   const razorpay_order_id = req.body?.razorpay_order_id;
//   const razorpay_payment_id = req.body?.razorpay_payment_id;
//   const razorpay_signature = req.body?.razorpay_signature;
//   const courses = req.body?.courses;
//   const userId = req.user.id;
//   if (
//     !razorpay_order_id ||
//     !razorpay_payment_id ||
//     !razorpay_signature ||
//     !courses ||
//     !userId
//   ) {
//     return res.status(200).json({ success: false, message: "Payment Failed" });
//   }
//   let body = razorpay_order_id + "|" + razorpay_payment_id;
//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(body.toString())
//     .digest("hex");
//   if (expectedSignature === razorpay_signature) {
//     await enrollStudents(courses, userId, res);
//     return res.status(200).json({ success: true, message: "Payment Verified" });
//   }
//   return res.status(200).json({ success: false, message: "Payment Failed" });
// };

// // Payment Success Email
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   const { orderId, paymentId, amount } = req.body;

//   const userId = req.user.id;

//   if (!orderId || !paymentId || !amount || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide all the details" });
//   }

//   try {
//     const enrolledStudent = await User.findById(userId);

//     await mailSender(
//       enrolledStudent.email,
//       `Payment Received`,
//       paymentSuccessEmail(
//         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//         amount / 100,
//         orderId,
//         paymentId
//       )
//     );
//   } catch (error) {
//     console.log("error in sending mail", error);
//     return res
//       .status(400)
//       .json({ success: false, message: "Could not send email" });
//   }
// };

// // Enroll Student
// const enrollStudents = async (courses, userId, res) => {
//   if (!courses || !userId) {
//     return res
//       .status(400)
//       .json({
//         success: false,
//         message: "Please Provide Course ID and User ID",
//       });
//   }

//   for (const courseId of courses) {
//     try {
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnroled: userId } },
//         { new: true }
//       );

//       if (!enrolledCourse) {
//         return res
//           .status(500)
//           .json({ success: false, error: "Course not found" });
//       }
//       console.log("Updated course: ", enrolledCourse);

//       const courseProgress = await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       });

//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//             courseProgress: courseProgress._id,
//           },
//         },
//         { new: true }
//       );

//       console.log("Enrolled student: ", enrolledStudent);

//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       );

//       console.log("Email sent successfully: ", emailResponse.response);
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ success: false, error: error.message });
//     }
//   }
// };
