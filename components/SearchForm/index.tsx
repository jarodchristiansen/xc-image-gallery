import { useState } from "react";
import { ImageResult, TextResult } from "../../types";

interface SearchFormProps {
  setIsLoading: (answer: boolean) => void;
  setWordCount: (count: number) => void;
  setImageResults: (array: ImageResult[]) => void;
  setTextResults: (array: TextResult[]) => void;
  setErrorMessage: (message: string) => void;
}

const SearchForm = ({
  setIsLoading,
  setWordCount,
  setImageResults,
  setTextResults,
  setErrorMessage,
}: SearchFormProps) => {
  const [urlInput, setUrlInput] = useState<string>("");
  const [submitDisabled, setSubmitDisabled] = useState(true);

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

    let results = await fetch(`/api/webscrape/?url_input='${urlInput}'`)
      .then((res) => res.json())
      .catch((err) => {
        setErrorMessage(err?.error);
      });

    setIsLoading(false);
    setWordCount(results?.wordCount);

    if (results?.images) {
      setImageResults(results.images);
    }

    if (results?.sortedWordMap) {
      setTextResults(results.sortedWordMap);
    } else if (
      !results?.wordCount &&
      !results.images &&
      !results?.sortedWordMap
    ) {
      setErrorMessage(
        "No content found, please attempt a search with another url"
      );
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
  );
};

export default SearchForm;