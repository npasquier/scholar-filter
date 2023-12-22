import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";

const LottieSuccess = () => {
  const [showMesssge, setShowMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
    }, 3500);
  }, []);

  return (
    <div className="flex flex-col">
      <Player
        autoplay
        keepLastFrame={true}
        loop={false}
        src="/success.json"
        className="h-[300px] w-[300px] md:h-[400px] md:w-[400px]" 
      />
      {showMesssge && (
        <div className="fade-in-animation flex flex-col items-center text-center">
          <p className="mx-auto mb-4">
            <span className="text-sm md:text-base text-gray-500">
              Please check your emails, and look for an email from
              `scholar-filter`
            </span>
          </p>
          <p className="mx-auto">
            <span className="text-sm md:text-base text-gray-500">
              Then click on the blue button to check your email.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LottieSuccess;
