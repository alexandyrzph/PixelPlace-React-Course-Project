export const handleFirebaseError = (err, fn) => {
    switch (err) {
        case "Firebase: Error (auth/user-not-found).":
            return fn("User not found!");
        case "Firebase: Error (auth/wrong-password).":
            return fn("Wrong email or password");
        case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
            return fn("Account disabled due to many requests.");
        case 'Firebase: Error (auth/email-already-in-use).':
            return fn('User with same email already exist.')
        default:
            break;
    }
};
