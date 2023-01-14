import type { NextApiRequest, NextApiResponse } from "next";
import cacheData from "memory-cache";
import { ImageResult, TextResult } from "../../../types";
import cheerio from "cheerio";

type Data = {
  images: [] | ImageResult[];
  sortedWordMap: [] | TextResult[];
  wordCount: number;
};

type ErrorData = {
  error: string;
  name: string;
};

/**
 *
 * @param req - url_input query on req is user supplied URL to be scraped
 * @param res - Images, SortedWordMap, and WordCount of scraped site, or error message
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  const { url_input } = req.query;
  // TODO: Once cheerio type resolved, update these anys
  let cleanedUrl = "";
  let results = [] as ImageResult[];
  let wordMap = {} as any;
  let sortedWordMap = [] as any;
  let wordCount = 0;

  const handleImages = async (html: any) => {
    html.find("img").each((index: number, element: cheerio.TagElement) => {
      if (!element.attribs.src.includes("http")) {
        results.push({
          url: cleanedUrl + element.attribs.src,
          alt: element.attribs.alt || "Missing alt text",
        });
      } else {
        results.push({
          url: element.attribs.src,
          alt: element.attribs.alt || "Missing alt text",
        });
      }
    });
  };

  // TODO: Find Cheerio Type for $('HTML'), Selector type not applicable
  const handleText = async (html: any, cheerio: cheerio.Root) => {
    html.each(function (i: number, elm: cheerio.Element) {
      // TODO: Improve this regex to be more robust with html element chars or update to htmlparser library
      // Potential library: https://www.npmjs.com/package/html-react-parser

      // textContent gets the content of all elements, including <script> and <style> elements.
      // In contrast, innerText only shows "human-readable" elements. although innerText is more computational expensive
      let line = cheerio(elm)
        .prop("innerText")
        .replace(/\s+/g, " ")
        .replace(/(<([^>]+)>)/gi, "");

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

    sortedWordMap = sortedWordMap
      .sort(function (a: [string, number], b: [string, number]) {
        return b[1] - a[1];
      })
      .slice(0, 10)
      .map((result: [string, number]) => {
        return { word: result[0], count: result[1] };
      });
  };

  const fetchWithCache = async (url: string, options: any) => {
    const value = cacheData.get(url);
    if (value) {
      results = value.images;
      sortedWordMap = value.sortedWordMap;
      wordCount = value.wordCount;

      res.status(200).json({ images: results, sortedWordMap, wordCount });
    } else {
      try {
        const response = await fetch(`${cleanedUrl}`, options);
        const htmlString = await response.text();
        const $ = cheerio.load(htmlString);

        const html = $("html");

        // TODO: Improve runtime complexity of both calls while keeping verbose
        await handleImages(html);
        await handleText(html, $);

        let data = { images: results, sortedWordMap, wordCount };
        let hours = 168;

        cacheData.put(url, data, hours * 1000 * 60 * 60);
        res.status(200).json({ images: results, sortedWordMap, wordCount });
      } catch (err) {
        let errObject = {
          name: "no url",
          error: "Url was not found, please verify the spelling or try again",
        };

        return res.status(404).json(errObject);
      }
    }
  };

  if (typeof url_input == "string") {
    cleanedUrl = url_input?.replace(/["']/g, "");

    cleanedUrl = cleanedUrl.endsWith("/")
      ? cleanedUrl.slice(0, -1)
      : cleanedUrl;
  }

  if (cleanedUrl) {
    let options = {
      timeout: 1000,
    };
    await fetchWithCache(cleanedUrl, options);
  }
}
