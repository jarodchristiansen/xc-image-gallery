import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TestCountChart from "./index";

export type TextResult = {
  word: string;
  count: number;
};

describe("TextCountChart", () => {
  let textResults = [
    { word: "hello", count: 27 },
    { word: "world", count: 22 },
  ];

  it("Should render the chart holder", () => {
    render(<TestCountChart data={textResults} />);

    expect(screen.getByTestId("chart-holder")).toBeTruthy();
  });

  it("Should display the words found to be most commonly used (top 10)", () => {
    render(<TestCountChart data={textResults} />);

    expect(screen.getByText("hello")).toBeTruthy();
    expect(screen.getByText("world")).toBeTruthy();
  });
});
