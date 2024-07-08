import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { validateEmail } from "../../utils/helperFunctions";

const Login: React.FC = () => {
    const [formState, setFormState] = useState({
        userLog: {
            email: "",
            password: ""
        },
        errors: {
            email: "",
            password: ""
        }
    });

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            userLog: {
                ...prevState.userLog,
                [name]: value
            },
            errors: {
                ...prevState.errors,
                [name]: ""
            }
        }));
    }, []);

    const validateForm = useCallback(() => {
        const { email, password } = formState.userLog;
        const validationErrors = { email: "", password: "" };
        let isValid = true;

        if (!email) {
            validationErrors.email = "Email is required";
            isValid = false;
        } else if (!validateEmail(email)) {
            validationErrors.email = "Invalid email format";
            isValid = false;
        }

        if (!password) {
            validationErrors.password = "Password is required";
            isValid = false;
        }

        setFormState(prevState => ({
            ...prevState,
            errors: validationErrors
        }));

        return isValid;
    }, [formState.userLog]);

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            // Proceed with form submission logic
            console.log("Form submitted", formState.userLog);
        }
    }, [validateForm, formState.userLog]);

    const { userLog, errors } = formState;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userLog.email}
                    onChange={handleInputChange}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userLog.password}
                    onChange={handleInputChange}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            </div>
            <button type="submit">Log in</button>
        </form>
    );
};

export default Login;
