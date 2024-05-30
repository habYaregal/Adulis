import { useState } from "react";
import { onRegistration } from "../../api/auth";
const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await onRegistration(values);
      setError("");
      setSuccess(data.message);
      setValues({ email: "", password: "" });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };
  return (
    <>
      <main className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-gray-600">
          <div className="text-center">
            <img
              src="https://floatui.com/logo.svg"
              width={150}
              className="mx-auto"
            />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Sign up
              </h3>
              <p className="">
                Already have an account?{" "}
                <a
                  href="javascript:void(0)"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>
          <form onSubmit={submitHandler} className="mt-8 space-y-5 ">
            <div>
              <label className="font-medium">Email</label>
              <input
                onChange={(e) => onChange(e)}
                value={values.email}
                placeholder="test@gmail.com"
                type="email"
                id="email"
                name="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                onChange={(e) => onChange(e)}
                value={values.password}
                placeholder="password"
                type="password"
                id="password"
                name="password"
                required
                className="w-full mt-2 px-3 py-2 mb-6 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <span className="text-red-600 font-semibold">{error}</span>
            <span className="text-green-600 font-semibold">{success}</span>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Create account
            </button>
            
          </form>
        </div>
      </main>
    </>
  );
};
export default Register;
