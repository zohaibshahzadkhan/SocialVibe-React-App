import { rest } from "msw";
const baseURL = "https://socialvibe-api-32609e33d535.herokuapp.com";

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
];
