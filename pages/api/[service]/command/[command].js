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

function convertHighlightText(text) {
  return text.replace(/[\[\]]/g, "");
}

export default async function (req, res) {
  const { service, command, link } = req.query;
  const baseURL = `https://boto3.amazonaws.com/v1/documentation/api/latest/${link}`;
  const response = await axios.get(baseURL);
  const html = response.data;
  const $ = cheerio.load(html);
  const data = {};
  const turndownService = getTurndownService();
  const commandWithoutParentheses = command.replace("()", "");
  const dtSelector = `dt[id="${service}.Client.${commandWithoutParentheses}"]`;
  const dt = $(dtSelector);
  const dd = dt.next("dd");
  data.synopsis = convertHighlightText(
    dd.find(".highlight-python:eq(0) > .highlight").text().trim()
  );
  dd.find(".highlight-python:eq(0)").prev("p").remove();
  dd.find(".highlight-python:eq(0)").remove();
  const paramsHeader = dd.find('.docutils .field-name:contains("Parameters")');
  if (paramsHeader.text()) {
    data.options = turndownService.turndown(
      paramsHeader.next(".field-body").html().trim()
    );
    paramsHeader.next(".field-body").remove();
    paramsHeader.remove();
  }
  const returnsHeader = dd.find('.docutils .field-name:contains("Returns")');
  if (returnsHeader.text()) {
    data.output = turndownService.turndown(
      returnsHeader.next(".field-body").html().trim()
    );
    returnsHeader.next(".field-body").remove();
    returnsHeader.remove();
  }
  const returnTypeHeader = dd.find(
    '.docutils .field-name:contains("Return type")'
  );
  if (returnTypeHeader.text()) {
    returnTypeHeader.next(".field-body").remove();
    returnTypeHeader.remove();
  }
  let examplesHtml = "";
  const examplesHeader = dd.find('p > strong:contains("Examples")');
  if (examplesHeader.text()) {
    examplesHeader
      .parent("p")
      .nextAll()
      .each((i, el) => {
        if ($(el).hasClass("highlight-python")) {
          examplesHtml += `<div><pre><code>${convertHighlightText(
            $(el).text().trim()
          )}</code></pre></div>`;
        } else {
          examplesHtml += $(el).html();
        }
        $(el).remove();
      });
    examplesHeader.parent("p").remove();
    data.examples = turndownService.turndown(examplesHtml);
  }
  data.description = turndownService.turndown(dd.html().trim());
  res.setHeader("Cache-Control", "max-age=86400, s-maxage=86400");
  res.status(200).json(data);
}
