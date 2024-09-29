import SignInForm from "../components/Forms/SignInForm";

const SignIn = () => {
  return (
    <div className="m-auto mt-16 flex w-96 flex-col gap-8 rounded-3xl p-14 pb-10 shadow-lg">
      <h1 className="bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text pb-5 text-center text-2xl text-transparent">
        Sign In
      </h1>
      <SignInForm />
    </div>
  );
};

export default SignIn;
