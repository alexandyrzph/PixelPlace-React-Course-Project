import ButtonYellow from "../buttons/ButtonYellow";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignInSchema } from "../../utils/formValidators";

const SignIn = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignInSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form className="w-full mx-auto  h-screen pt-[100px] max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl">
        <h1 className="text-center text-5xl mb-10 font-logo">Sign In</h1>

        <div className="flex flex-wrap">
          <Field
            name="email"
            className="border-2 w-full outline-none focus:shadow-[4px_4px_2px] duration-150 rounded-md border-neu-black px-2 py-2"
            placeholder="Email"
          />
          <ErrorMessage name="email" />
          <Field
            type="password"
            name="password"
            className="border-2 mt-3 w-full outline-none focus:shadow-[4px_4px_2px] duration-150 rounded-md border-neu-black px-2 py-2"
            placeholder="Password"
          />
          <ErrorMessage name="password" />
          <div className="mt-4 w-full">
            <ButtonYellow typeSubmit>Log in</ButtonYellow>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default SignIn;
