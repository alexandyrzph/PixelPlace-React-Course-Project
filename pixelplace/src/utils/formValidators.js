import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short!")
    .max(40, "Too long!")
    .required("Username name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min("6", "Password must be at least 6 characters long!")
    .required("Password is required!"),
  repass: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min("6", "Password must be at least 6 characters long!")
    .required("Password is required!"),
});
