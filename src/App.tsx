import React from "react";
import logo from "./logo.svg";
import Header from "./components/Header";
import TimeDisplayer from "./components/TimeDisplayer";
import NewsItem from "./components/NewsItem";
import getNewsItems from "./helpers/getNewsItem";
import UkraineHeading from "./components/UkraineHeading";

type newsItems = {
  title: string;
  link: string;
  date: string;
  image: string;
}[];

function App() {
  const [news, setNews] = React.useState<newsItems>([]);
  const [newsIndex, setNewsIndex] = React.useState(20);
  let currentIndex = 20;
  React.useEffect(() => {
    const getNewsItemsToSet = async () => {
      setNews(await getNewsItems());
    };
    getNewsItemsToSet();
  }, []);

  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) setNewsIndex(newsIndex + 20);
  };

  window.addEventListener("scroll", (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    let height = window.innerHeight + window.scrollY;
    if (height !== undefined && height > document.body.offsetHeight - 300) {
      setNewsIndex(currentIndex + 5);
      currentIndex = currentIndex + 5;
    }
  });

  return (
    <>
      <Header />
      <UkraineHeading />
      <TimeDisplayer />

      <div style={{ overflowY: "hidden" }}>
        {news.length > 0 ? (
          news.map((n, i) => {
            if (i < newsIndex)
              return (
                <NewsItem
                  title={n.title}
                  urlSource={n.link}
                  imgSource={n.image}
                  publishDate={n.date}
                  sourceName={""}
                />
              );
          })
        ) : (
          <div className="loadingBar">
            <div className="throbber"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
