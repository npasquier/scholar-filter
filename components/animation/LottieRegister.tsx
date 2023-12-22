"use client";

import { Player } from "@lottiefiles/react-lottie-player";

const LottieRegister = () => {
  return (
    <Player
      autoplay
      loop
      src="/register.json"
      className="h-[300px] w-[300px] md:h-[400px] md:w-[400px] " 
      />
  );
};

export default LottieRegister;
