import axios from "axios";
import cheerio from "cheerio";

export default async function (req, res) {
  const baseURL =
    "https://boto3.amazonaws.com/v1/documentation/api/latest/index.html";
  const response = await axios.get(baseURL);
  const html = response.data;
  const $ = cheerio.load(html);
  const services = [];
  $("#services .toctree-l2 > a.reference").each(
    (index, elem) => {
      const service = {};
      service.name = $(elem).text().trim();
      service.link = $(elem).attr('href');
      services.push(service);
    }
  );
  res.status(200).json(services);
}
