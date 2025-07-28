import { FC, useEffect, useState, useMemo } from "react";
import {
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import { CourseType } from "./store/courses/types";
import { fetchCurrentUser, logoutUser } from "./store/user/thunk";
import {
    fetchCourses,
    addNewCourse,
    updateExistingCourse,
} from "./store/courses/thunk";
import { fetchAuthors } from "./store/authors/thunk";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import EmptyCourseList from "./components/EmptyCourseList/EmptyCourseList";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import CourseForm from "./components/CourseForm/CourseForm";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import useSearch from "./helpers/useSearch";
import Loader from "./components/Loader/Loader";

const App: FC = () => {
    const { isAuth, name, role } = useAppSelector(state => state.user);
    const courses = useAppSelector(state => state.courses || []);
    const authors = useAppSelector(state => state.authors || []);
    const { searchInput, filterText, handleSearch, handleSearchInput } =
        useSearch();

    const [isInitialized, setIsInitialized] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        const initializeApp = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                await Promise.all([
                    dispatch(fetchCurrentUser()),
                    dispatch(fetchCourses()),
                    dispatch(fetchAuthors()),
                ]);
                if (location.pathname !== "/courses") {
                    navigate("/courses", { replace: true });
                }
            } else {
                navigate("/login", { replace: true });
            }

            setIsInitialized(true);
        };
        initializeApp();
    }, []);

    const handleSaveCourse = (
        courseData: Omit<CourseType, "id" | "creationDate">,
        courseId = ""
    ) => {
        if (courseId) {
            dispatch(updateExistingCourse(courseId, courseData));
        } else {
            dispatch(addNewCourse(courseData));
        }
    };

    const filteredCourses = useMemo(() => {
        return courses.filter(
            course =>
                course.id.toLowerCase().includes(filterText.toLowerCase()) ||
                course.title.toLowerCase().includes(filterText.toLowerCase())
        );
    }, [courses, filterText]);

    const logout = () => {
        dispatch(logoutUser());
        navigate("/login", { replace: true });
    };

    if (!isInitialized || role === undefined) {
        return <Loader />;
    }

    return (
        <>
            <Header username={name} isAuth={isAuth} onClick={logout} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route element={<PrivateRoute isAuth={isAuth} />}>
                    <Route
                        path="/courses"
                        element={
                            courses.length > 0 ? (
                                <Courses
                                    courses={filteredCourses}
                                    authorsList={authors}
                                    handleSearchInput={handleSearchInput}
                                    handleSearch={handleSearch}
                                    searchInput={searchInput}
                                />
                            ) : (
                                <EmptyCourseList />
                            )
                        }
                    />
                    <Route
                        path="/courses/:courseId"
                        element={
                            <CourseInfo
                                courses={courses}
                                authorsList={authors}
                            />
                        }
                    />
                    <Route
                        path="/courses/add"
                        element={
                            <PrivateRoute
                                isAuth={isAuth}
                                userRole={role}
                                allowedRoles={["admin"]}
                                redirectTo="/courses"
                            >
                                <CourseForm
                                    onSaveCourse={handleSaveCourse}
                                    authorsList={authors}
                                />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/courses/update/:courseId"
                        element={
                            <PrivateRoute
                                isAuth={isAuth}
                                userRole={role}
                                allowedRoles={["admin"]}
                                redirectTo="/courses"
                            >
                                <CourseForm
                                    onSaveCourse={handleSaveCourse}
                                    authorsList={authors}
                                />
                            </PrivateRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/courses" />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
