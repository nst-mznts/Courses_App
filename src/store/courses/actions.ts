import {
    CoursesActionTypes,
    CourseType,
    FetchCourses,
    UpdateCourse,
    AddCourse,
    DeleteCourse,
} from "./types.js";

export const fetchCoursesSuccess = (courses: CourseType[]): FetchCourses => ({
    type: CoursesActionTypes.FETCH_COURSES,
    payload: courses,
});

export const addCourseAction = (courseData: CourseType): AddCourse => ({
    type: CoursesActionTypes.ADD_COURSE,
    payload: courseData,
});

export const deleteCourseAction = (courseId: string): DeleteCourse => ({
    type: CoursesActionTypes.DELETE_COURSE,
    payload: courseId,
});

export const updateCourseAction = (courseData: CourseType): UpdateCourse => ({
    type: CoursesActionTypes.UPDATE_COURSE,
    payload: courseData,
});
