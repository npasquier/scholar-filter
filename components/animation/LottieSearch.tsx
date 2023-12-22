"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";

const LottieSearch = () => {

  const [windowWidth, setWindowWidth] = useState(300); // default width

  useEffect(() => {
    // Update the width based on the window's width
    const updateWidth = () => {
      const width = window.innerWidth > 768 ? 600 : window.innerWidth > 480 ? 400 : 300;
      setWindowWidth(width);
    };

    // Set the initial width
    updateWidth();

    // Add event listener for window resize
    window.addEventListener('resize', updateWidth);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  return (
    <Player
      autoplay
      loop
      src="/search-animation.json"
      style={{ height: "200px", width: `${windowWidth}px` }}
    />
  );
};

export default LottieSearch;
