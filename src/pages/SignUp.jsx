import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
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

    if (!form.name) newErrors.push("Name is required");
    if (!form.email) newErrors.push("Email is required");
    if (!form.password1) newErrors.push("Password is required");
    if (form.password1 !== form.password2)
      newErrors.push("Passwords must match");

    return newErrors;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (validationErrors.length === 0) {
      console.log("Form submitted", form);
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
      <div className="main-left">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <h1 className="mb-6 text-2xl">Sign up</h1>

          <p className="mb-6 text-gray-500">
            Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum
            dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit
            mate. Lorem ipsum dolor sit mate.
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

      <div className="main-right">
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
