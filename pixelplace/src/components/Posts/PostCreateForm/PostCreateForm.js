import { useUserAuth } from "../../../context/UserAuthContext";
import { Formik, Form, Field } from "formik";
import { CreateEditPostSchema } from "../../../utils/formValidators";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsShieldFillExclamation } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PostCreateForm = () => {
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const navigate = useNavigate();
    const { user } = useUserAuth();
    const fileRef = useRef(null);

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

    const handleSubmit = async (values) => {
        const url = await uploadImage(values.image);
        try {
            await addDoc(collection(db, "Posts"), {
                ...values,
                image: url,
                ownerId: user.uid,
                ownerUsername: user.displayName,
                timeStamp: serverTimestamp(),
                ownerAvatarURL:
                    user.photoURL ??
                    "https://firebasestorage.googleapis.com/v0/b/pixelplace-b8fac.appspot.com/o/1024px-Faenza-avatar-default-symbolic.svg.png?alt=media&token=986532b2-c109-4faf-b607-30ce2a1e1ff8",
                likes: [],
            });
            navigate("/posts");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Formik
            initialValues={{
                title: "",
                description: "",
                category: "",
                image: null,
            }}
            validationSchema={CreateEditPostSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ touched, errors, isSubmitting, setFieldValue }) => (
                <Form className="w-full mx-auto  h-screen pt-[100px] max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl">
                    <h1 className="relative text-[100px] text-5xl -z-10 -mb-[10px] font-logo">
                        Create <span className="text-stroke text-white">Post</span>
                    </h1>
                    <div className="flex flex-wrap">
                        <Field
                            name="title"
                            className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_0px] duration-150 rounded-sm ${
                                touched.title && errors.title
                                    ? "border-red-500 focus:shadow-[2px_2px_0px] focus:shadow-red-500 "
                                    : "border-neu-black"
                            } px-2 py-2`}
                            placeholder="Enter post title"
                        />
                        {touched.title && errors.title ? (
                            <p className="flex items-center gap-2 mt-1 text-red-600">
                                <BsShieldFillExclamation />
                                {errors.title}
                            </p>
                        ) : null}

                        <Field
                            type="text"
                            name="description"
                            className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_0px] duration-150 rounded-sm ${
                                touched.description && errors.description
                                    ? "border-red-500 focus:shadow-[2px_2px_0px] focus:shadow-red-500 "
                                    : "border-neu-black"
                            } px-2 py-2`}
                            placeholder="Enter description"
                        />
                        {touched.description && errors.description ? (
                            <p className="flex items-center gap-2 mt-1 text-red-600">
                                <BsShieldFillExclamation />
                                {errors.description}
                            </p>
                        ) : null}
                        <Field
                            type="text"
                            name="category"
                            className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_0px] duration-150 rounded-sm ${
                                touched.category && errors.category
                                    ? "border-red-500 focus:shadow-[2px_2px_0px] focus:shadow-red-500 "
                                    : "border-neu-black"
                            } px-2 py-2`}
                            placeholder="Enter category"
                        />
                        {touched.category && errors.category ? (
                            <p className="flex items-center gap-2 mt-1 text-red-600">
                                <BsShieldFillExclamation />
                                {errors.category}
                            </p>
                        ) : null}

                        <div className="mt-3 flex justify-center md:flex-row flex-col items-center w-full">
                            <label
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    fileRef.current.click();
                                }}
                                className={`relative z-[9] flex flex-col justify-center items-center w-full h-64 bg-white rounded-sm border-2 ${
                                    touched.image && errors.image
                                        ? `border-red-600`
                                        : "border-neu-black"
                                } border-dashed cursor-pointer`}
                            >
                                <div className="relative flex flex-col justify-center items-center pt-5 pb-6">
                                    <AiOutlineCloudUpload size={"2rem"} />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or
                                        drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">Only valid images</p>
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
                        <div className="mt-4 w-full">
                            <button
                                type="Submit"
                                disabled={isSubmitting}
                                className="relative flex-grow-1 w-full lg:w-full hover:shadow-neu-shadow hover:-translate-y-1 duration-200 border-2 outline-none border-neu-black px-6 py-3 rounded-sm bg-neu-yellow font-bold"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default PostCreateForm;
