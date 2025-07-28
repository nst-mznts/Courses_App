import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useAppDispatch } from "../../store/hooks";
import { BUTTON_TEXT } from "../../constants";
import { registerUser } from "../../store/user/thunk";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

import "./Registration.scss";

interface RegistrationFormData {
    name: string;
    email: string;
    password: string;
}

const Registration: FC = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<RegistrationFormData>({
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<RegistrationFormData> = async values => {
        try {
            setErrorMessage("");
            await dispatch(registerUser(values));
            reset();
            navigate("/login", { replace: true });
        } catch (error) {
            setErrorMessage("Registration failed. Please try again.");
            console.error("Registration error:", error);
        }
    };

    return (
        <main>
            <div className="wrapper flex--column main--wrapper">
                <section className="registration--wrapper flex--column">
                    <h3 className="title--h3">Registration</h3>
                    <div className="form--wrapper register--size flex--column">
                        <form
                            className="form-size--small flex--column"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <p className="text--b1 error-color">
                                {errorMessage}
                            </p>
                            <Input
                                labelText="name"
                                placeholderText="Enter Name"
                                type="input"
                                register={register}
                                registerOptions={{
                                    required: "Name is required",
                                }}
                                errors={errors}
                            />
                            <Input
                                labelText="email"
                                placeholderText="Enter Email"
                                type="input"
                                register={register}
                                registerOptions={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email format",
                                    },
                                }}
                                errors={errors}
                            />
                            <Input
                                labelText="password"
                                placeholderText="Enter Password"
                                type="input"
                                isPasswordHidden={isPasswordHidden}
                                inputType="password"
                                register={register}
                                registerOptions={{
                                    required: "Password is required",
                                }}
                                errors={errors}
                            >
                                <Button
                                    buttonStyles="button rectangular-button bordered"
                                    icon={
                                        isPasswordHidden ? (
                                            <LuEye size="1.34em" />
                                        ) : (
                                            <LuEyeClosed size="1.34em" />
                                        )
                                    }
                                    onClick={() =>
                                        setIsPasswordHidden(!isPasswordHidden)
                                    }
                                />
                            </Input>
                            <Button
                                buttonText={BUTTON_TEXT.REGISTER}
                                buttonType={"submit"}
                                buttonStyles="button rectangular-button colored"
                            />
                            <p className="flex--row form-footer form--text text--b1">
                                If you have an account you may
                                <Link to="/login" className="text--b2">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Registration;
