import { Formik, Form, Field, ErrorMessage } from "formik";
import { CreatePostSchema } from "../../utils/formValidators";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserAuth } from "../../context/UserAuthContext";
import { uuidv4 } from "@firebase/util";

const PostCreateForm = () => {
    const [image, setImage] = useState();
    const [userInDb, setUserInDb] = useState();
    const [preview, setPreview] = useState();
    const navigate = useNavigate();
    const { user } = useUserAuth();
    const fileRef = useRef(null);

    useEffect(() => {
        const docRef = doc(db, "Users", user.uid);
        getDoc(docRef)
            .then((data) => setUserInDb(data.data()))
            .catch((err) => console.log(err));
    }, [user]);

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
                ownerUsername: userInDb.username,
                timeStamp: serverTimestamp(),
                ownerAvatarURL:
                    userInDb.photoURL ??
                    "https://firebasestorage.googleapis.com/v0/b/pixelplace-b8fac.appspot.com/o/1024px-Faenza-avatar-default-symbolic.svg.png?alt=media&token=986532b2-c109-4faf-b607-30ce2a1e1ff8",
                postId: uuidv4(),
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
            validationSchema={CreatePostSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ values, touched, errors, setFieldValue }) => (
                <Form className="w-full mx-auto  h-screen pt-[100px] max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl">
                    <h1 className="relative text-[100px] text-5xl -z-10 -mb-[10px] font-logo">
                        Create <span className="text-stroke text-white">Post</span>
                    </h1>
                    <div className="flex flex-wrap">
                        <Field
                            name="title"
                            className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_2px] duration-150 rounded-md ${
                                touched.title && errors.title
                                    ? "border-red-500 focus:shadow-[2px_2px_2px] focus:shadow-red-500 "
                                    : "border-neu-black"
                            } px-2 py-2`}
                            placeholder="Enter post title"
                        />
                        <ErrorMessage name="title" />
                        <Field
                            type="text"
                            name="description"
                            className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_2px] duration-150 rounded-md ${
                                touched.description && errors.description
                                    ? "border-red-500 focus:shadow-[2px_2px_2px] focus:shadow-red-500 "
                                    : "border-neu-black"
                            } px-2 py-2`}
                            placeholder="Enter description"
                        />
                        <ErrorMessage name="description" />
                        <Field
                            type="text"
                            name="category"
                            className={`border-2 mt-3 w-full outline-none bg-white focus:shadow-[2px_2px_2px] duration-150 rounded-md ${
                                touched.category && errors.category
                                    ? "border-red-500 focus:shadow-[2px_2px_2px] focus:shadow-red-500 "
                                    : "border-neu-black"
                            } px-2 py-2`}
                            placeholder="Enter category"
                        />
                        <ErrorMessage name="category" />

                        <div className="mt-3 flex justify-center md:flex-row flex-col items-center w-full">
                            <label
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    fileRef.current.click();
                                }}
                                className="relative z-[9] flex flex-col justify-center items-center w-full h-64 bg-white rounded-lg border-2 border-neu-black border-dashed cursor-pointer"
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
                                        className="h-[200px] w-[200px] p-2 z-10 hover:brightness-50 cursor-pointer duration-100"
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

                        <ErrorMessage name="image" />
                        <div className="mt-4 w-full">
                            <button
                                type="Submit"
                                className="relative flex-grow-1 w-full lg:w-full hover:shadow-neu-shadow hover:-translate-y-1 duration-200 border-2 outline-none border-neu-black px-6 py-3 rounded-lg bg-neu-yellow font-bold"
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
