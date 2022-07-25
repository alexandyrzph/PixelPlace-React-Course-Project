import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { SignInSchema } from "../../utils/formValidators";

const SignIn = () => {
  const { signIn } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
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
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-wrap">
            <Field
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
