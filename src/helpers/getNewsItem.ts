import Axios from "axios";
import NewsItem from "../components/NewsItem";

type newsItems = {
  title: string;
  link: string;
  date: string;
  image: string;
}[];

const getNewsItems = async () => {
  let key = process.env.API_KEY;
  let newsLinks = [
    "https://www.newsserver.lucashopman.nl/nuarticles",
    "https://www.newsserver.lucashopman.nl/telegraafarticles",
    "https://www.newsserver.lucashopman.nl/adarticles",
    "https://www.newsserver.lucashopman.nl/nosarticles",
    "https://www.newsserver.lucashopman.nl/securityarticles",
  ];
  let result: newsItems = [];

  await Promise.all(
    newsLinks.map(async (link) => {
      await Axios.get(link).then((response) => {
        result = [...result, ...response.data];
      });
    })
  );

  // await Axios.get("https://www.newsserver.lucashopman.nl/nuarticles").then(
  //   (response) => {
  //     result = response.data;
  //   }
  // );

  result.sort((a, b) => {
    if (new Date(a.date).getTime() < new Date(b.date).getTime()) return 1;
    return -1;
  });

  console.log(result);
  return result;
};

export default getNewsItems;
