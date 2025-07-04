"use client";
import dynamic from "next/dynamic";

const RegisterFn = dynamic(() => import("@/components/auth/register"), {
  ssr: false,
});

const Login = () => {
  return <RegisterFn />;
};

export default Login;
