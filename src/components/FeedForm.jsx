import React, { useState } from 'react';

const FeedForm = ({ submitForm }) => {
  const [body, setBody] = useState('');
  const [url, setUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm({ body, url });
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <div className="p-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="p-4 w-full bg-gray-100 rounded-lg"
          placeholder="What are you thinking about?"
        ></textarea>

        {url && (
          <div id="preview">
            <img src={url} alt="Preview" className="w-[100px] mt-3 rounded-xl" />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 flex justify-between">
        <label className="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          Attach image
        </label>

        <button type="submit" className="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">
          Post
        </button>
      </div>
    </form>
  );
};

export default FeedForm;
