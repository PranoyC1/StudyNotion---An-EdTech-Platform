import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  courseSectionData: [],
  courseEntireData: {},     // ✅ object hona chahiye
  completedLectures: [],
  totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
    },

    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
    },

    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },

    // 🔥 BACKEND SE AAYA DATA (HYDRATION)
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },

    // 🔥 OPTIMISTIC UPDATE (NO DUPLICATES)
    updateCompletedLectures: (state, action) => {
      if (!state.completedLectures.includes(action.payload)) {
        state.completedLectures.push(action.payload)
      }
    },
  },
})

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer
