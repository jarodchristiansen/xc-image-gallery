import Head from "next/head";
import { useState } from "react";
import LandingCarousel from "../components/ImageCarousel";
import TextCountChart from "../components/TextCountChart";
import SearchForm from "../components/SearchForm";
import { ImageResult, TextResult } from "../types";

/**
 *
 * @returns Landing Page with SearchForm/TextCountChart/Landing carousel for scraped sites
 */
export default function Home() {
  const [imageResults, setImageResults] = useState<[] | ImageResult[]>([]);
  const [textResults, setTextResults] = useState<[] | TextResult[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [loading, setIsLoading] = useState(false);

  return (
    <div
      className="flex flex-col min-w-full text-center items-center"
      data-testid="main-page-container"
    >
      <Head>
        <title>XC Gallery</title>
        <meta name="description" content="Image/text scraper for XC takehome" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Scrape a site to see the text and image content from the page</h1>

      <SearchForm
        setIsLoading={setIsLoading}
        setWordCount={setWordCount}
        setImageResults={setImageResults}
        setTextResults={setTextResults}
      />

      <div className="flex flex-col gap-y-16">
        {loading && <h3>Loading...</h3>}

        {!!wordCount && (
          <div>
            <h3>Total Word Count: {wordCount}</h3>
            <h5>(Hover pie chart to see respective word usage)</h5>

            {textResults && <TextCountChart data={textResults} />}
          </div>
        )}

        <div>
          {!!imageResults.length && <LandingCarousel photos={imageResults} />}
        </div>
      </div>
    </div>
  );
}
