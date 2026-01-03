import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";


const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

const signupSchema = loginSchema.extend({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  phone: z.string().min(8, "Invalid phone"),
});


const Input = React.forwardRef(
  ({ label, type = "text", error, ...props }, ref) => {
    return (
      <div>
        <label className="mb-1 block text-xs text-black/60">
          {label}
        </label>

        <input
          ref={ref}
          type={type}
          {...props}
          className="w-full rounded-lg bg-[#EFE8DD] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#9C3F24]"
        />

        {error && (
          <p className="mt-1 text-xs text-red-500">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";


const LoginSignup = ({ onClose }) => {
  const [mode, setMode] = useState("login");

  const schema = useMemo(
    () => (mode === "login" ? loginSchema : signupSchema),
    [mode]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const url =
        mode === "login"
          ? "/api/auth/login"
          : "/api/auth/signup";

      await axios.post(url, data);
      reset();
      onClose();
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#FFF6EA] px-8 py-7 shadow-xl">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl bg-black/5 p-4 hover:bg-black/10"
        >
          ✕
        </button>

        <h2 className="mb-6 text-xl font-semibold text-[#2E2A26]">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {mode === "signup" && (
            <>
              <Input
                label="Firstname *"
                placeholder="Joey"
                {...register("firstName")}
                error={errors.firstName}
              />
              <Input
                label="Lastname *"
                placeholder="Tribbiani"
                {...register("lastName")}
                error={errors.lastName}
              />
              <Input
                label="Phone *"
                placeholder="+44 9876543210"
                {...register("phone")}
                error={errors.phone}
              />
            </>
          )}

          <Input
            label="E-mail *"
            placeholder="joey@gmail.com"
            {...register("email")}
            error={errors.email}
          />

          <Input
            label="Password *"
            type="password"
            placeholder="Password"
            {...register("password")}
            error={errors.password}
          />

          {mode === "login" && (
            <div className="flex items-center justify-between text-sm ">
              <button type="button" className="underline hover:cursor-pointer">
                Forgot password?
              </button>
            </div>
          )}

          <button
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-[#9C3F24] py-3 text-sm font-medium text-white hover:bg-[#87361F] disabled:opacity-60 hover:cursor-pointer"
          >
            {isSubmitting
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm hover:cursor-pointer">
          {mode === "login"
            ? "Don't have an account?"
            : "Have an account?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              reset();
            }}
            className="underline font-medium"
          >
            {mode === "login" ? "Create account" : "Login"}
          </button>
        </p>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-black/10" />
          <span className="text-xs text-black/50">Or</span>
          <span className="h-px flex-1 bg-black/10" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-black/10 bg-white py-3 text-sm font-medium hover:cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
