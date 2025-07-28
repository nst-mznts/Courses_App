import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

import Button from "../../common/Button/Button";
import { BUTTON_TEXT } from "../../constants";

import "./EmptyCourseList.scss";

const EmptyCourseList: FC = () => {
    const { role } = useAppSelector(state => state.user);
    const navigate = useNavigate();

    const handleAddCourseClick = () => {
        navigate("/courses/add");
    };

    return (
        <main>
            <div className="wrapper empty-course--wrapper">
                <section className="empty-course flex--column">
                    <h3 className="title--h3">Course List is Empty</h3>
                    {role === "admin" ? (
                        <>
                            <p className="text--b1">
                                Please use &quot;Add New Course&quot; button to
                                add your first course
                            </p>
                            <Button
                                buttonText={BUTTON_TEXT.ADD_NEW_COURSE}
                                buttonStyles="button rectangular-button colored"
                                onClick={handleAddCourseClick}
                            />
                        </>
                    ) : (
                        <p className="text--b2">
                            You don&apos;t have permissions to create a course.
                            Please log in as ADMIN.
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
};

export default EmptyCourseList;
