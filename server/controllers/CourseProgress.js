const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  try {
    // 1. Validate subsection
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Invalid subsection",
      });
    }

    // 2. Find course progress (FIXED FIELD NAME)
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,   // ✅ FIXED
      userId: userId,
    });

    // 3. CREATE progress if not exists (IMPORTANT)
    if (!courseProgress) {
      courseProgress = await CourseProgress.create({
        courseId,
        userId,
        completedVideos: [],
      });
    }

    // 4. Prevent duplicate completion
    if (courseProgress.completedVideos.includes(subsectionId)) {
      return res.status(400).json({
        success: false,
        message: "Lecture already completed",
      });
    }

    // 5. Mark lecture as completed
    courseProgress.completedVideos.push(subsectionId);
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course progress updated successfully",
    });

  } catch (error) {
    console.error("UPDATE COURSE PROGRESS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
