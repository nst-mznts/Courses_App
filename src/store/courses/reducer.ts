import { CoursesActionTypes, CourseType, CoursesAction } from "./types.js";

export const initCoursesState = [] as CourseType[];

export function coursesReducer(
    state = initCoursesState,
    action: CoursesAction
): CourseType[] {
    switch (action.type) {
        case CoursesActionTypes.UPDATE_COURSE:
            return state.map(course =>
                course.id === action.payload.id ? action.payload : course
            );
        case CoursesActionTypes.ADD_COURSE:
            return [...state, action.payload];
        case CoursesActionTypes.DELETE_COURSE:
            return state.filter(course => course.id !== action.payload);
        case CoursesActionTypes.FETCH_COURSES:
            return action.payload;
        default:
            return state;
    }
}
