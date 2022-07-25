import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignUpSchema } from "../../utils/formValidators";
import { useUserAuth } from "../../context/UserAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signUp } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    try {
      await signUp(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        repass: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched }) => (
        <Form className="w-full mx-auto  h-screen pt-[100px] max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl">
          <h1 className="relative text-[100px] text-5xl -z-10 -mb-[10px] font-logo">
            Sign <span className="text-stroke text-white">Up</span>
          </h1>
          {error && <p className="text-red-400">{error}</p>}
          <div className="flex flex-wrap">
            <Field
              type="text"
              name="username"
              className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_2px] duration-150 rounded-md ${
                touched.username && errors.username
                  ? "border-red-500 focus:shadow-[2px_2px_2px] focus:shadow-red-500 "
                  : "border-neu-black"
              } px-2 py-2`}
              placeholder="Username"
            />
            <ErrorMessage name="username" />
            <Field
              type="email"
              name="email"
              className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_2px] duration-150 rounded-md ${
                touched.email && errors.email
                  ? "border-red-500 focus:shadow-[2px_2px_2px] focus:shadow-red-500 "
                  : "border-neu-black"
              } px-2 py-2`}
              placeholder="Email"
            />
            <ErrorMessage name="email" />
            <Field
              type="password"
              name="password"
              className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_2px] duration-150 rounded-md ${
                touched.password && errors.password
                  ? "border-red-500 focus:shadow-[2px_2px_2px] focus:shadow-red-500 "
                  : "border-neu-black"
              } px-2 py-2`}
              placeholder="Password"
            />
            <ErrorMessage name="password" />
            <Field
              type="password"
              name="repass"
              className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_2px] duration-150 rounded-md ${
                touched.repass && errors.repass
                  ? "border-red-500 focus:shadow-[2px_2px_2px] focus:shadow-red-500 "
                  : "border-neu-black"
              } px-2 py-2`}
              placeholder="Repeat password"
            />
            <ErrorMessage name="repass" />
            <div className="w-full mt-4">
              <button
                type="submit"
                className="relative flex-grow-1 w-full lg:w-full hover:shadow-neu-shadow hover:-translate-y-1 duration-200 border-2 border-neu-black px-6 py-3 rounded-lg bg-neu-yellow font-bold"
              >
                Sign Up
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
