import { useState } from "react";
import { ImageResult, TextResult } from "../../types";
import { validateURLForm } from "../../helpers/formHelpers";

interface SearchFormProps {
  setIsLoading: (answer: boolean) => void;
  setWordCount: (count: number) => void;
  setImageResults: (array: ImageResult[]) => void;
  setTextResults: (array: TextResult[]) => void;
}

/**
 *
 * @param SetIsLoading: Sets loading state for page level while scraping
 * @param setWordCount: Sets the total word count from scraped results
 * @param setImageResults: Sets the images that will be used in LandingCarousel from results
 * @param setTextResults: Sets the text array for TextCountChart
 * @returns Form allowing user to enter a url to be scraped for images/text data.
 */
const SearchForm = ({
  setIsLoading,
  setWordCount,
  setImageResults,
  setTextResults,
}: SearchFormProps) => {
  const [urlInput, setUrlInput] = useState<string>("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const clearData = () => {
    setWordCount(0);
    setImageResults([]);
    setTextResults([]);
    setErrorMessage("");
  };

  const sendRequest = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    clearData();

    setIsLoading(true);
    setSubmitDisabled(true);

    // TODO: Consider moving search to SSR query on separate page after input, enables true 404's from API in catch
    let results = await fetch(`/api/webscrape/?url_input='${urlInput}'`).then(
      (res) => res.json()
    );

    if (!!results.message && !!results.name) {
      setErrorMessage(results.message);
    } else {
      setImageResults(results.images);
      setWordCount(results.wordCount);
      setTextResults(results.sortedWordMap);
    }

    setIsLoading(false);
    setSubmitDisabled(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (errorMessage) {
      setErrorMessage("");
    }

    setUrlInput(e.target.value);

    validateURLForm(e, setSubmitDisabled, setErrorMessage, submitDisabled);
  };

  return (
    <div className="flex-col mx-auto md:w-8/12 text-center">
      <form
        onSubmit={sendRequest}
        onChange={handleFormChange}
        className="border-2 border-solid p-8"
      >
        <div>
          <label htmlFor="url-input">
            Enter a valid URL to see the images/text count of that page
          </label>
          <input
            type="text"
            name="url-input"
            className="min-w-full border-2 border-solid"
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

      {errorMessage && (
        <span className="text-red-500 my-6">{errorMessage}</span>
      )}
    </div>
  );
};

export default SearchForm;
