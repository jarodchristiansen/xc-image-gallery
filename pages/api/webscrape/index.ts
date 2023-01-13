import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");

type Data = {
  images: any;
  sortedWordMap: any;
  wordCount: number;
};

type ErrorData = {
  error: string;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  const { url_input } = req.query;
  let cleanedUrl = "";
  let results = [] as any;
  let wordMap = {} as any;
  let sortedWordMap = [] as any;
  let wordCount = 0;

  if (typeof url_input == "string") {
    cleanedUrl = url_input?.replace(/["']/g, "");

    cleanedUrl = cleanedUrl.endsWith("/")
      ? cleanedUrl.slice(0, -1)
      : cleanedUrl;
  }

  if (cleanedUrl) {
    // Protects against case of no string passes/unclean url
    try {
      const response = await fetch(`${cleanedUrl}`);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);

      $("html")
        .find("img")
        .each((index: any, element: any) => {
          if (!element.attribs.src.includes("http")) {
            results.push(cleanedUrl + element.attribs.src);
          } else {
            results.push(element.attribs.src);
          }
        });

      $("html").each(function (i: number, elm: any) {
        // regex: /\s+/g matches 1 or more whitespace characters \n\r\f\t
        let line = $(elm).prop("innerText").replace(/\s+/g, " ");
        for (let word of line.split(" ")) {
          word = word?.replace(/["']/g, "");

          if (!wordMap[word]) {
            wordMap[word] = 1;
          } else {
            wordMap[word]++;
          }
        }
      });

      for (var word in wordMap) {
        wordCount += wordMap[word];
        sortedWordMap.push([word, wordMap[word]]);
      }

      sortedWordMap.sort(function (a: any, b: any) {
        return b[1] - a[1];
      });

      sortedWordMap = sortedWordMap.slice(0, 10).map((result: any) => {
        return { word: result[0], count: result[1] };
      });
    } catch (err) {
      res.statusCode = 404;
      let errObject = {
        name: "no url",
        error:
          "Url was not not found. Double Check the spelling and please try again.",
      };
      return res.json(errObject);
    }
  }

  res.status(200).json({ images: results, sortedWordMap, wordCount });
}
