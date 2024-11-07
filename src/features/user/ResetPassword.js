import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../../components/Input/InputText";
import LandingIntro from "./LandingIntro";
import { API_URL } from "../../store";
// import { toast } from "react-toastify";
import ErrorText from "../../components/Typography/ErrorText";

export default function ResetPassword() {
  const INITIAL_RESET_PASSWORD_OBJ = {
    newPassword: "",
    repeatedPassword: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetPasswordObj, setResetPasswordObj] = useState(
    INITIAL_RESET_PASSWORD_OBJ
  );
  // const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const navigate = useNavigate();

  const submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    setErrorMessage("");
    // console.log("user email: ", userEmail);

    if (resetPasswordObj.newPassword.trim() === "")
      return setErrorMessage("Password is required!");
    if (resetPasswordObj.repeatedPassword.trim() === "")
      return setErrorMessage("Repeat Password is required!");

    const user = JSON.parse(localStorage.getItem("User"));
    console.log("User info: ", user);
    console.log("Reset passwords: ", resetPasswordObj);
    setLoading(false);
    try {
      setLoading(true);

      const response = await fetch(
        "http://167.71.95.212:8005/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            newPassword: resetPasswordObj.newPassword,
            confirmPassword: resetPasswordObj.repeatedPassword,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Login failed. Please check your credentials."
        );
      } else {
        console.log("Response: ", data);
        setLoading(false);
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      //   toast.error(error.message || "An error occurred. Please try again.");
      setLoading(false);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setResetPasswordObj({ ...resetPasswordObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          {/* <div className="bg-base-100 rounded-xl"> */}
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10 ">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Reset Password
            </h2>
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <InputText
                  type="password"
                  defaultValue={resetPasswordObj.newPassword}
                  updateType="newPassword"
                  containerStyle="mt-4"
                  labelTitle="New Password"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  type="password"
                  defaultValue={resetPasswordObj.repeatedPassword}
                  updateType="repeatedPassword"
                  containerStyle="mt-4"
                  labelTitle="Repeat Password"
                  updateFormValue={updateFormValue}
                />
              </div>
              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={`btn mt-2 w-full btn-primary `}
                disabled={loading}
              >
                {loading ? "Resetting Pasword..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
