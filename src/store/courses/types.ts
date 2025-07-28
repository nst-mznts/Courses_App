export const enum CoursesActionTypes {
    ADD_COURSE = "ADD_COURSE",
    DELETE_COURSE = "DELETE_COURSES",
    FETCH_COURSES = "FETCH_COURSES",
    UPDATE_COURSE = "UPDATE_COURSE",
}

export type CourseType = {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
};

export interface UpdateCourse {
    type: CoursesActionTypes.UPDATE_COURSE;
    payload: CourseType;
}

export interface AddCourse {
    type: CoursesActionTypes.ADD_COURSE;
    payload: CourseType;
}

export interface DeleteCourse {
    type: CoursesActionTypes.DELETE_COURSE;
    payload: string;
}

export interface FetchCourses {
    type: CoursesActionTypes.FETCH_COURSES;
    payload: CourseType[];
}

export type CoursesAction =
    | UpdateCourse
    | AddCourse
    | DeleteCourse
    | FetchCourses;
