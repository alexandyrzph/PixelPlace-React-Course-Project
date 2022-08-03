import { useUserAuth } from "../../context/UserAuthContext";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsShieldFillExclamation } from "react-icons/bs";
import { Formik, Form, Field } from "formik";
import { SignUpSchema } from "../../utils/formValidators";
import { addDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { handleFirebaseError } from "../../utils/firebaseErrorHandler";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { toastError } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";

const SignUp = () => {
    const { user, signUp } = useUserAuth();
    const [error, setError] = useState("");
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const navigate = useNavigate();
    const fileRef = useRef(null);
    if (error) {
        toastError(error);
    }

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        }
        setPreview((prev) => null);
    }, [image]);

    const uploadImage = async (image) => {
        const imageRef = ref(storage, `${new Date().getTime() + image.name}`);
        try {
            const res = await uploadBytes(imageRef, image, {
                contentType: "image/jpg" | "image/jpeg" | "image/svg" | "image/png",
            });
            return getDownloadURL(res.ref);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async ({ username, image, email, password }) => {
        const url = await uploadImage(image);
        try {
            const res = await signUp(email, password);
            const user = res.user;
            await updateProfile(user, {
                photoURL: url,
                displayName: username,
            });
            await addDoc(doc(db, "Users", res.user.uid), {
                username,
                email,
            });
            navigate("/");
        } catch (err) {
            handleFirebaseError(err.message, setError);
        }
    };

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <Formik
            initialValues={{
                username: "",
                image: null,
                email: "",
                password: "",
                repass: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ errors, touched, setFieldValue }) => (
                <Form className="w-full mx-auto  h-screen pt-[100px] max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl">
                    <h1 className="relative text-[100px] text-5xl -z-10 -mb-[10px] font-logo">
                        Sign <span className="text-stroke text-white">Up</span>
                    </h1>
                    <ToastContainer />
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
                        {touched.username && errors.username ? (
                            <p className="flex items-center gap-2 mt-1 text-red-600">
                                <BsShieldFillExclamation />
                                {errors.username}
                            </p>
                        ) : null}
                        <div className="mt-3 flex justify-center md:flex-row flex-col items-center w-full">
                            <label
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    fileRef.current.click();
                                }}
                                className={`relative z-[9] flex flex-col justify-center items-center w-full h-64 bg-white rounded-lg border-2 ${
                                    touched.image && errors.image
                                        ? `border-red-600`
                                        : "border-neu-black"
                                } border-dashed cursor-pointer`}
                            >
                                <div className="relative flex flex-col justify-center items-center pt-5 pb-6">
                                    <AiOutlineCloudUpload size={"2rem"} />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Only valid images jpg, png, jpeg, gif
                                    </p>
                                </div>
                            </label>
                            {preview && (
                                <div className="h-full">
                                    <img
                                        id="image"
                                        src={preview}
                                        alt="preview"
                                        className="h-[250px] max-w-sm object-cover object-center p-2 z-10 hover:brightness-50 cursor-pointer duration-100"
                                        onClick={(e) => {
                                            setImage(null);
                                            setFieldValue("image", null);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            name="image"
                            className="hidden"
                            ref={fileRef}
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file && file.type.substring(0, 5) === "image") {
                                    setImage(file);
                                    setFieldValue("image", e.target.files[0]);
                                } else {
                                    setImage(null);
                                    setFieldValue("image", null);
                                }
                            }}
                        />

                        {touched.image && errors.image ? (
                            <p className="flex items-center gap-2 mt-1 text-red-600">
                                <BsShieldFillExclamation />
                                {errors.image}
                            </p>
                        ) : null}
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
                        {touched.email && errors.email ? (
                            <p className="flex items-center gap-2 mt-1 text-red-600">
                                <BsShieldFillExclamation />
                                {errors.email}
                            </p>
                        ) : null}
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
                        {touched.password && errors.password ? (
                            <p className="flex items-center gap-2 mt-1 text-red-600">
                                <BsShieldFillExclamation />
                                {errors.password}
                            </p>
                        ) : null}
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
                        {touched.repass && errors.repass ? (
                            <p className="flex items-center gap-2 mt-1 text-red-600">
                                <BsShieldFillExclamation />
                                {errors.repass}
                            </p>
                        ) : null}
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
