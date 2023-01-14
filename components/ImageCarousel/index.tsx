import Image from "next/image";
import { useMemo } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ImageResult } from "../../types";

interface LandingCarouselProps {
  photos: ImageResult[];
}

/**
 *
 * @param photos: Image src strings scraped from the requested web page in an array
 * @returns LandingCarousel component showcasing the images scraped from page.
 */

const LandingCarousel = (photos: LandingCarouselProps) => {
  const { photos: images } = photos;

  const imageSlides = useMemo(() => {
    if (!images.length) return [];

    return images.map((image: ImageResult, idx: number) => {
      return (
        <div className="min-w-full" key={image + idx.toString()}>
          <Image
            src={image.url || ""}
            alt={image.alt || "Missing Alt Text"}
            width={100}
            height={100}
            unoptimized={true}
          />
        </div>
      );
    });
  }, [images]);

  return (
    <div className="max-h-80 sm:max-w-lg lg:max-w-2xl mx-auto">
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
