import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { BsShieldFillExclamation } from "react-icons/bs";
import { Formik, Form, Field } from "formik";
import { SignInSchema } from "../../utils/formValidators";
import { handleFirebaseError } from "../../utils/firebaseErrorHandler";
import { toastError } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";

const SignIn = () => {
    const navigate = useNavigate();
    const { user, signIn } = useUserAuth();
    const [error, setError] = useState("");
    if (error) {
        toastError(error);
    }

    if (user) {
        return <Navigate to="/" />;
    }

    const handleSubmit = async ({ email, password }) => {
        signIn(email, password)
            .then(() => navigate("/"))
            .catch((err) => {
                handleFirebaseError(err.message, setError);
                console.log(err.message);
                console.log(err);
            });
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ errors, touched }) => (
                <Form className="relative w-full mx-auto  h-screen pt-[80px] max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl">
                    <h1 className="relative text-[100px] text-5xl -z-10 -mb-[10px] font-logo">
                        Sign <span className="text-stroke text-white">In</span>
                    </h1>
                    {error && <ToastContainer />}
                    <div className="flex flex-wrap">
                        <Field
                            name="email"
                            className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_0px] duration-150 rounded-md ${
                                touched.email && errors.email
                                    ? "border-red-500 focus:shadow-[2px_2px_2px] focus:shadow-red-500 "
                                    : "border-neu-black"
                            } px-2 py-2`}
                            placeholder="Email"
                        />
                        {touched.email && errors.email ? (
                            <p className="flex items-center gap-2 mt-1 text-red-600">
                                <BsShieldFillExclamation />
                                {errors.email}
                            </p>
                        ) : null}
                        <Field 
                            autoComplete="on"
                            type="password"
                            name="password"
                            className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_0px] duration-150 rounded-md ${
                                touched.password && errors.password
                                    ? "border-red-500 focus:shadow-[2px_2px_2px] focus:shadow-red-500 "
                                    : "border-neu-black"
                            } px-2 py-2`}
                            placeholder="Password"
                        />
                        {touched.password && errors.password ? (
                            <p className="flex items-center gap-2 mt-1 text-red-600">
                                <BsShieldFillExclamation />
                                {errors.password}
                            </p>
                        ) : null}
                        <div className="mt-4 w-full">
                            <button
                                type="submit"
                                className="relative flex-grow-1 w-full lg:w-full hover:shadow-neu-shadow hover:-translate-y-1 duration-200 border-2 border-neu-black px-6 py-3 rounded-lg bg-neu-yellow font-bold"
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignIn;
