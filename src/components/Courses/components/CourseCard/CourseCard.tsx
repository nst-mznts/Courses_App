import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";

import { deleteCourse } from "../../../../store/courses/thunk";
import { MdDelete, MdEdit } from "react-icons/md";
import { CourseType } from "../../../../store/courses/types";
import { BUTTON_TEXT } from "../../../../constants";
import getFormattedCourseData from "../../../../helpers/getFormattedCourseData";
import Button from "../../../../common/Button/Button";
import CourseInfoList from "../CourseInfoList/CourseInfoList";

import "./CourseCard.scss";

interface CourseCardProps {
    course: CourseType;
    authorsList: { id: string; name: string }[];
}

const CourseCard: FC<CourseCardProps> = ({ course, authorsList }) => {
    const { role } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        title,
        description,
        formattedDuration,
        formattedCreationDate,
        authors,
    } = getFormattedCourseData(course, authorsList);

    const infoItems = [
        { label: "Authors:", value: authors },
        { label: "Duration:", value: formattedDuration },
        { label: "Created:", value: formattedCreationDate },
    ];

    const handleDelete = () => {
        dispatch(deleteCourse(course.id));
    };

    const handleEdit = () => {
        navigate(`/courses/update/${course.id}`);
    };

    return (
        <div className="card flex--column">
            <span className="card--indicator"></span>
            <div className="card--header flex--column">
                <h4 className="title--h4">{title}</h4>
            </div>
            <div className="card--content flex--row">
                <p className="card--description text--b1">{description}</p>
                <div className="card--duration flex--column">
                    <CourseInfoList items={infoItems} styles="line--title" />
                    <div className="card-button-wrapper flex--row">
                        <Button
                            buttonText={BUTTON_TEXT.SHOW_COURSE}
                            type="link"
                            to={`/courses/${course.id}`}
                            buttonStyles="button rectangular-button colored"
                        />
                        {role === "admin" && (
                            <>
                                <Button
                                    buttonStyles="button rectangular-button bordered padding10"
                                    icon={
                                        <MdDelete
                                            size="2em"
                                            onClick={handleDelete}
                                        />
                                    }
                                />
                                <Button
                                    buttonStyles="button rectangular-button bordered padding10"
                                    icon={<MdEdit size="2em" />}
                                    onClick={handleEdit}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
