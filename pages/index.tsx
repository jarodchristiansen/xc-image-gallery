import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useMemo, useState } from "react";
import TextCountChart from "../components/TextCountChart";
import LandingCarousel from "../components/ImageCarousel";

export default function Home() {
  const [urlInput, setUrlInput] = useState<string>("");
  const [imageResults, setImageResults] = useState([]);
  const [textResults, setTextResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [wordCount, setWordCount] = useState(undefined);

  const sendRequest = async (e: React.ChangeEvent<HTMLFormElement>) => {
    // Sends URL to fetch images/data
    e.preventDefault();

    let results = await fetch(`/api/webscrape/?url_input='${urlInput}'`)
      .then((res) => res.json())
      .catch((err) => console.log({ err }));

    setWordCount(results.wordCount);

    if (results?.images) {
      setImageResults(results.images);
    }

    if (results?.sortedWordMap) {
      setTextResults(results.sortedWordMap);
    }
  };

  const validateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    let input = e.target.value;

    // http://www.faqs.org/rfcs/rfc3987.html - Reference
    let expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    let test = input.match(regex);
    console.log({ test });
  };

  // const PhotoGallery = useMemo(() => {
  //   if (!imageResults) return [];

  //   return imageResults.map((image, idx) => {
  //     return (
  //       <div className="min-w-full" key={image + idx.toString()}>
  //         <Image src={image} height={90} width={90} alt="image" />
  //       </div>
  //     );
  //   });
  // }, [imageResults]);

  return (
    <div className="flex-col text-center items-center">
      <Head>
        <title>XC Gallery</title>
        <meta name="description" content="Image/text scraper for XC takehome" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Scrape a site to get your details</h1>

      <form
        onSubmit={sendRequest}
        className="flex-col mx-auto border-2 border-solid w-8/12 text-center p-8"
      >
        <div>
          <label htmlFor="url-input">
            Enter a valid URL to see the images/text count of that page
          </label>
          <input
            type="text"
            name="url-input"
            className="min-w-full border-2 border-solid"
            onChange={(e) => validateForm(e)}
          />
        </div>

        <div className="pt-6">
          <button type="submit" className="border-2 border-solid">
            Submit
          </button>
        </div>
      </form>

      <div>
        {wordCount && <h3>Total Word Count: {wordCount}</h3>}

        {textResults && <TextCountChart data={textResults} />}

        {imageResults && <LandingCarousel photos={imageResults} />}
      </div>
    </div>
  );
}
