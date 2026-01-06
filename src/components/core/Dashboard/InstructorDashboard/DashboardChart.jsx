import React, { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Doughnut } from "react-chartjs-2"

Chart.register(...registerables)

const DashboardChart = ({ courses }) => {
  const [type, setType] = useState("students")

  const colors = [
    "#FACC15",
    "#60A5FA",
    "#34D399",
    "#F472B6",
    "#A78BFA",
  ]

  const data = {
    labels: courses.map((c) => c.courseName),
    datasets: [
      {
        data:
          type === "students"
            ? courses.map((c) => c.totalStudentsEnrolled)
            : courses.map((c) => c.totalAmountGenerated),
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Course Analytics</h2>

        <div className="flex flex-col sm:flex-row bg-richblack-700 rounded-lg overflow-hidden">
          {["students", "income"].map((item) => (
            <button
              key={item}
              onClick={() => setType(item)}
              className={`px-4 py-2 text-sm transition ${
                type === item
                  ? "bg-yellow-50 text-black"
                  : "text-white"
              }`}
            >
              {item === "students" ? "Students" : "Income"}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[420px] h-[320px] sm:h-[360px] md:h-[420px] mx-auto">
        <Doughnut
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
              legend: {
                position: "bottom",
                labels: { color: "#E5E7EB" },
              },
            },
          }}
        />

      </div>
    </div>
  )
}

export default DashboardChart
