import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        logo: Logo1,
        heading:"Leadership",
        description:"Fully Committed to the Success Company"
    },
    {
        logo: Logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"
    },
    {
        logo: Logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"
    },
    {
        logo: Logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"
    },
]

const TimeLineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-12 items-center'>

            <div className='w-[45%] flex flex-col gap-5'>
                {
                    timeline.map( (element, index) => {
                        return (
                            <div className='flex flex-row gap-5' key={index}>

                                <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-[100%]'>
                                    <img src={element.logo} alt='Logo'/>
                                </div>

                                <div>
                                    <h2 className='font-bold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.description}</p>
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <div className='relative shadow-blue-200'>
                <img src={timelineImage} alt='timelineImage' className="object-cover h-fit w-[35vw] rounded-sm shadow-[0_0_40px_rgba(56,189,248,0.6)]"/>

                <div className="absolute bg-caribbeangreen-700 text-white uppercase 
                                py-4 sm:py-3 xs:py-2 rounded-md w-[90%] ml-6 -translate-y-[50%]
                                lg:grid grid-cols-2 hidden">

                  <div className='flex flex-col items-center justify-center border-r border-caribbeangreen-100 px-4 text-center'>
                    <p className='text-2xl font-bold'>10</p>
                    <p className='text-caribbeangreen-200 text-sm whitespace-nowrap'>
                      Years of Experience
                    </p>
                  </div>

                  <div className='flex flex-col items-center justify-center px-4 text-center'>
                    <p className='text-2xl font-bold'>250</p>
                    <p className='text-caribbeangreen-200 text-sm whitespace-nowrap'>
                      Type of Courses
                    </p>
                  </div>

                </div>

            </div>

        </div>
    </div>
  )
}

export default TimeLineSection