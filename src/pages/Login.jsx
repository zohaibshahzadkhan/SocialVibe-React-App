import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useUser } from "../context/UserContext";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const { setToken, setUserInfo } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = [];
    if (!form.email) newErrors.push("Email is required");
    if (!form.password) newErrors.push("Password is required");
    return newErrors;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      try {
        const response = await axios.post("/api/login/", form);
        setToken(response.data);

        const userResponse = await axios.get("/api/me/", {
          headers: {
            Authorization: `Bearer ${response.data.access}`,
          },
        });
        setUserInfo(userResponse.data);

        navigate("/feed");
      } catch (error) {
        console.log("error", error);
        setErrors([
          "The email or password is incorrect! Or the user is not activated!",
        ]);
        showToast(
          5000,
          "The email or password is incorrect! Or the user is not activated!",
          "bg-red-300"
        );
      }
    }
  };

  return (
    <div className="login-max-w-7xl mx-auto login-grid login-grid-cols-2 gap-4">
      <div className="login-main-left">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <h1 className="mb-6 text-2xl">Log in</h1>

          <p className="mb-6 text-gray-500">
            Welcome! Log in to your account to access all features and updates.
          </p>

          <p className="font-bold">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Click here
            </Link>{" "}
            to create one!
          </p>
        </div>
      </div>

      <div className="login-main-right">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <label>E-mail</label>
              <br />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your e-mail address"
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label>Password</label>
              <br />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Your password"
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
              />
            </div>

            {errors.length > 0 && (
              <div className="bg-red-300 text-white rounded-lg p-6">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="py-4 px-6 bg-purple-600 text-white rounded-lg"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
