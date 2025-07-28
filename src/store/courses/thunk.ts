import { AppDispatch } from "../index.js";
import { CourseType } from "./types.js";
import {
    fetchCoursesSuccess,
    deleteCourseAction,
    addCourseAction,
    updateCourseAction,
} from "./actions.js";
import axios from "../../axios.js";

export const fetchCourses =
    () =>
    async (dispatch: AppDispatch): Promise<CourseType[]> => {
        try {
            const response = await axios.get("/courses/all");
            const courses: CourseType[] = response.data.result;
            dispatch(fetchCoursesSuccess(courses));
            return courses;
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            return [];
        }
    };

export const addNewCourse =
    (newCourse: Omit<CourseType, "id" | "creationDate">) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            const response = await axios.post("/courses/add", newCourse);

            if (!response.data.successful) {
                throw new Error("Course creation failed");
            }

            const createdCourse: CourseType = response.data.result;
            dispatch(addCourseAction(createdCourse));
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

export const updateExistingCourse =
    (
        courseId: string,
        updatedCourse: Omit<CourseType, "id" | "creationDate">
    ) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            const response = await axios.put(
                `/courses/${courseId}`,
                updatedCourse
            );

            if (!response.data.successful) {
                throw new Error("Course update failed");
            }

            const updated: CourseType = response.data.result;
            dispatch(updateCourseAction(updated));
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

export const deleteCourse =
    (courseId: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            const response = await axios.delete(`/courses/${courseId}`);
            if (response.status === 200) {
                dispatch(deleteCourseAction(courseId));
            } else {
                throw new Error("Failed to delete course");
            }
        } catch (error) {
            console.error("Delete course error:", error);
        }
    };
