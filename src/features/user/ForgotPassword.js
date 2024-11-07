import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import API_URL from "../../store";

function ForgotPassword() {
  const INITIAL_USER_OBJ = {
    emailId: "",
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);
  const [showModal, setShowModal] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (userObj.emailId.trim() === "")
      return setErrorMessage("Email Id is required! (use any value)");
    else {
      setLoading(true);
      try {
        const response = await fetch(
          "http://167.71.95.212:8005/users/forget-password/send-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userObj.emailId,
            }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          console.log("Result: ", result);
          setShowModal(true);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
      setLinkSent(true);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setUserObj({ ...userObj, [updateType]: value });
  };

  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

  const handleInputChange = (e, nextInputId, prevInputId) => {
    const { value, id, key } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
    if (value.length === 1 && key !== "Backspace") {
      document.getElementById(nextInputId)?.focus();
    }
    if (key === "Backspace" && value.length === 0) {
      document.getElementById(prevInputId)?.focus();
    }
  };

  const handleSubmit = async () => {
    const combinedValue = Object.values(inputs).join("");
    console.log("Combined Value:", combinedValue);
    try {
      setLoading(true);
      const response = await fetch(
        `http://167.71.95.212:8005/users/forget-password/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userObj.emailId,
            verificationToken: combinedValue,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Incorrect OTP. Please try again.");
      } else {
        console.log(data);
        const user = {
          email: userObj.emailId,
          otp: combinedValue,
        };
        localStorage.setItem("User", JSON.stringify(user));
        navigate("/reset-password");
        // toast.success("Verification Completed");
      }
      // if (response.ok) {
      //   console.log("Result: ", data);
      // }
      // if (!response.ok) {
      //   throw new Error(
      //     data.message || "Registration failed. Please try again."
      //   );
      // }
      // localStorage.setItem("userEmail", userObj.emailId);
      // setShowModal(false);
      // // toast.success("Verification Completed");
      // setLoading(false);
      // navigate("/reset-password");
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Forgot Password
            </h2>

            {linkSent && (
              <>
                <div className="text-center mt-8">
                  <CheckCircleIcon className="inline-block w-32 text-success" />
                </div>
                <p className="my-4 text-xl font-bold text-center">Link Sent</p>
                <p className="mt-4 mb-8 font-semibold text-center">
                  Check your email to reset password
                </p>
                <div className="text-center mt-4">
                  <Link to="/login">
                    <button className="btn btn-block btn-primary ">
                      Login
                    </button>
                  </Link>
                </div>
              </>
            )}

            {!linkSent && (
              <>
                <p className="my-8 font-semibold text-center">
                  We will send password reset link on your email Id
                </p>
                <form onSubmit={(e) => submitForm(e)}>
                  <div className="mb-4">
                    <InputText
                      type="emailId"
                      defaultValue={userObj.emailId}
                      updateType="emailId"
                      containerStyle="mt-4"
                      labelTitle="Email Id"
                      updateFormValue={updateFormValue}
                    />
                  </div>

                  <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
                  <button
                    type="submit"
                    className={
                      "btn mt-2 w-full btn-primary" +
                      (loading ? " loading" : "")
                    }
                  >
                    Send Reset Link
                  </button>

                  <div className="text-center mt-4">
                    Don't have an account yet?{" "}
                    <Link to="/register">
                      <button className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                        Register
                      </button>
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 py-12 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-[#1D232A] px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>Email Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>We have sent a code to your email {userObj.emailId}</p>
                </div>
              </div>

              <div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col space-y-6">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-s">
                      {[
                        "input1",
                        "input2",
                        "input3",
                        "input4",
                        "input5",
                        "input6",
                      ].map((id, index) => (
                        <div key={id} className="w-16 h-16">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 dark:border-[#555fc9] text-lg bg-white dark:bg-[#14181d] focus:bg-gray-50 focus:ring-1 dark:ring-[#555fc9] ring-[#3F00E7]"
                            type="text"
                            name=""
                            id={id}
                            maxLength="1"
                            value={inputs[id]}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `input${index + 2}`,
                                `input${index}`
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <ErrorText styleClass="my-2">{errorMessage}</ErrorText>

                    <div className="flex flex-col space-y-5">
                      <div>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#3F00E7] hover:bg-[#5b33ca] dark:bg-[#555fc9] dark:hover:bg-[#464ea5] border-none text-white text-sm shadow-sm"
                        >
                          Verify Account
                        </button>
                      </div>

                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't receive the code?</p>
                        <a
                          className="flex flex-row items-center text-[#555fc9]"
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Resend
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
