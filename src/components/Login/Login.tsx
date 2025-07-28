import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";

import { LuEye, LuEyeClosed } from "react-icons/lu";
import { loginUser, fetchCurrentUser } from "../../store/user/thunk";
import { fetchCourses } from "../../store/courses/thunk";
import { fetchAuthors } from "../../store/authors/thunk";
import { BUTTON_TEXT } from "../../constants";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

import "./Login.scss";

interface LoginFormData {
    email: string;
    password: string;
}

const Login: FC = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<LoginFormData>({
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<LoginFormData> = async values => {
        try {
            setErrorMessage("");
            await dispatch(loginUser(values));
            await Promise.all([
                dispatch(fetchCurrentUser()),
                dispatch(fetchCourses()),
                dispatch(fetchAuthors()),
            ]);
            reset();
            navigate("/courses", { replace: true });
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Failed to log in. Invalid email or password.");
        }
    };

    return (
        <main>
            <div className="wrapper flex--column main--wrapper">
                <section className="registration--wrapper flex--column">
                    <h3 className="title--h3">Login</h3>
                    <div className="form--wrapper register--size flex--column">
                        <form
                            className="form-size--small flex--column"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <p className="text--b1 error-color">
                                {errorMessage}
                            </p>
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
                                buttonText={BUTTON_TEXT.LOGIN}
                                buttonType={"submit"}
                                buttonStyles="button rectangular-button colored"
                            />
                            <p className="form--text flex--column text--b1">
                                If you don&apos;t have an account you may
                                <Link to="/registration" className="text--b2">
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Login;
