import axios from "axios";
import cheerio from "cheerio";
import { getTurndownService } from "./command/[command]";

export default async function (req, res) {
  const { service, link } = req.query;
  const baseURL = `https://boto3.amazonaws.com/v1/documentation/api/latest/${link}`;
  const response = await axios.get(baseURL);
  const html = response.data;
  const $ = cheerio.load(html);
  const data = {};
  const commands = [];
  $("h2").remove();
  $("#client > div > ul > li > a").each((index, elem) => {
    const command = {};
    command.name = $(elem).text().trim();
    command.link = $(elem).attr("href");
    commands.push(command);
  });
  data.commands = commands;
  const turndownService = getTurndownService();
  data.description = turndownService.turndown(
    $("#client > dl.class").html().trim()
  );
  res.setHeader("Cache-Control", "max-age=86400, s-maxage=86400");
  res.status(200).json(data);
}
