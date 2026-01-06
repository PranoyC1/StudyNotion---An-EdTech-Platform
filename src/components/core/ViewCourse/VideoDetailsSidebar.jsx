import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack, IoIosClose } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    if (!courseSectionData.length) return

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx =
      courseSectionData[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )

    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[
        currentSubSectionIndx
      ]?._id

    setActiveStatus(courseSectionData[currentSectionIndx]?._id)
    setVideoBarActive(activeSubSectionId)
  }, [courseSectionData, location.pathname])

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-[4.5rem] left-3 z-40 rounded-sm bg-richblack-700 p-2 text-white md:hidden"
      >
        ☰
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
        fixed md:static top-0 left-0 z-50
        h-[calc(100vh-3.5rem)]
        w-[280px] sm:w-[300px]
        bg-richblack-800 border-r border-richblack-700
        flex flex-col
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        {/* HEADER */}
        <div className="mx-5 flex flex-col gap-4 border-b border-richblack-600 py-5 text-richblack-25">
          <div className="flex items-center justify-between">
            <div
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="flex h-9 w-9 items-center justify-center text-richblack-50 hover:text-yellow-50 hover:scale-110 transition-all duation-200"
            >
              <IoIosArrowBack size={20} />
            </div>

            <IconBtn
              text="Add Review"
              onclick={() => setReviewModal(true)}
            />

            {/* MOBILE CLOSE */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-richblack-50 hover:text-yellow-50 hover:scale-110 transition-all duation-200"
            >
              <IoIosClose size={30} />
            </button>
          </div>

          <div>
            <p className="text-base font-semibold line-clamp-2">
              {courseEntireData?.courseName}
            </p>
            <p className="text-sm text-richblack-400">
              {completedLectures?.length} / {totalNoOfLectures} Lectures
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto">
          {courseSectionData.map((course) => (
            <div key={course._id} className="text-sm text-richblack-5">
              {/* SECTION */}
              <div
                onClick={() => setActiveStatus(course._id)}
                className="flex justify-between items-center bg-richblack-600 px-5 py-4 cursor-pointer"
              >
                <p className="w-[70%] font-semibold">
                  {course.sectionName}
                </p>

                <div className="flex items-center gap-2 text-xs">
                  <span>{course.subSection.length} Lessons</span>
                  <BsChevronDown
                    className={`transition-transform duration-300 ${
                      activeStatus === course._id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* SUBSECTIONS */}
              {activeStatus === course._id && (
                <div>
                  {course.subSection.map((topic) => (
                    <div
                      key={topic._id}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course._id}/sub-section/${topic._id}`
                        )
                        setVideoBarActive(topic._id)
                        setIsOpen(false)
                      }}
                      className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition
                        ${
                          videoBarActive === topic._id
                            ? "bg-yellow-200 text-richblack-900 font-semibold"
                            : "hover:bg-richblack-900"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic._id)}
                        readOnly
                      />
                      <span className="line-clamp-1">{topic.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
