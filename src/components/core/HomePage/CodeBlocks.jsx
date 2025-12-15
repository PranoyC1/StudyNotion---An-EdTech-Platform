import React from 'react'
import CTAButton from './Button'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codecolor}) => {
  return (
    <div className={`flex w-[70vw] ${position} my-20 justify-between flex-col gap-6`}>

        {/* Section 1 */}
        <div className='w-[500px] lg:w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 text-base font-bold -mt-3'>
                {subheading}
            </div>

            <div className='flex gap-8 mt-8'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <div className='mt-0.5'>
                            <FaArrowRight />
                        </div>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>

        </div>

        {/* Section 1 */}
        <div className="relative group h-fit rounded-md flex flex-row py-3 text-[15px] sm:text-sm w-full lg:w-[470px] transition duration-500 bg-[#0D1117cc] overflow-hidden">

          <div
            className="absolute inset-0 z-0 bg-blue-300 opacity-20 pointer-events-none"
            style={{
              filter: 'blur(50px)',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              transform: 'scale(1.2)',
              top: '10%',
              left: '10%',
              right: '10%',
              bottom: '10%',
              position: 'absolute',
            }}
          ></div>

          {/* Content on top */}
          <div className="relative z-10 flex flex-row w-full">
          
            {/* Line Numbers */}
            <div className="text-center text-richblack-300 flex flex-col w-[10%] select-none text-gray-500 font-mono font-bold">
              {[...Array(11)].map((_, i) => (
                <p key={i}>{i + 1}</p>
              ))}
            </div>
            
            {/* Code */}
            <div className="w-[90%]">
              <TypeAnimation
                sequence={[codeblock, 2000, ""]}
                cursor={true}
                repeat={Infinity}
                style={{
                  whiteSpace: "pre-line",
                  display: "block",
                  color: "#34D399",
                  fontFamily: "sans-serif"
                }}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>


    </div>
  )
}

export default CodeBlocks