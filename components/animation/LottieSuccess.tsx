import { Player } from "@lottiefiles/react-lottie-player";
import  { useEffect, useState } from "react";

const LottieSuccess = () => {
  const [showMesssge, setShowMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
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
      {showMesssge && (
        <div className="fade-in-animation flex flex-col justify-center align-middle text-center">
          {" "}
          <p className="flex gap-3 mx-auto mb-4">
            <span className="text-gray-500">Please check your emails, and look for an email from `scholar-filter`</span>
          </p>
          <p className="flex gap-3 mx-auto">
            <span className="text-gray-500">Then click on the blue button to check your email.</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LottieSuccess;
