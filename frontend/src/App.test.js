import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";


test("renders the website title correctly", () => {
  render(<App />);
  const titleElement = screen.getByText(/Welcome to Tiger Tix!/i);
  expect(titleElement).toBeInTheDocument();
});

//in order to run this test, you need to launch the backend servers and the front end webpage!!
test("renders an event name on the page", async () => {
  render(<App />);
  const eventElement = await screen.findByText(/Fall Career Expo/i);
  expect(eventElement).toBeInTheDocument();
});
