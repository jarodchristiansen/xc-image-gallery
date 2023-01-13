import { useState } from "react";
// import { items } from "../public/Items.json";
import { Carousel } from "react-bootstrap";

const LandingCarousel = (photos: any) => {
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

// const CarouselContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   max-width: 80rem;
//   border-radius: 10px 10px, 0 0;
//   img {
//     max-height: 30rem;
//     max-width: 26rem;
//     @media ${MediaQueries.MD} {
//       min-width: 90rem;
//       min-height: 45rem;
//     }
//   }
//   h3 {
//     color: #3f3e3e;
//     font-weight: bold;
//     letter-spacing: 0.05rem;
//     margin: auto;
//     width: 100%;
//     padding: 0.5rem 0;
//     border-top: 1px solid lightgray;
//     border-right: 1px solid lightgray;
//     border-left: 1px solid lightgray;
//     background-color: #9997f752;
//     max-width: 26rem;
//     @media ${MediaQueries.MD} {
//       max-width: 90rem;
//       border-radius: 0 0 10px 10px;
//     }
//   }
//   p {
//     color: black;
//   }
//   .carousel-item {
//     width: "100%";
//     position: relative;
//     .carousel-control-prev-icon {
//       color: black;
//     }
//     .carousel-control-next-icon {
//       color: black;
//     }
//     .carousel-image {
//       position: relative;
//     }
//   }
// `;

export default LandingCarousel;
