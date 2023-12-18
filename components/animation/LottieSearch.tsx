"use client";

import { Player } from "@lottiefiles/react-lottie-player";

const LottieSearch = () => {
  return (
    <Player
      autoplay
      loop
      src="/search-animation.json"
      style={{ height: "200px", width: "600px" }}
    />
  );
};

export default LottieSearch;
