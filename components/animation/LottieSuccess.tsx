import { Player } from "@lottiefiles/react-lottie-player";
import  { useEffect, useState } from "react";

const LottieSuccess = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShouldRedirect(true);
    }, 3500);
  }, []);

  return (
    <div className="">
      <Player
        autoplay
        keepLastFrame={true}
        loop={false}
        src="/success.json"
        style={{ height: "400px", width: "400px" }}
      />
      {shouldRedirect && (
        <div className="fade-in-animation flex justify-center">
          {" "}
          <p className="flex gap-3">
            <span className="spinner"></span>{" "}
            <span className="text-gray-500">Redirecting to Homepage...</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LottieSuccess;
