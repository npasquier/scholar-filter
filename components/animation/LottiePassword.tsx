import { Player } from "@lottiefiles/react-lottie-player";

const LottiePassword = () => {
  return (
      <Player
        autoplay
        loop
        src="/password.json"
        style={{ height: "400px", width: "400px" }}
      />
  );
};

export default LottiePassword;
