import SignUpForm from "../components/Forms/SignUpForm";

const SignUp = () => {
  return (
    <div className="m-auto mt-16 flex w-96 flex-col gap-8 rounded-3xl p-14 shadow-lg">
      <h1 className="from-accent bg-gradient-to-r to-blue-500 bg-clip-text pb-5 text-center text-2xl text-transparent">
        Sign Up
      </h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
