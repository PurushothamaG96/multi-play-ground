"use client";
import dynamic from "next/dynamic";

const LoginFn = dynamic(() => import("@/components/auth/login"), {
  ssr: false,
});

const Login = () => {
  return <LoginFn />;
};

export default Login;
