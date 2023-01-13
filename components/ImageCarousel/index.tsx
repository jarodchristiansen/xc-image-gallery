import { useMemo, useState } from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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

  const imageSlides = useMemo(() => {
    if (!images.length) return [];

    return images.map((image, idx) => {
      return (
        <div className="min-w-full" key={image + idx.toString()}>
          <Image
            src={image}
            alt="Wild Landscape"
            width={100}
            height={100}
            unoptimized={true}
          />
        </div>
      );
    });
  }, [images]);

  return (
    <div className="max-h-80 max-w-lg mx-auto">
      <Carousel
        showArrows
        autoPlay
        infiniteLoop
        interval={3000}
        dynamicHeight={false}
        useKeyboardArrows={true}
        showThumbs={false}
      >
        {imageSlides}
      </Carousel>
    </div>
  );
};

export default LandingCarousel;
