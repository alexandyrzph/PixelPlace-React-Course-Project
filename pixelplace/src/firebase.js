import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCW_cmKgEljXcoCdHbpMJggAhJ1O0x_dCE",
    authDomain: "pixelplace-b8fac.firebaseapp.com",
    projectId: "pixelplace-b8fac",
    storageBucket: "pixelplace-b8fac.appspot.com",
    messagingSenderId: "109515736575",
    appId: "1:109515736575:web:2feff28d2566dfe9a5d3ca",
    measurementId: "G-CTSSLP5979",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
