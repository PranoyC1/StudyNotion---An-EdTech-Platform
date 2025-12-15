import React from 'react'
import { BiSolidRightArrowAlt } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import HomeFirstImage from '../assets/Images/boxoffice.png'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer'


export const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col text-white w-10/12 items-center justify-between'>
            <Link to={"/signup"}>

                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-right
                    transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                        group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <BiSolidRightArrowAlt />
                    </div>
                </div>

            </Link>

            <div className='text-center text-3xl font-semibold mt-8'>
                Empower Your Future with  
                <HighlightText text={"Coding Skills"} />
            </div>

            <div className='mt-4 w-[80%] text-center text-sm font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className="mt-16 relative mb-10">
              <img
                src={HomeFirstImage}
                alt="HomePage"
                className="object-cover rounded-lg relative z-10 shadow-[0_0_25px_#22c55e] [filter:brightness(1.05)]"
              />
              <span className="absolute inset-0 rounded-lg bg-[#22c55e] scale-95 -z-10 
                shadow-[0_0_40px_#22c55e]" />
            </div>


            {/* Code Section 1 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-3xl font-semibold lg:w-[80%]'>
                            Unlock Your
                            <HighlightText text={"Coding Potential "}/>
                            With Our Online Courses
                        </div>
                    }
                    subheading={
                        "Our Courses are designed and taught by industry exparts who have years of experience in the major role"
                    }
                    ctabtn1={
                        {
                            btnText: "Try It Yourself",
                            linkto: "/signup",
                            active: "true"
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/signup",
                            active: ""
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Hello World</title>\n</head>\n<body>\n<h1>Hello, World!</h1>\n<h1>Hello</h1>\n<h1>World!</h1>\n</body>\n</html>`}
                />
            </div>
            {/* Code Section 2 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-3xl font-semibold lg:w-[50%]'>
                            Start
                            <HighlightText text={"Coding In Seconds"}/>
                        </div>
                    }
                    subheading={
                        "Go ahead give it a try. Our hands on learning environment means you'll be writing real code from very first session"
                    }
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: "true"
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/signup",
                            active: ""
                        }
                    }
                    codeblock={`import React from 'react'; \n function TodayDate() \n {  \n const today = new Date().toDateString(); \n return ( \n <div> \n <h2>Today's Date:</h2> \n <p>{today}</p> \n <p>Hello Mate</p> \n <p>Let's Deep Dive into the Knowledge!</p>\n</div> )}`}
                />
            </div>

            <ExploreMore/> 
        </div>

        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>

            <div className='homepage_bg h-[260px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto'>

                <div className='h-[120px]'></div>
                    <div className='flex flex-row text-white gap-7 mt-10'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-2'>
                                Explore Full Catalog
                                <FaArrowRight className='mt-0.5'/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div className='flex items-center gap-2'>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>

            </div>

            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between mt-10 ml-0 lg:ml-40'>
              <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 mb-12 mt-10'>

                {/* Left Column */}
                <div className='text-4xl md:text-4xl font-semibold w-full lg:w-[25vw] text-center lg:text-left'>
                  Get the skills you need for a
                  <HighlightText text={"Job that is in Demand"} />
                </div>

                {/* Right Column */}
                <div className='flex flex-col gap-6 w-full lg:w-[30vw] items-center lg:items-start mb-10'>
                  <div className='text-md text-richblack-700 text-center lg:text-left'>
                    The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills
                  </div>

                  <div className='mt-6 lg:-ml-24 lg:mt-10'>
                    <CTAButton active={true} linkto={"/signup"}>
                      <div className='flex text-center gap-2'>
                        Learn More
                      </div>
                    </CTAButton>
                  </div>
                </div>

              </div>

              <TimeLineSection />
              <LearningLanguageSection />
            </div>

        </div>

        {/* Section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between
            bg-richblack-900 text-white items-center'>

            <InstructorSection/>

            <h2 className='text-center text-3xl font-semibold mt-20'>Review From Other Learners</h2>
            <ReviewSlider/> 

        </div>
        {/* Section 4 */}
        <Footer/>
    </div>
  ) 
}

export default Home