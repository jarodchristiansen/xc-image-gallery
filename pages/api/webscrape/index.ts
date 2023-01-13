import type { NextApiRequest, NextApiResponse } from "next";
import cacheData from "memory-cache";

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

  const handleImages = async (html: any) => {
    html.find("img").each((index: any, element: any) => {
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

  const handleText = async (html: any, cheerio: any) => {
    html.each(function (i: number, elm: any) {
      // regex: /\s+/g matches 1 or more whitespace characters \n\r\f\t
      let line = cheerio(elm).prop("innerText").replace(/\s+/g, " ");
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
  };

  const fetchWithCache = async (url: string, options: any) => {
    const value = cacheData.get(url);
    if (value) {
      results = value?.images;
      sortedWordMap = value?.sortedWordMap;
      wordCount = value?.wordCount;

      res.status(200).json({ images: results, sortedWordMap, wordCount });
    } else {
      try {
        const response = await fetch(`${cleanedUrl}`, options);
        const htmlString = await response.text();
        const $ = cheerio.load(htmlString);

        const html = $("html");

        // TODO: Improve runtime complexity of 2 calls while keeping verbose
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
    // Protects against case of no string passes/unclean url waits for js loading 10s
    let options = {
      timeout: 1000,
    };
    await fetchWithCache(cleanedUrl, options);
  }
}
