import React, { useState, useRef } from 'react';
import { useUser } from '../context/UserContext';

const EditProfile = () => {
  const { user, errors, submitForm } = useUser();
  const [form, setForm] = useState({
    email: user.email || '',
    name: user.name || '',
  });
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(form, fileRef);
  };

  return (
    <div className="main-right">
      <div className="p-12 bg-white border border-gray-200 rounded-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
            <label>Avatar</label>
            <br />
            <input type="file" ref={fileRef} />
          </div>

          {errors.length > 0 && (
            <div className="bg-red-500 text-white rounded-lg p-6">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <div>
            <button className="py-4 px-6 bg-purple-600 text-white rounded-lg">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
