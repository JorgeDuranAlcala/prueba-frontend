import React from "react";
import { test } from "vitest";
import { render } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import App from "../src/App";

test("loads the App component", () => {
  render(<App />);
});
