import { FC, ChangeEvent, ReactNode } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

import "./Input.scss";

interface InputProps {
    labelText?: string;
    placeholderText?: string;
    value?: string | number;
    type?: "input" | "textarea";
    isPasswordHidden?: boolean;
    inputType?: string;
    register?: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    errors?: { [key: string]: any };
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    children?: ReactNode;
}

const Input: FC<InputProps> = ({
    labelText = "",
    placeholderText = "Input text",
    value,
    type = "input",
    isPasswordHidden,
    inputType = "text",
    register,
    registerOptions,
    errors,
    onChange,
    children,
}) => {
    const inputLabel = labelText.charAt(0).toUpperCase() + labelText.slice(1);
    const inputProps = register ? register(labelText, registerOptions) : {};
    return (
        <label className="text--b2 flex--column" htmlFor={labelText}>
            {inputLabel}
            <div className="input-container flex--row">
                {type === "input" && (
                    <input
                        placeholder={placeholderText}
                        id={labelText}
                        name={labelText}
                        type={
                            inputType === "password" && !isPasswordHidden
                                ? "text"
                                : inputType
                        }
                        value={value}
                        className={
                            errors?.[labelText]
                                ? "input text--b1 invalid"
                                : "input text--b1"
                        }
                        {...inputProps}
                        onChange={onChange}
                    />
                )}
                {type === "textarea" && (
                    <textarea
                        placeholder={placeholderText}
                        id={labelText}
                        name={labelText}
                        value={value}
                        className={
                            errors?.[labelText]
                                ? "input text--b1 invalid"
                                : "input text--b1"
                        }
                        rows={9}
                        {...inputProps}
                        onChange={onChange}
                    ></textarea>
                )}
                {children && <div className="input-children">{children}</div>}
            </div>

            {errors?.[labelText] && (
                <span className="error text--b1" style={{ color: "red" }}>
                    {errors[labelText].message as string}
                </span>
            )}
        </label>
    );
};

export default Input;
