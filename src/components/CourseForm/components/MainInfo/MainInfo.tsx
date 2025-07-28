import { FC, useState } from "react";
import { UseFormRegister } from "react-hook-form";

import Input from "../../../../common/Input/Input";
import { CourseType } from "../../../../store/courses/types";

interface MainInfoProps {
    register?: UseFormRegister<any>;
    errors?: { [key: string]: any };
    currentCourse?: CourseType;
}

const MainInfo: FC<MainInfoProps> = ({ register, errors, currentCourse }) => {
    const [title, setTitle] = useState(currentCourse?.title || "");
    const [description, setDescription] = useState(
        currentCourse?.description || ""
    );
    return (
        <>
            <h4 className="title--h4">Main Info</h4>
            <Input
                labelText="title"
                placeholderText="Enter Title"
                value={title}
                register={register}
                registerOptions={{
                    required: "Title is required",
                    minLength: {
                        value: 2,
                        message: "Title must be at least 2 characters",
                    },
                }}
                errors={errors}
                onChange={event => setTitle(event.target.value)}
            />
            <Input
                labelText="description"
                placeholderText="Enter Description"
                value={description}
                type="textarea"
                register={register}
                registerOptions={{
                    required: "Description is required",
                    minLength: {
                        value: 2,
                        message: "Description must be at least 2 characters",
                    },
                }}
                errors={errors}
                onChange={event => setDescription(event.target.value)}
            />
        </>
    );
};

export default MainInfo;
