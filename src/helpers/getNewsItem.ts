import Axios from "axios";

type newsItems = {
  title: string;
  link: string;
  date: string;
  image: string;
}[];

const getNewsItems = async (newsSourcesToFetch: any) => {
  let newsLinks = [
  ];

  for (const property in newsSourcesToFetch) {
    if (newsSourcesToFetch[property] === true && property !== "false") {
      newsLinks.push(`https://www.newsserver.lucashopman.nl/${property}articles`)
    }
  }

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
