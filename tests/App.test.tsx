import React from "react";
import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import App from "../src/App";

test("loads the App component", () => {
  render(<App />);
});

test("should display form", async () => {
  const { getAllByTestId } = render(<App />);

  const user = await UserEvent.setup();

  const form = getAllByTestId("add-form")[0];

  const btn = form.querySelector("button");
  expect(btn).toBeDefined();
  expect(btn?.textContent).toBe("Añadir");
  const input = form.querySelector('[name="people"]') as HTMLInputElement;
  expect(input).toBeDefined();
  await user.type(input, "4");
  expect(input.value).toBe("4");
});
