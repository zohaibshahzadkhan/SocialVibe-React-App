import React, { useState, useRef } from 'react';
import { usePosts } from '../context/PostsContext';

const FeedForm = () => {
  const { submitPost } = usePosts();
  const [body, setBody] = useState('');
  const [url, setUrl] = useState(null);
  const fileInputRef = useRef(null);

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
    let formData = new FormData();
    formData.append('image', fileInputRef.current.files[0]);
    formData.append('body', body);
    submitPost(formData);

    setBody('');
    fileInputRef.current.value = null;
    setUrl(null);
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
            ref={fileInputRef}
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
