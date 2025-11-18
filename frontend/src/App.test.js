process.env.NODE_ENV = "test";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";



test("renders the website greeting correctly", () => {
  render(<App />);
  const titleElement = screen.getByText(/Welcome Back! Log In to TigerTix:/i);
  expect(titleElement).toBeInTheDocument();
});

//in order to run this test, you need to launch the backend servers and the front end webpage!!
test("renders login prompt", async () => {
  render(<App />);
  const eventElement = await screen.findByText(/Register!/i);
  expect(eventElement).toBeInTheDocument();
});
