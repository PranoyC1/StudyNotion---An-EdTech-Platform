import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import DemoStickyCard from "./DemoStickyCard"
import { login } from "../../../services/operations/authAPI"
import { ACCOUNT_TYPE } from "../../../utils/constants"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDemoLogin = (type) => {
    const password = "1111"
    const email =
      type === ACCOUNT_TYPE.STUDENT
        ? "yiganel690@cameltok.com"
        : "podegi6775@icousd.com"

    dispatch(login(email, password, navigate))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 relative">
          
          {/* LEFT */}
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0 relative">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>

            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>

            {formType === "signup" ? (
              <SignupForm />
            ) : (
              <LoginForm onDemoLogin={handleDemoLogin} />
            )}

            {/* FLOATING DEMO PAPER */}
            {formType === "login" && (
              <DemoStickyCard onDemoLogin={handleDemoLogin} />
            )}
          </div>

          {/* RIGHT IMAGE (UNCHANGED) */}
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img src={frameImg} alt="Pattern" loading="lazy" />
            <img
              src={image}
              alt="Students"
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>

        </div>
      )}
    </div>
  )
}

export default Template
