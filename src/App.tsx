import React, { useEffect, useRef } from "react";
import Header from "./components/Header";
import NewsItem from "./components/NewsItem";
import PlaceholderNewsItemView from "./components/PlaceHolderNewsItemsView";
import SettingsPage from "./components/SettingsPage";
import getNewsItems from "./helpers/getNewsItem";

type newsItems = {
  title: string;
  link: string;
  date: string;
  image: string;
}[];

function App() {
  const [news, setNews] = React.useState<newsItems>([]);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [compactView, setCompactView] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(30);
  const containerRef = React.createRef<HTMLDivElement>();
  const [newsSourcesToFetch, setNewsSourcesToFetch] = React.useState({
    NU: true,
    Tweakers: true,
    NOS: true,
    AD: true,
    Security: true,
    Telegraaf: true,
  });

  React.useEffect(() => {
    if (localStorage.getItem("newsSources")?.length) {
      setNewsSourcesToFetch(
        JSON.parse(localStorage.getItem("newsSources") || "{}")
      );
    }

    if (localStorage.getItem("compactView")?.length) {
      setCompactView(JSON.parse(localStorage.getItem("compactView") || "{}"));
    }
  }, []);

  React.useEffect(() => {
    const getNewsItemsToSet = async () => {
      setNews(await getNewsItems(newsSourcesToFetch));
    };
    getNewsItemsToSet();
  }, [settingsOpen, newsSourcesToFetch]);

  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentIndex(currentIndex + 30);
        }
      });
    }, {});

    if (containerRef.current) observer.observe(containerRef.current!);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, currentIndex]);

  return (
    <>
      <Header isOpen={settingsOpen} setIsOpen={setSettingsOpen} />
      <SettingsPage
        opened={settingsOpen}
        setOpened={setSettingsOpen}
        newsSourcesToFetch={newsSourcesToFetch}
        setNewsSourcesToFetch={setNewsSourcesToFetch}
        compactView={compactView}
        setCompactView={setCompactView}
      />
      

      <div
        className={compactView ? "newsContainer compactView" : "newsContainer"}
      >
        {news.length > 0 ? (
          news.map((n, i) => {
            if (i < currentIndex) {
              const lastElement = i === currentIndex - 10;
              return (
                <div
                  className={lastElement ? "last-child" : ""}
                  ref={lastElement ? containerRef : null}
                >
                  <NewsItem
                    title={n.title}
                    urlSource={n.link}
                    imgSource={n.image}
                    publishDate={n.date}
                    sourceName={""}
                    key={i}
                  />
                </div>
              );
            }
            return <></>;
          })
        ) : (
          <PlaceholderNewsItemView />
        )}
      </div>
    </>
  );
}

export default App;
