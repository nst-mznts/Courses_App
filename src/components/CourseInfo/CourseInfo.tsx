import { FC } from "react";
import { useParams } from "react-router-dom";

import Button from "../../common/Button/Button";
import CourseInfoList from "../Courses/components/CourseInfoList/CourseInfoList";
import { BUTTON_TEXT } from "../../constants";
import { CourseType } from "../../store/courses/types";
import { AuthorType } from "../../store/authors/types";
import getFormattedCourseData from "../../helpers/getFormattedCourseData";

import "./CourseInfo.scss";

interface CourseInfoProps {
    courses: CourseType[];
    authorsList: AuthorType[];
}

const CourseInfo: FC<CourseInfoProps> = ({ courses, authorsList }) => {
    const params = useParams();
    const currentCourse = courses.find(course => course.id === params.courseId);

    const {
        title,
        description,
        formattedDuration,
        formattedCreationDate,
        authors,
    } = getFormattedCourseData(currentCourse!, authorsList);

    const infoItems = [
        { label: "ID:", value: currentCourse!.id },
        { label: "Duration:", value: formattedDuration },
        { label: "Created:", value: formattedCreationDate },
        { label: "Authors:", value: authors },
    ];

    return (
        <main>
            <div className="wrapper flex--column main--wrapper">
                <section className="card--wrapper flex--column">
                    <h3 className="title--h3">{title}</h3>
                    <div className="current-course--wrapper flex--column">
                        <div className="current-course flex--column">
                            <h4 className="title--h4">Description:</h4>
                            <div className="current-course--content flex--row">
                                <p className="current-course--description text--b1">
                                    {description}
                                </p>
                                <span className="current-course--line"></span>
                                <div className="current-course--duration">
                                    <CourseInfoList items={infoItems} />
                                </div>
                            </div>
                        </div>
                        <Button
                            buttonText={BUTTON_TEXT.BACK}
                            type="link"
                            to="/courses"
                            buttonStyles="button rectangular-button colored"
                        />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default CourseInfo;
