import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useUser, UserProvider } from "../../context/UserContext";
import { ToastProvider } from "../../context/ToastContext";
import NavBar from "../../components/NavBar";

jest.mock("../../context/UserContext", () => ({
  ...jest.requireActual("../../context/UserContext"),
  useUser: jest.fn(),
}));

const renderWithRouter = (ui, providerProps) => {
  return render(
    <ToastProvider>
      <UserProvider {...providerProps}>
        <Router>{ui}</Router>
      </UserProvider>
    </ToastProvider>
  );
};

describe("NavBar", () => {
  it("renders login and signup links when user is not authenticated", () => {
    useUser.mockReturnValue({ user: { isAuthenticated: false } });
    renderWithRouter(<NavBar />, { providerProps: {} });
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it("renders user avatar and navigation links when user is authenticated", async () => {
    useUser.mockReturnValue({
      user: {
        isAuthenticated: true,
        id: "4f38f403-24b0-42a6-ae40-a8b9637c8789",
        avatar:
          "https://res.cloudinary.com/dceudxuqq/image/upload/v1/media/avatars/sea_turtle_underwater_art-wallpaper-1920x1080_qpftvs",
      },
    });

    renderWithRouter(<NavBar />, { providerProps: {} });

    expect(screen.getByAltText(/user avatar/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /feed/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /search/i })).toBeInTheDocument();
  });

  test("renders link to user profile when user is authenticated", () => {
    useUser.mockReturnValue({
      user: {
        isAuthenticated: true,
        id: "4f38f403-24b0-42a6-ae40-a8b9637c8789",
        avatar:
          "https://res.cloudinary.com/dceudxuqq/image/upload/v1/media/avatars/sea_turtle_underwater_art-wallpaper-1920x1080_qpftvs",
      },
    });

    renderWithRouter(<NavBar />, { providerProps: {} });

    const profileLink = screen.getByRole("link", { name: /user avatar/i });
    expect(profileLink).toHaveAttribute(
      "href",
      "/profile/4f38f403-24b0-42a6-ae40-a8b9637c8789"
    );
  });

  test("renders the logo", () => {
    useUser.mockReturnValue({ user: { isAuthenticated: false } });

    renderWithRouter(<NavBar />, { providerProps: {} });

    const logo = screen.getByText(/socialvibe/i);
    expect(logo).toBeInTheDocument();
  });

  test("renders user avatar when user is authenticated", () => {
    useUser.mockReturnValue({
      user: {
        isAuthenticated: true,
        id: "4f38f403-24b0-42a6-ae40-a8b9637c8789",
        avatar:
          "https://res.cloudinary.com/dceudxuqq/image/upload/v1/media/avatars/sea_turtle_underwater_art-wallpaper-1920x1080_qpftvs",
      },
    });

    renderWithRouter(<NavBar />, { providerProps: {} });

    const userAvatar = screen.getByAltText(/user avatar/i);
    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/dceudxuqq/image/upload/v1/media/avatars/sea_turtle_underwater_art-wallpaper-1920x1080_qpftvs"
    );
  });

  test("renders only login and signup links when user is not authenticated", () => {
    useUser.mockReturnValue({ user: { isAuthenticated: false } });

    renderWithRouter(<NavBar />, { providerProps: {} });

    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /feed/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /search/i })
    ).not.toBeInTheDocument();
  });
});
