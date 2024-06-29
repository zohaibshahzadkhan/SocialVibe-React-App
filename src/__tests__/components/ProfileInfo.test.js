import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ProfileInfo from "../../components/ProfileInfo";
import { PostsProvider } from "../../context/PostsContext";
import { ToastProvider } from "../../context/ToastContext";
import { FriendshipProvider } from "../../context/FriendshipContext";
import { MemoryRouter, Routes, Route } from "react-router-dom";

jest.mock("../../context/UserContext", () => ({
  useUser: jest.fn(() => ({
    user: {
      id: "4f38f403-24b0-42a6-ae40-a8b9637c8789",
      name: "zohaib",
      email: "zohaib16@gmail.com",
      friendsCount: 5,
    },
  })),
}));

describe("ProfileInfo", () => {
  it("renders profile information and actions correctly", async () => {
    const userId = "4f38f403-24b0-42a6-ae40-a8b9637c8789";

    render(
      <MemoryRouter initialEntries={[`/profile/${userId}`]}>
        <ToastProvider>
          <PostsProvider>
            <FriendshipProvider>
              <Routes>
                <Route path="/profile/:userId" element={<ProfileInfo />} />
              </Routes>
            </FriendshipProvider>
          </PostsProvider>
        </ToastProvider>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText("zohaib")).toBeInTheDocument());

    expect(screen.getByText("zohaib")).toBeInTheDocument();
    expect(screen.getByText("zohaib16@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Friends")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.queryByText("Edit")).toBeInTheDocument();
    expect(screen.queryByText("Logout")).toBeInTheDocument();
  });
});
