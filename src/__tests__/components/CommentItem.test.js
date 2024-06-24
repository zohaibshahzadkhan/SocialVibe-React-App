import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CommentItem from "../../components/CommentItem";

const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe("CommentItem", () => {
  it("renders comment data correctly", async () => {
    const comment = {
      id: "17da08ab-f68a-4029-929e-c71a667b8bc6",
      body: "Hello",
      created_by: {
        id: "4a234166-27b0-46ca-9301-67154fae2d7a",
        name: "Ali",
        email: "ali16@gmail.com",
        friends_count: 1,
        posts_count: 1,
        get_avatar:
          "https://res.cloudinary.com/dceudxuqq/image/upload/v1718720898/media/profile_gs8tic.png",
      },
      created_at_formatted: "0 minutes",
    };
    renderWithRouter(<CommentItem comment={comment} />);
    expect(screen.getByAltText("Avatar")).toHaveAttribute(
      "src",
      comment.created_by.get_avatar
    );
    expect(
      screen.getByRole("link", { name: comment.created_by.name })
    ).toHaveAttribute("href", `/profile/${comment.created_by.id}`);
    expect(screen.getByText(comment.body)).toBeInTheDocument();
    expect(screen.getByText("0 minutes ago")).toBeInTheDocument();
  });
});
