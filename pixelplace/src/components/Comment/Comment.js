const Comment = ({ photoURL, displayName, comment }) => {
    return (
        <div className="flex gap-2 mb-2 items-center">
            <img
                src={photoURL}
                className="w-10 h-10 object-cover object-center rounded-full cursor-pointer"
                alt="user-profile"
            />
            <div className="flex flex-1 flex-col">
                <p className="w-full font-bold">@{displayName}</p>
                <p className="w-full">{comment}</p>
            </div>
        </div>
    );
};

export default Comment;
