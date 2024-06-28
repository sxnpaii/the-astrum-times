"use client";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCookies } from "react-cookie";
import { auth } from "@/config/firebase";
import sass from "@/assets/styles/pages/Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Login = () => {
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [, setCookie] = useCookies();
  const [errorMessages, setErrorMessages] = useState("");

  const LoggingIn = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const cookieVal = await user.getIdToken();
        setCookie("authToken", cookieVal, {
          path: "/",
        });
        navigate.push(`/create`);
      })
      .catch((error) => {
        setErrorMessages(
          error.message
            ? "Login yoki parol xato ! Qaytadan urinib ko'ring!"
            : ""
        );
      });
  };
  return (
    <main className={sass.Login}>
      <h6 className={sass.Text}>Boshqaruv paneliga kiring </h6>
      <form onSubmit={handleSubmit(LoggingIn)} className={sass.Form}>
        <div className={sass.Email}>
          <input
            type="email"
            placeholder="name@example.com"
            {...register("email", { required: "Email kiriting !" })}
          />

          {errors.email && (
            <span className={sass.Error}>{errors.email?.message}</span>
          )}
        </div>

        <div className="password">
          <input
            type="password"
            placeholder="password1234"
            {...register("password", { required: "Parol kiriting !" })}
          />
          {(errors.password && (
            <span className={sass.Error}>{errors.password?.message}</span>
          )) ||
            (errorMessages && (
              <span className={sass.Error}>{errorMessages}</span>
            ))}
        </div>
        <button type="submit" className={sass.Button}>
          Kirish
        </button>
      </form>
    </main>
  );
};

export default Login;
