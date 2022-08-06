# React-Course-Project

### React-Course-Project

PixelPlace is a place for people where they can share their art and browse art wallpapers from other people. The application uses Firebase services such as Firebase Authentication, Firestore Database, Firebase Storage.
<br />

### Application currently deployed on Firebase - <b>[PixelPlace](https://pixelplace-b8fac.web.app/)</b>

> ## Application structure

-   ### Public Part (for unauthenticated users)
    -   Home Page
    -   Login Page
    -   Register Page
    -   Browsing Posts and post details but can't like, comment, create or edit posts
-   ### Private Part (for authenticated users)
    -   Posts Page with feature to like others posts
    -   Post Details page where you can see more and also leave a comment
    -   Delete comment in Post Details page (for owners of comment)
    -   Create Post Page with image upload to Firebase
    -   Edit Post page (for owners of the post)
    -   Delete Post (for owners of the post)

> ## Technologies and libraries used

-   #### ReactJS
-   #### React-router-dom (v6)
-   #### React-Icons
-   #### React-Spinners
-   #### React-Toastify
-   #### React-Firebase-hooks (cloud firestore hooks)
-   #### TailwindCSS for styling the UI
-   #### Formik (building forms)
-   #### Yup (used for form validation)
-   #### Firebase
    -   #### Firebase Authentication
    -   #### Cloud Firestore (No-SQL db which saves data in documents and collections)
    -   #### Firebase Storage

> ## Guide to start the application

### To start the application simply clone the repo or download it.

-   #### Open terminal in the project's directory and type `npm install` or `npm i`.
-   #### After the dependencies are installed successfully to run the application go to the project's directory by typing `cd pixelplace` or if your already are in the directory just type `npm run start`
-   #### Your application should be running on `http://localhost:3000`.
