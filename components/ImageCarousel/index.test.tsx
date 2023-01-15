import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import LandingCarousel from "./index";

describe("Landing Image Carousel", () => {
  let ImageResults = [
    {
      alt: "Some alt text",
      url: "https://media.istockphoto.com/id/1350046657/photo/dark-green-defocused-blurred-motion-abstract-background.jpg?b=1&s=170667a&w=0&k=20&c=Ju4QUtR0LQ9OQFcn9_1MnSXTbblbYmZrs93qh2uYKuM=",
    },
  ];
  it("should render the carousel itself", () => {
    render(<LandingCarousel photos={ImageResults} />);

    expect(screen.getByTestId("image-carousel")).toBeTruthy();
  });
});
