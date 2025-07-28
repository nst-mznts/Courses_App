import { FC } from "react";
import { useAppSelector } from "../../store/hooks";

import { BUTTON_TEXT } from "../../constants";
import { CourseType } from "../../store/courses/types";
import { AuthorType } from "../../store/authors/types";
import Button from "../../common/Button/Button";
import CourseCard from "./components/CourseCard/CourseCard";
import SearchBar from "./components/SearchBar/SearchBar";

import "./Courses.scss";

interface CoursesProps {
    courses: CourseType[];
    authorsList: AuthorType[];
    handleSearchInput: (value: string) => void;
    handleSearch: () => void;
    searchInput: string;
}

const Courses: FC<CoursesProps> = ({
    courses,
    authorsList,
    handleSearchInput,
    handleSearch,
    searchInput,
}) => {
    const { role } = useAppSelector(state => state.user);

    return (
        <main>
            <div className="wrapper flex--column main--wrapper">
                <section className="serch--wrapper flex--row">
                    <SearchBar
                        handleSearchInput={handleSearchInput}
                        handleSearch={handleSearch}
                        searchInput={searchInput}
                    />
                    {role === "admin" && (
                        <Button
                            buttonText={BUTTON_TEXT.ADD_NEW_COURSE}
                            type="link"
                            to="/courses/add"
                            buttonStyles="button rectangular-button colored"
                        />
                    )}
                </section>
                <section className="card--wrapper flex--column">
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                authorsList={authorsList}
                            />
                        ))
                    ) : (
                        <h4 className="title--h4">No courses found</h4>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Courses;
