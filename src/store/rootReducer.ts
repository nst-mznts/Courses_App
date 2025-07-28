import { combineReducers } from "@reduxjs/toolkit";

import { coursesReducer } from "./courses/reducer.js";
import { AuthorsReducer } from "./authors/reducer.js";
import { userReducer } from "./user/reducer.js";

const rootReducer = combineReducers({
    user: userReducer,
    courses: coursesReducer,
    authors: AuthorsReducer,
});

export default rootReducer;
