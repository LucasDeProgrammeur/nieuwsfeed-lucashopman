import React from "react";
import logo from "./logo.svg";
import Header from "./components/Header";
import TimeDisplayer from "./components/TimeDisplayer";
import NewsItem from "./components/NewsItem";
import getNewsItems from "./helpers/getNewsItem";

type newsItems = {
  source: {
    id: any;
    name: string;
  };
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}[];

function App() {
  const [news, setNews] = React.useState<newsItems>([]);

  React.useEffect(() => {
    const getNewsItemsToSet = async () => {
      setNews(await getNewsItems());
    };
    getNewsItemsToSet();
    console.log(news);
  }, []);

  return (
    <>
      <Header />
      <TimeDisplayer />
      {console.log(news)}
      {news.length > 0 &&
        news.map((n) => {
          return (
            <NewsItem
              title={n.title}
              urlSource={n.url}
              imgSource={n.urlToImage}
              publishDate={n.publishedAt}
              sourceName={n.source.name}
            />
          );
        })}
    </>
  );
}

export default App;
