import { rest } from "msw";
export const baseURL = "https://socialvibe-api-32609e33d535.herokuapp.com";

export let capturedRequests = [];

export function captureRequest(req) {
  capturedRequests.push(req);
}

export const handlers = [
  rest.get(`${baseURL}/api/me/`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: "4f38f403-24b0-42a6-ae40-a8b9637c8789",
        name: "zohaib",
        email: "zohaib16@gmail.com",
        avatar:
          "https://res.cloudinary.com/dceudxuqq/image/upload/v1/media/avatars/sea_turtle_underwater_art-wallpaper-1920x1080_qpftvs",
      })
    );
  }),

  rest.post(`${baseURL}/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.post(`${baseURL}/api/posts/create`, (req, res, ctx) => {
    captureRequest(req);
    return res(
      ctx.status(201),
      ctx.json({
        id: "9cf520ba-47c9-48db-9aa8-860adbbb5a8f",
        body: "My New Post",
        likes_count: 0,
        comments_count: 0,
        created_by: {
          id: "4a234166-27b0-46ca-9301-67154fae2d7a",
          name: "Ali",
          email: "ali16@gmail.com",
          friends_count: 1,
          posts_count: 1,
          get_avatar:
            "https://res.cloudinary.com/dceudxuqq/image/upload/v1718720898/media/profile_gs8tic.png",
        },
        created_at_formatted: "0\u00a0minutes",
        comments: [],
        attachments: [
          {
            id: "151e5ab4-1e2c-4909-80f7-50f87dd31827",
            get_image:
              "https://res.cloudinary.com/dceudxuqq/image/upload/v1/media/post_attachments/sea_turtle_underwater_art-wallpaper-1920x1080_ucq8tq",
          },
        ],
      })
    );
  }),

  rest.get(`${baseURL}/api/posts/:postId/`, (req, res, ctx) => {
    return res(
      ctx.json({
        post: {
          id: "9cf520ba-47c9-48db-9aa8-860adbbb5a8f",
          body: "My First Post",
          likes_count: 0,
          comments_count: 1,
          created_by: {
            id: "4a234166-27b0-46ca-9301-67154fae2d7a",
            name: "Ali",
            email: "ali16@gmail.com",
            friends_count: 1,
            posts_count: 1,
            get_avatar:
              "https://res.cloudinary.com/dceudxuqq/image/upload/v1718720898/media/profile_gs8tic.png",
          },
          created_at_formatted: "0\u00a0minutes",
          comments: [
            {
              id: "17da08ab-f68a-4029-929e-c71a667b8bc6",
              body: "Heelow",
              created_by: {
                id: "4a234166-27b0-46ca-9301-67154fae2d7a",
                name: "Ali",
                email: "ali16@gmail.com",
                friends_count: 1,
                posts_count: 1,
                get_avatar:
                  "https://res.cloudinary.com/dceudxuqq/image/upload/v1718720898/media/profile_gs8tic.png",
              },
              created_at_formatted: "0\u00a0minutes",
            },
          ],
          attachments: [
            {
              id: "151e5ab4-1e2c-4909-80f7-50f87dd31827",
              get_image:
                "https://res.cloudinary.com/dceudxuqq/image/upload/v1/media/post_attachments/sea_turtle_underwater_art-wallpaper-1920x1080_ucq8tq",
            },
          ],
        },
      })
    );
  }),
];
