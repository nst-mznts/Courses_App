import { FC, useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

import { AuthorType } from "../../store/authors/types";
import Button from "../../common/Button/Button";
import { BUTTON_TEXT } from "../../constants";
import MainInfo from "./components/MainInfo/MainInfo";
import Duration from "./components/Duration/Duration";
import Authors from "./components/Authors/Authors";
import useAuthors from "../../helpers/useAuthors";

import "./CourseForm.scss";

type CourseFormData = {
    title: string;
    description: string;
    duration: number;
    authors: string[];
};

interface CourseFormProps {
    onSaveCourse: (newCourse: CourseFormData, courseId?: string) => void;
    authorsList: AuthorType[];
}

const CourseForm: FC<CourseFormProps> = ({ onSaveCourse, authorsList }) => {
    const courses = useAppSelector(state => state.courses || []);
    const params = useParams();
    const currentCourse = courses.find(course => course.id === params.courseId);
    const [duration, setDuration] = useState(currentCourse?.duration || 0);
    const {
        authorName,
        allAuthors,
        courseAuthors,
        setAuthorName,
        handleCreateAuthor,
        handleAddAuthor,
        handleDeleteAuthor,
        resetAuthors,
    } = useAuthors({
        authorsList,
        initialAuthorIds: currentCourse?.authors || [],
    });
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<CourseFormData>();

    const onSubmit: SubmitHandler<CourseFormData> = data => {
        onSaveCourse(
            {
                title: data.title,
                description: data.description,
                duration: Number(duration),
                authors: courseAuthors.map(author => author.id),
            },
            params.courseId ?? ""
        );

        reset();
        setDuration(0);
        resetAuthors();
        navigate("/courses", { replace: true });
    };

    const handleDurationChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = e.target.value;
        if (/^[0-9]+$/.test(value)) {
            setDuration(Number(value));
        }
    };

    return (
        <main>
            <div className="wrapper flex--column main--wrapper">
                <section className="edit--wrapper flex--column">
                    <h3 className="title--h3">
                        {params.courseId ? "Course Edit" : "Create Course"}
                    </h3>
                    <div className="form--wrapper edit--size flex--column">
                        <form
                            className="form-size--large flex--column"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="form-section flex--column">
                                <MainInfo
                                    register={register}
                                    errors={errors}
                                    currentCourse={currentCourse}
                                />
                            </div>
                            <div className="form-section--half flex--column">
                                <Duration
                                    register={register}
                                    errors={errors}
                                    duration={duration}
                                    onChange={handleDurationChange}
                                />
                            </div>
                            <Authors
                                courseAuthors={courseAuthors}
                                allAuthors={allAuthors}
                                authorName={authorName}
                                onChange={setAuthorName}
                                onDelete={handleDeleteAuthor}
                                onAdd={handleAddAuthor}
                                onCreate={handleCreateAuthor}
                            />
                            <div className="button--wrapper flex--row">
                                <Button
                                    buttonText={BUTTON_TEXT.CANCEL}
                                    type="link"
                                    to="/courses"
                                    buttonStyles="button rectangular-button bordered"
                                />
                                <Button
                                    buttonText={
                                        params.courseId
                                            ? BUTTON_TEXT.UPDATE_COURSE
                                            : BUTTON_TEXT.CREATE_COURSE
                                    }
                                    buttonType={"submit"}
                                    buttonStyles="button rectangular-button colored"
                                />
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default CourseForm;
