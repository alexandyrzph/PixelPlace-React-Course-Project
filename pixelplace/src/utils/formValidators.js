import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, "Too short!")
        .max(40, "Too long!")
        .required("Username name is required"),
    image: Yup.mixed().required("You need to provide a image"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .min("6", "Password must be at least 6 characters long!")
        .required("Password is required!"),
    repass: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Repeat password is required"),
});

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .min("6", "Password must be at least 6 characters long!")
        .required("Password is required!"),
});

export const CreateEditPostSchema = Yup.object().shape({
    title: Yup.string()
        .min(4, "Title must be at least 4 characters long")
        .required("Title is required"),
    description: Yup.string()
        .min(5, "Description must be at least 5 characters long")
        .max("30", "Description must be at most 30 characters long")
        .required("Description is required"),
    category: Yup.string()
        .min(3, "Category must be at least 3 characters long")
        .required("Category is required"),
    image: Yup.mixed().required("You need to provide a image"),
});
