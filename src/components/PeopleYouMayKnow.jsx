import React, { useState } from "react";
import { Link } from "react-router-dom";

const PeopleYouMayKnow = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      get_avatar:
        "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1718112683~exp=1718116283~hmac=f4c0d0d3d51bbbb6f09968f606e51c5c12064661816ea6c9f8ae374ea8697d9e&w=826",
      friendsCount: 23,
      postsCount: 34,
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@example.com",
      get_avatar:
        "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1718112683~exp=1718116283~hmac=f4c0d0d3d51bbbb6f09968f606e51c5c12064661816ea6c9f8ae374ea8697d9e&w=826",
      friendsCount: 23,
      postsCount: 34,
    },
  ]);
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <h3 className="mb-6 text-xl">People you may know</h3>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={user.get_avatar}
                alt="Avatar"
                className="w-[40px] rounded-full"
              />
              <p className="text-xs">
                <strong>{user.name}</strong>
              </p>
            </div>
            <Link
              to={`/profile/${user.id}`}
              className="py-2 px-3 bg-purple-600 text-white text-xs rounded-lg"
            >
              Show
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
