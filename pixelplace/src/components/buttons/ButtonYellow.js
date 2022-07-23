const ButtonYellow = ({ typeSubmit, children }) => {
  return (
    <button
      type={`${typeSubmit ?? "submit" }`}
      className="relative flex-grow-1 w-full lg:w-full hover:shadow-neu-shadow hover:-translate-y-1 duration-200 border-2 border-neu-black px-6 py-3 rounded-lg bg-neu-yellow font-bold"
    >
      {children}
    </button>
  );
};

export default ButtonYellow;
