import Head from "next/head";
import { useState } from "react";
import LandingCarousel from "../components/ImageCarousel";
import TextCountChart from "../components/TextCountChart";

export default function Home() {
  const [urlInput, setUrlInput] = useState<string>("");
  const [imageResults, setImageResults] = useState([]);
  const [textResults, setTextResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loading, setIsLoading] = useState(false);

  const clearData = () => {
    setWordCount(0);
    setImageResults([]);
    setTextResults([]);
  };

  const sendRequest = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    clearData();

    setIsLoading(true);
    setSubmitDisabled(true);

    let results = await fetch(`/api/webscrape/?url_input='${urlInput}'`)
      .then((res) => res.json())
      .catch((err) => setErrorMessage(err?.message));

    setIsLoading(false);

    setWordCount(results?.wordCount);

    if (results?.images) {
      setImageResults(results.images);
    }

    if (results?.sortedWordMap) {
      setTextResults(results.sortedWordMap);
    }

    setSubmitDisabled(false);
  };

  const validateForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    setUrlInput(e.target.value);
    let input = e.target.value;

    // http://www.faqs.org/rfcs/rfc3987.html - Reference
    let expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    let test = input.match(regex);

    if (test) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };
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
        onChange={validateForm}
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
            // onChange={(e) => validateForm(e)}
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={submitDisabled}
            className="border-2 border-solid py-2 px-2 bg-purple-500 text-white disabled:hover:bg-black disabled:cursor-not-allowed"
          >
            <span>Submit</span>
          </button>
        </div>
      </form>

      <div>
        {errorMessage && errorMessage}

        {loading && <h3>Loading...</h3>}

        {!!wordCount && <h3>Total Word Count: {wordCount}</h3>}

        {textResults && <TextCountChart data={textResults} />}

        {!!imageResults.length && <LandingCarousel photos={imageResults} />}
      </div>
    </div>
  );
}
