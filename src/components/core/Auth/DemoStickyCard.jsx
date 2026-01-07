import { ACCOUNT_TYPE } from "../../../utils/constants"
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa"
import { HiLightningBolt } from "react-icons/hi"

function DemoStickyCard({ onDemoLogin }) {
  return (
    <div className="pointer-events-auto absolute left-[90%] top-[20px] hidden lg:block">
      
      <div className="origin-top animate-demo-swing">
        
        <div className="relative w-[300px] rotate-[-12deg] rounded-xl bg-gradient-to-br from-richblack-700 to-richblack-800 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.55)] ring-1 ring-richblack-600">

          <div className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-yellow-300 shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-600" />
          </div>

          <div className="mb-4 flex items-center gap-2 text-yellow-50">
            <HiLightningBolt className="text-yellow-300" />
            <h3 className="text-lg font-semibold tracking-wide">
              Take a Demo
            </h3>
          </div>

          <button
            onClick={() => onDemoLogin(ACCOUNT_TYPE.INSTRUCTOR)}
            className="group mb-3 flex w-full items-center gap-3 rounded-lg bg-yellow-50 px-3 py-2 text-sm font-semibold text-richblack-800 transition-all duration-300 hover:-translate-y-0.5"
          >
            <FaChalkboardTeacher className="text-richblack-900 transition group-hover:scale-110" />
            Click Here For Instructor Demo
          </button>

          <button
            onClick={() => onDemoLogin(ACCOUNT_TYPE.STUDENT)}
            className="group flex w-full items-center gap-3 rounded-lg bg-yellow-50 px-3 py-2 text-sm font-semibold text-richblack-800 transition-all duration-300 hover:-translate-y-0.5"
          >
            <FaUserGraduate className="transition group-hover:scale-110" />
            Click Here For Student Demo
          </button>

          <p className="mt-3 text-center text-xs text-richblack-300">
            No Signup • No OTP • No Login
          </p>
        </div>
      </div>
    </div>
  )
}

export default DemoStickyCard
