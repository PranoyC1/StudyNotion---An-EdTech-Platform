import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getInstructorDashboard } from "../../../../services/operations/profileAPI"
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { Link } from "react-router-dom"
import DashboardChart from "./DashboardChart"

const Instructor = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const dashboard = await getInstructorDashboard(token)
        const coursesData = await fetchInstructorCourses(token)

        if (dashboard) setStats(dashboard)
        if (coursesData) setCourses(coursesData)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token])

  const totalIncome = stats.reduce((a, b) => a + b.totalAmountGenerated, 0)
  const totalStudents = stats.reduce((a, b) => a + b.totalStudentsEnrolled, 0)

  if (loading) {
    return <div className="spinner mx-auto mt-20"></div>
  }

  return (
    <div className="p-6 text-white space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-bold tracking-tight">
          Hi!, {user?.firstName} 👋
        </h1>
        <p className="text-richblack-300 mt-2">
          Here’s what’s happening with your courses today
        </p>
      </header>

      {courses.length > 0 ? (
        <>
          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Courses" value={courses.length} />
            <StatCard title="Total Students" value={totalStudents} />
            <StatCard title="Total Revenue" value={`₹ ${totalIncome}`} />
          </section>

          {/* Chart + Courses */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-2 bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl p-6 shadow-lg">
              <DashboardChart courses={stats} />
            </div>

            {/* Courses */}
            <div className="bg-richblack-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Courses</h2>
                <Link
                  to="/dashboard/my-courses"
                  className="text-yellow-50 text-sm hover:underline"
                >
                  View all
                </Link>
              </div>

              {courses.slice(0, 4).map((course) => (
                <div
                  key={course._id}
                  className="flex gap-4 items-center bg-richblack-700 rounded-xl p-3 hover:scale-[1.02] transition"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-16 w-24 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.studentsEnrolled?.length || 0} students · ₹{course.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

export default Instructor

const StatCard = ({ title, value }) => (
  <div className="bg-richblack-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
    <p className="text-sm text-richblack-300">{title}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
)

const EmptyState = () => (
  <div className="bg-richblack-800 rounded-2xl p-10 text-center">
    <p className="text-lg mb-4">You Haven’t Created Any Course Yet</p>
    <Link
      to="/dashboard/add-course"
      className="inline-block bg-yellow-50 text-black px-6 py-2 rounded-lg font-semibold"
    >
      Create Your First Course
    </Link>
  </div>
)
