import React from 'react'
import CTAButton from './Button'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from './HighlightText'
import InstructorImage from '../../../assets/Images/Instructor.png'

const InstructorSection = () => {
  return (
    <div className='mt-14'>
        <div className='flex flex-row gap-10 items-center'>

            <div className='w-[35vw] mr-20'>
                <img
                    src={InstructorImage}
                    alt='InstructorImage'
                    className='shadow-white ml-10'
                />
            </div>
            <div className='w-[50%] flex flex-col ml-10'>
                <div className='font-bold text-4xl mb-10 w-[50%]'>
                    Become an 
                    <HighlightText text="Instructor"/>
                </div>
                <p className='font-md text-[16px] w-[70%] text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We 
                    provide the tools and skills to teach what you love.
                </p>
                <div className="w-fit mt-14">
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex items-center gap-2'>
                            Explore Full Catalog
                            <FaArrowRight className='mt-0.5'/>
                        </div>
                    </CTAButton>
                </div>
            </div>

        </div>
    </div>
  )
}

export default InstructorSection