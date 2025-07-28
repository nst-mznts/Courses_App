import { FC, ChangeEvent } from "react";
import { UseFormRegister } from "react-hook-form";

import Input from "../../../../common/Input/Input";
import getCourseDuration from "../../../../helpers/getCourseDuration";

interface DurationProps {
    register?: UseFormRegister<any>;
    errors?: { [key: string]: any };
    duration: number;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Duration: FC<DurationProps> = ({
    register,
    errors,
    duration,
    onChange,
}) => (
    <>
        <h4 className="title--h4">Duration</h4>
        <div className="section-line flex--row">
            <Input
                labelText="duration"
                placeholderText="Enter Duration"
                value={duration}
                register={register}
                registerOptions={{
                    required: "Duration is required",
                    min: {
                        value: 1,
                        message: "Duration must be greater than 0",
                    },
                    pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numbers are allowed",
                    },
                }}
                errors={errors}
                onChange={onChange}
            >
                <span className="text--b2 duration-style">
                    {getCourseDuration(Number(duration))}
                </span>
            </Input>
        </div>
    </>
);

export default Duration;
