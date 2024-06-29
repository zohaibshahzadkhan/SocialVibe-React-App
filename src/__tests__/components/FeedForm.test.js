import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeedForm from "../../components/FeedForm";
import { PostsProvider } from "../../context/PostsContext";
import { baseURL, capturedRequests } from "../../mocks/handlers";
import { UserProvider } from "../../context/UserContext";
import { ToastProvider } from "../../context/ToastContext";

jest.mock("../../context/UserContext", () => ({
  useUser: () => ({
    user: {
      isAuthenticated: true,
    },
  }),
  UserProvider: ({ children }) => <div>{children}</div>
}));

describe("FeedForm", () => {
  it("submits the post form and makes a POST request", async () => {
    render(
      <ToastProvider>
        <UserProvider>
          <PostsProvider>
            <FeedForm />
          </PostsProvider>
        </UserProvider>
      </ToastProvider>
    );

    fireEvent.change(
      screen.getByPlaceholderText("What are you thinking about?"),
      {
        target: { value: "My New Post" },
      }
    );

    const file = new File(["image"], "image.png", { type: "image/png" });
    const inputFile = screen.getByLabelText("Attach image");
    fireEvent.change(inputFile, { target: { files: [file] } });

    fireEvent.click(screen.getByText("Post"));

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText("What are you thinking about?")
      ).toHaveValue("")
    );

    expect(
      capturedRequests.filter(
        (req) =>
          req.method === "POST" &&
          req.url.href === `${baseURL}/api/posts/create`
      )
    ).toHaveLength(1);
  });
});
