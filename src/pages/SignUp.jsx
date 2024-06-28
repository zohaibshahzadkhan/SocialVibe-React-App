import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/SignUp.css";

const SignUp = () => {
  const { signup, errors, setErrors } = useUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  useEffect(() => {
    setErrors([]);
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    signup(form);
    setForm({
      email: "",
      name: "",
      password1: "",
      password2: "",
    });
  };

  return (
    <div className="signup-max-w-7xl mx-auto signup-grid signup-grid-cols-2 gap-4">
      <div className="signup-main-left">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <h1 className="mb-6 text-2xl">Sign up</h1>

          <p className="mb-6 text-gray-500">
            Join us today! Creating an account is quick and easy. Start
            connecting with friends and sharing your stories right away.
          </p>

          <p className="font-bold">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Click here
            </Link>{" "}
            to log in!
          </p>
        </div>
      </div>

      <div className="signup-main-right">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <label>Name</label>
              <br />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
              />
            </div>

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
                name="password1"
                value={form.password1}
                onChange={handleChange}
                placeholder="Your password"
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label>Repeat password</label>
              <br />
              <input
                type="password"
                name="password2"
                value={form.password2}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
              />
            </div>

            {errors.length > 0 && (
              <div className="bg-red-500 text-white rounded-lg p-6">
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
