"use client";

import { Player } from "@lottiefiles/react-lottie-player";

const LottieRegister = () => {
  return (
    <Player
      autoplay
      loop
      src="/register.json"
      style={{ height: "400px", width: "400px" }}
    />
  );
};

export default LottieRegister;
