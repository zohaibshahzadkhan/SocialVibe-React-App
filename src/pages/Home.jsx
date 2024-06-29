import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to SocialVibe
              </h1>
              <p className="text-lg text-gray-800 mb-4">
                Connect with friends, share moments, and discover new things.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Discover Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feed Feature */}
            <div className="feature text-center p-8 rounded-lg bg-blue-100 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-12 h-12 text-blue-600 mb-4 mx-auto animate-bounce"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Feed</h3>
              <p className="text-gray-700">
                Stay updated with posts from your friends.
              </p>
            </div>

            <div className="feature text-center p-8 rounded-lg bg-green-100 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-12 h-12 text-green-600 mb-4 mx-auto animate-pulse"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat</h3>
              <p className="text-gray-700">Chat with friends in real-time.</p>
            </div>

            {/* Posts Feature */}
            <div className="feature text-center p-8 rounded-lg bg-purple-100 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-12 h-12 text-purple-600 mb-4 mx-auto animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Posts
              </h3>
              <p className="text-gray-700">
                Share updates, photos, and videos with your network.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
