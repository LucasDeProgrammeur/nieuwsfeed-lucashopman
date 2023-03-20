import Axios from "axios";
import { sourceToggle } from "../types/types";

type newsItems = {
  title: string;
  link: string;
  date: string;
  image: string;
}[];

const getNewsItems = async (newsSourcesToFetch: Array<sourceToggle>) => {

  let newsLinks:Array<string> = [
  ];
  
  newsSourcesToFetch.forEach(x => {

    x.sources.forEach(x => {
      if (x.enabled) {
        newsLinks.push(`https://www.newsserver.lucashopman.nl/${x.name}articles`)
      }
    })

  })

  let result: newsItems = [];

  await Promise.all(
    newsLinks.map(async (link) => {
      await Axios.get(link).then((response) => {
        result = [...result, ...response.data];
      });
    })
  );

  result.sort((a, b) => {
    if (new Date(a.date).getTime() < new Date(b.date).getTime()) return 1;
    return -1;
  });

  return result;
};

export default getNewsItems;
