import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { handlers } from "./src/mocks/handlers";
import axios from 'axios';

axios.defaults.baseURL = 'https://socialvibe-api-32609e33d535.herokuapp.com';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

