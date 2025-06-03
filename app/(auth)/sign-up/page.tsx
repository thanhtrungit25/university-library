"use client";

import { signUpSchema } from "@/lib/validations";

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";

const SignUpPage = () => {
  return (
    <div>
      <AuthForm
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{
          fullName: "",
          email: "",
          password: "",
          universityId: 0,
          universityCard: "",
        }}
        onSubmit={signUp}
      />
    </div>
  );
};

export default SignUpPage;
