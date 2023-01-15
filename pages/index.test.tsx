import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("Landing Page", () => {
  it("Should", () => {
    render(<Home />);

    expect(screen.getByTestId("main-page-container")).toBeTruthy();
  });
});
