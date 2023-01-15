/**
 *
 * @param e: Form onChange Event
 * @param setUrlInput: Sets the url input from parent form as match case for regex
 * @param setSubmitDisabled: Sets the submit button to disabled if input doesn't match regex
 * @param setErrorMessage: Displays the error message related to failing url regex
 */
export const validateURLForm = (
  e: React.ChangeEvent<HTMLFormElement>,
  setSubmitDisabled: (entry: boolean) => void,
  setErrorMessage: (entry: string) => void,
  submitDisabled: boolean
) => {
  let input = e.target.value;

  // http://www.faqs.org/rfcs/rfc3987.html - Reference, verifies url structure in input
  let expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  let test = input.match(regex);

  if (!input) {
    setErrorMessage("");
  }

  if (test) {
    submitDisabled && setSubmitDisabled(false);
  } else if (!test) {
    !submitDisabled && setSubmitDisabled(true);
  } else if (!test && input.length > 7) {
    setErrorMessage(
      "The url you have provided doesnt appear to match the proper format"
    );
  }
};
