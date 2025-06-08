import axios from "axios";
import cheerio from "cheerio";
import TurndownService from "turndown";

export function getTurndownService() {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    hr: "---",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
  });
  return turndownService;
}

export function convertHighlightText(text) {
  return text.replace(/[\[\]]/g, "");
}

export default async function (req, res) {
  const { service, command, link } = req.query;
  const baseURL = `https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/${link}`;
  const response = await axios.get(baseURL);
  const html = response.data;
  const $ = cheerio.load(html);
  const data = {};
  const turndownService = getTurndownService();
  data.synopsis = convertHighlightText(
    $(".highlight-default.notranslate").text().trim()
  );
  data.options = turndownService.turndown(
    $("section > dl > dd > dl > dd:nth-child(2)").html()
  );
  data.output = $("section > dl > dd > dl > dd:nth-child(6) > ul")
    ? turndownService.turndown(
        $("section > dl > dd > dl > dd:nth-child(6) > ul").html()
      )
    : "";
  data.examples = "";
  data.description = "";
  res.setHeader("Cache-Control", "max-age=86400, s-maxage=86400");
  res.status(200).json(data);
}
