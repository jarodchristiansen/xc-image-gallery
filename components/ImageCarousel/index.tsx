import { useState } from "react";
import { Carousel } from "react-bootstrap";

interface LandingCarousel {
  photos: string[];
}

/**
 *
 * @param photos: Image src strings scraped from the requested web page in an array
 * @returns LandingCarousel component showcasing the images scraped from page.
 */

const LandingCarousel = (photos: LandingCarousel) => {
  const { photos: images } = photos;

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="flex flex-col min-w-full">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        fade
        variant="dark"
        indicators={false}
      >
        {!!images.length &&
          images.map((item: any, idx: number) => (
            <Carousel.Item
              key={item + idx.toString()}
              interval={2000}
              className="carousel-item"
            >
              <img
                src={item}
                alt="slides"
                className="carousel-image max-h-96 max-w-7xl mx-auto"
              />
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default LandingCarousel;
