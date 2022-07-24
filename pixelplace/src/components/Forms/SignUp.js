import ButtonYellow from "../buttons/ButtonYellow";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignUpSchema } from "../../utils/formValidators";

const SignUp = () => {
  const handleSubmit = (values) => {
    console.log(values);
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
      <Form className="w-full mx-auto  h-screen pt-[100px] max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl">
        <h1 className="text-center text-5xl mb-10 font-logo">Sign Up</h1>
        <div className="flex flex-wrap">
          <Field
            type="text"
            name="username"
            className="border-2 w-full outline-none focus:shadow-[4px_4px_2px] duration-150 rounded-md border-neu-black px-2 py-2"
            placeholder="Username"
          />
          <ErrorMessage name="username" />
          <Field
            type="email"
            name="email"
            className="border-2 mt-3 w-full outline-none focus:shadow-[4px_4px_2px] duration-150 rounded-md border-neu-black px-2 py-2"
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
          <Field
            type="password"
            name="repass"
            className="border-2 mt-3 w-full outline-none focus:shadow-[4px_4px_2px] duration-150 rounded-md border-neu-black px-2 py-2"
            placeholder="Repeat password"
          />
          <ErrorMessage name="repass" />
          <div className="w-full mt-4">
            <ButtonYellow typeSubmit>Sign Up</ButtonYellow>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default SignUp;
