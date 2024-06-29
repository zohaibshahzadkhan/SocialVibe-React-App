import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';

function EditProfile() {
  const { user, errors, submitForm, setErrors } = useUser();
  const [form, setForm] = useState({
    email: user.email || '',
    name: user.name || '',
  });
  const fileRef = useRef(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    setErrors([]);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    submitForm(form, fileRef);
  };

  return (
    <div className="main-right">
      <div className="p-12 bg-white border border-gray-200 rounded-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="email">E-mail</label>
            <br />
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your e-mail address"
              className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="avatar">Avatar</label>
            <br />
            <input id="avatar" type="file" ref={fileRef} />
          </div>

          {errors.length > 0 && (
            <div className="bg-red-500 text-white rounded-lg p-6">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="py-4 px-6 bg-purple-600 text-white rounded-lg"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
