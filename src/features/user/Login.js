import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { API_URL } from "../../store";

export const Login = () => {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    email: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // navigate("/app/welcome");
    if (loginObj.email.trim() === "")
      return setErrorMessage("Email is required! (use any value)");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required! (use any value)");
    else {
      setLoading(true);
      let result = null;
      try {
        const response = await fetch(API_URL + "users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginObj.email,
            password: loginObj.password,
          }),
        });
        result = await response.json();
        if (response.ok) {
          setErrorMessage("");
          console.log("Login response: ", result);
          const token = result.token;
          const user = result.user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        }
        if (!response.ok) {
          throw new Error(
            result.message || "Login failed. Please check your credentials."
          );
        }
        // console.log("user info: ", loginObj);
        // const storedUser = JSON.parse(localStorage.getItem("user"));
        // const userName = storedUser?.firstName;
        setLoading(false);
        navigate("/app/welcome");
        // toast.success(`Welcome ${userName}`, {
        //   position: "top-right",
        //   autoClose: 1000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
        // eslint-disable-next-line no-lone-blocks
        // window.location.href = "/app/welcome";
      } catch (err) {
        console.error(err);
        setErrorMessage(result.message);
        setLoading(false);
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  type="email"
                  defaultValue={loginObj.email}
                  updateType="email"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  `w-full text-white bg-[#5D17EB] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center ${
                    loading ? " opacity-30" : ""
                  }` //btn mt-2 w-full btn-primary + (loading ? " loading" : "")
                }
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
                {/* {loading ? (
                  <>
                    <span className="loading loading-spinner loading-lg bg-white text-sm"></span>
                  </>
                ) : (
                  "Login"
                )} */}
              </button>

              <div className="text-center mt-4">
                Don't have an account yet?{" "}
                <Link to="/register">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
