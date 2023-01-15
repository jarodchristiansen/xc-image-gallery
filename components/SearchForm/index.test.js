import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SearchForm from "./index";

describe("SearchForm", () => {
  let setIsLoading = jest.fn();
  let setWordCount = jest.fn();
  let setImageResults = jest.fn();
  let setTextResults = jest.fn();

  it("Should render the chart holder", () => {
    render(
      <SearchForm
        setIsLoading={setIsLoading}
        setWordCount={setWordCount}
        setImageResults={setImageResults}
        setTextResults={setTextResults}
      />
    );

    expect(screen.getByTestId("search-form")).toBeTruthy();
  });

  it("Submit button should be disabled if no input", () => {
    render(
      <SearchForm
        setIsLoading={setIsLoading}
        setWordCount={setWordCount}
        setImageResults={setImageResults}
        setTextResults={setTextResults}
      />
    );

    expect(screen.getByTestId("submit-button")).toBeTruthy();
    expect(screen.getByTestId("submit-button")).toHaveProperty(
      "disabled",
      true
    );
  });

  it("Submit is enabled once a valid url is entered", () => {
    render(
      <SearchForm
        setIsLoading={setIsLoading}
        setWordCount={setWordCount}
        setImageResults={setImageResults}
        setTextResults={setTextResults}
      />
    );

    let urlInput = screen.getByTestId("url-input");

    fireEvent.change(urlInput, {
      target: { value: "https://unsplash.com/t/street-photography" },
    });

    expect(screen.getByTestId("submit-button")).toHaveProperty(
      "disabled",
      false
    );
  });

  //   TODO: Further tests for api response
});
