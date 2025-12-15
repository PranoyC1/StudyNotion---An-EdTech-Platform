const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { mongoose } = require("mongoose");

// Create Rating
exports.createRating = async(req,res) => {
    try{
        // Get id
        const userId = req.user.id; 
        // Fetch data from User.body
        const {rating,review,courseId} = req.body;
        // Validation (check if user enrolled or not)
        const courseDetails = await Course.findOne(
            {_id:courseId,
            studentsEnrolled: {$elemMatch: {$eq: userId}}}
        );
        if(!courseDetails){
            return res.status(404).json({
                status:false,
                message:"Student is not Enrolled"
            })
        };
        // Check if user already reviewed
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        });
        if(!alreadyReviewed){
            return res.status(400).json({
                status:false,
                message:"Already Reviewed by the user"
            })
        };
        // Create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId
        });
        // Update Course with rating and review
        await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id
                }
            },
            {new:true}
        );
        // Return Response 
        return res.status(200).json({
            status:true,
            message:"Rating and Review Successfully Submitted"
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            status:false,
            message:"Something Went Wrong. Try Again...",
            error:error.message
        })
    }
}


// Getting Avg Rating

exports.getAverageRating = async(req,res)=>{
    try{
        // Get Course Id
        const courseId = res.body.courseId; 
        // Calculate Avg Rating
        const result = await RatingAndReview.aggregate(
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            },
        )
        // Return Rating
        if(result.length > 0){
            return res.status(200).json({
                status:true,
                averageRating:result[0].averageRating
            });
        }
        return res.status(200).json({
            status:true,
            message:`Average rating is 0, no ratings given`,
            averageRating:0
        });
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            status:false,
            message:"Something Went Wrong. Try Again...",
            error:error.message
        });
    }
}


// Getting all Rating and Review
exports.getAllRatingReview = async (req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({path:"user",select:"firstName lastName email image"})
        .populate({path:"course",select:"courseName"})
        .exec();

        return res.status(200).json({
            status:true,
            message:`All Reviews Fetched Successfully`,
            data:allReviews
        }); 
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            status:false,
            message:"Something Went Wrong. Try Again...",
            error:error.message
        });
    }
}