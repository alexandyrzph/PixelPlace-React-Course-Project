import ButtonYellow from "../buttons/ButtonYellow";
import { Formik, Form, Field } from "formik";
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
      {({ errors, touched }) => (
        <Form className="w-full mx-auto  h-screen pt-[100px] max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl">
          <h1 className="text-center text-5xl mb-10 font-logo">Sign Up</h1>
          <div className="flex flex-wrap">
            <Field
              type="text"
              name="username"
              className="border-2 mb-3 w-full outline-none focus:shadow-[4px_4px_2px] duration-150 rounded-md border-neu-black px-2 py-2"
              placeholder="Username"
            />
            {errors.username && touched.username ? <div>{errors.username}</div> : null}
            <Field
              type="email"
              name="email"
              className="border-2 mb-3 w-full outline-none focus:shadow-[4px_4px_2px] duration-150 rounded-md border-neu-black px-2 py-2"
              placeholder="Email"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field
              type="password"
              name="password"
              className="border-2 mb-3 w-full outline-none focus:shadow-[4px_4px_2px] duration-150 rounded-md border-neu-black px-2 py-2"
              placeholder="Password"
            />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            <Field
              type="password"
              name="rePass"
              className="border-2 mb-3 w-full outline-none focus:shadow-[4px_4px_2px] duration-150 rounded-md border-neu-black px-2 py-2"
              placeholder="Repeat password"
            />
            {errors.repass && touched.repass ? <div>{errors.repass}</div> : null}
            <ButtonYellow typeSubmit>Sign Up</ButtonYellow>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
