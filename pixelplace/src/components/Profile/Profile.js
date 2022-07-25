const Profile = () => {
  return (
    <div>
      <div className="flex-col relative z-20 items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl xl:max-w-3xl overflow-ellipsis 2xl:max-w-7xl mx-auto h-screen pt-[0%] md:pt-[10%]">
        <img
          className="border-2 mx-auto border-neu-black cursor-pointer inline-block w-[200px] h-[200px] object-cover object-center justify-center items-center rounded-xl hover:shadow-neu-shadow duration-75"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg"
          alt=""
        />
        <h1>Elon Musk</h1>
      </div>
    </div>
  );
};

export default Profile;
