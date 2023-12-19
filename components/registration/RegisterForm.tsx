"use client";

import { useEffect, useState } from "react";
import LottieRegister from "../animation/LottieRegister";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LottiePassword from "../animation/LottiePassword";
import schema from "@/lib/schema";
import axios from "axios";
import Image from "next/image";
import LottieSuccess from "../animation/LottieSuccess";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

const RegisterForm = () => {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);

  setTimeout(() => {
    setLoaded(true);
  }, 3000);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setRegistering(true);

    try {
      const response = await axios.post(
        "/api/register",
        data
      );

      if (response.status === 200) {
        setTimeout(() => {
          setIsRegistered(true);
        }, 2000);
      } else {
        setRegistrationError("Registration failed. Please try again.");
      }
    } catch (error) {
      setRegistrationError("An error occurred during registration.");

      if (axios.isAxiosError(error)) {
        console.error(
          "There was a problem with the axios request:",
          error.response?.data
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  useEffect(() => {
    if (isRegistered) {
      setTimeout(() => {
        router.push("/");
      }, 5500);
    }
  }, [isRegistered, router]);

  function calculatePasswordStrength(password: string): number {
    // Implement logic to calculate password strength
    let strength = 0;
    if (password.length > 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  }

  function getStrengthBarColor(strength: number) {
    if (strength <= 1) {
      return "bg-red-500"; // Weak
    } else if (strength <= 2) {
      return "bg-yellow-500"; // Fair
    } else if (strength <= 3) {
      return "bg-blue-500"; // Good
    } else {
      return "bg-green-500"; // Strong
    }
  }

  function getStrengthTextColor(strength: number) {
    if (strength <= 1) {
      return "text-red-500"; // Weak
    } else if (strength <= 2) {
      return "text-yellow-500"; // Fair
    } else if (strength <= 3) {
      return "text-blue-500"; // Good
    } else {
      return "text-green-500"; // Strong
    }
  }

  function getStrengthText(strength: number) {
    if (strength <= 1) {
      return "Weak";
    } else if (strength <= 2) {
      return "Fair";
    } else if (strength <= 3) {
      return "Good";
    } else {
      return "Strong";
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strength = calculatePasswordStrength(e.target.value);
    setPasswordStrength(strength);
  };

  if (isRegistered) {
    return (
      <div>
        <LottieSuccess />
      </div>
    );
  }

  return (
    <div>
      {!loaded ? (
        <LottieRegister />
      ) : (
        <div className="fade-in-animation">
          <form onSubmit={handleSubmit(onSubmit)} className="your-form-class">
            <input
              autoComplete="off"
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent bombay-color"
            />
            {errors.email && (
              <p className="text-red-700 bg-slate-100 rounded-lg font-semibold mt-2">
                {errors.email.message}
              </p>
            )}

            <div className="relative my-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent bombay-color pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <Image
                    src="/eye-text.svg"
                    alt="show"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/eye-password.svg"
                    alt="hide"
                    width={22}
                    height={22}
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-700 bg-slate-100 rounded-lg font-semibold mb-2">
                {errors.password.message}
              </p>
            )}

            <div className="flex items-center justify-left ml-4 gap-3">
              <div className="group relative mb-auto">
                <Image src="/info.svg" alt="info" width={20} height={20} />
                <span className="group absolute left-0 z-10 mt-2 hidden group-hover:inline-block w-80 text-center text-sm bg-black text-white p-2 rounded-xl shadow-lg">
                  Password must have at least 8 characters. Its strength
                  increases if it contains:
                  <ul className="list-disc list-inside">
                    <li>Upper and lower case letters</li>
                    <li>Numbers</li>
                    <li>Special characters</li>
                  </ul>
                  Upon registration, the password will be hashed. It is the
                  hashed password that will be stored in the database.
                </span>
              </div>
              <span className="text-gray-400">Password Strength: </span>

              <div className="password-strength-meter w-80 bg-gray-200 rounded-full h-2.5 mr-2">
                <div
                  className={`h-2.5 rounded-full ${getStrengthBarColor(
                    passwordStrength
                  )}`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }} // Assuming passwordStrength is a value between 0 and 4
                ></div>
              </div>
              <span className={`${getStrengthTextColor(passwordStrength)}`}>
                {getStrengthText(passwordStrength)}
              </span>
            </div>

            <LottiePassword />

            <button
              type="submit"
              disabled={registering}
              className="elm-bg-color text-slate-100 py-2 px-4 font-semibold rounded-lg shadow-xl hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-opacity-75 max-md:mt-2"
            >
              {registering ? (
                <div className="flex gap-3">
                  <div className="spinner"></div> <div>Registering...</div>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
