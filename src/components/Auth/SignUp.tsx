import React, { useState, useCallback } from "react";

const SignUp: React.FC = () => {
    const [formState, setFormState] = useState({
        userLog: {
            name: "",
            email: "",
            dob: "",
            gender: "",
            password: "",
            cnfpassword: "",
        },
        errors: {
            name: "",
            email: "",
            dob: "",
            gender: "",
            password: "",
            cnfpassword: "",
        },
    });

    const validate = () => {
        const { userLog } = formState;
        const errors = {
            name: "",
            email: "",
            dob: "",
            gender: "",
            password: "",
            cnfpassword: "",
        };
        let isValid = true;

        if (!userLog.name) {
            errors.name = "Name is required";
            isValid = false;
        }

        if (!userLog.email) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(userLog.email)) {
            errors.email = "Email is invalid";
            isValid = false;
        }

        if (!userLog.dob) {
            errors.dob = "Date of Birth is required";
            isValid = false;
        }

        if (!userLog.gender) {
            errors.gender = "Gender is required";
            isValid = false;
        }

        if (!userLog.password) {
            errors.password = "Password is required";
            isValid = false;
        } else if (userLog.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (!userLog.cnfpassword) {
            errors.cnfpassword = "Confirm Password is required";
            isValid = false;
        } else if (userLog.password !== userLog.cnfpassword) {
            errors.cnfpassword = "Passwords do not match";
            isValid = false;
        }

        setFormState((prevState) => ({
            ...prevState,
            errors: errors,
        }));

        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            userLog: {
                ...prevState.userLog,
                [name]: value,
            },
        }));
    };

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            // Handle form submission
            console.log("Form is valid. Submitting form data...", formState);
        } else {
            console.log("Form is invalid. Please correct the errors.");
        }
    }, [validate]);

    const { userLog, errors } = formState;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={userLog.name}
                    onChange={handleInputChange}
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

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

            <div>
                <input
                    type="password"
                    name="cnfpassword"
                    placeholder="Confirm Password"
                    value={userLog.cnfpassword}
                    onChange={handleInputChange}
                />
                {errors.cnfpassword && (
                    <p style={{ color: "red" }}>{errors.cnfpassword}</p>
                )}
            </div>

            <div>
                <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={userLog.dob}
                    onChange={handleInputChange}
                />
                {errors.dob && <p style={{ color: "red" }}>{errors.dob}</p>}
            </div>

            <div>
                <select name="gender" value={userLog.gender} onChange={handleInputChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
            </div>

            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
