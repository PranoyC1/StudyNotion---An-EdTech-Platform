import React from 'react'
import HighlightText from "./HighlightText"
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './Button'
const LearningLanguageSection = () => {
  return (
    <div className='mt-[120px] mr-20'>
      <div className='flex flex-col items-center'>

        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife for
          <HighlightText text={" Learning Any Language"}/>
        </div>
        <div className='text-richblack-600 text-center mx-auto text-base mt-2 w-[70%]'>
          Using spin making learing multiple languages easy with 20+ languages realistic voice-over,
          progress tracking, custom schedule and more.
        </div>


        <div className='flex flex-row gap-5 justify-center items-center mt-5'>
          <img
            src={know_your_progress}
            alt='know_your_progress'
            className='object-contain w-[30%] -mr-28'
          />
          <img
            src={compare_with_others}
            alt='compare_with_others'
            className='object-contain w-[30%]'
          />
          <img
            src={plan_your_lesson}
            alt='plan_your_lesson'
            className='object-contain w-[30%] -ml-32'
          />
        </div>

        <div className='w-fit mt-6 mb-10'>
          <CTAButton
            linkto={"/signup"}
            active={true}
          >
            Learn More
          </CTAButton>
        </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection