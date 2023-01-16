import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SearchForm from "./index";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        photos: [
          {
            alt: "Some alt text",
            url: "https://media.istockphoto.com/id/1350046657/photo/dark-green-defocused-blurred-motion-abstract-background.jpg?b=1&s=170667a&w=0&k=20&c=Ju4QUtR0LQ9OQFcn9_1MnSXTbblbYmZrs93qh2uYKuM=",
          },
        ],
        wordCount: 209,
        sortedWordMap: [
          { word: "hello", count: 27 },
          { word: "world", count: 22 },
        ],
      }),
  })
);

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

  it("Performs a search and sets the data on submission", () => {
    render(
      <SearchForm
        setIsLoading={setIsLoading}
        setWordCount={setWordCount}
        setImageResults={setImageResults}
        setTextResults={setTextResults}
      />
    );

    let urlInput = screen.getByTestId("url-input");
    let submitButton = screen.getByTestId("submit-button");

    fireEvent.change(urlInput, {
      target: { value: "https://unsplash.com/t/street-photography" },
    });

    fireEvent.click(submitButton);

    expect(setIsLoading).toBeCalled();
    expect(setWordCount).toBeCalled();
    expect(setImageResults).toBeCalled();
    expect(setTextResults).toBeCalled();
  });
});
