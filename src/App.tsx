import React from "react";
import Header from "./components/Header";
import NewsItem from "./components/NewsItem";
import Selectable from "./components/Selectable";
import SettingsPage from "./components/SettingsPage";
import WeatherDisplayer from "./components/WeatherDisplayer";
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
  const [newsSourcesToFetch, setNewsSourcesToFetch] = React.useState({
    NU: true,
    Tweakers: true,
    NOS: true,
    AD: true,
    Security: true,
    Telegraaf: true,
  });


  React.useEffect(() => {
    const getNewsItemsToSet = async () => {
      setNews(await getNewsItems(newsSourcesToFetch));
    };
    getNewsItemsToSet();
  }, [settingsOpen, newsSourcesToFetch]);

  const scrollAction = (e: any) => {
    let height = window.innerHeight + 0.0 + window.scrollY;
    if (height !== undefined && height > document.body.offsetHeight - 300) {
      if (currentIndex + 5 > news.length) {
        setCurrentIndex(news.length);
      }
      setCurrentIndex(currentIndex + 50);
      window.removeEventListener("scroll", scrollAction);
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", scrollAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <>
      <Header isOpen={settingsOpen} setIsOpen={setSettingsOpen} />
      <SettingsPage
        opened={settingsOpen}
        setOpened={setSettingsOpen}
        newsSourcesToFetch={newsSourcesToFetch}
        setNewsSourcesToFetch={setNewsSourcesToFetch}
      />
      <WeatherDisplayer />
      <Selectable
        title={"Compacted view"}
        checked={compactView}
        setChecked={() => setCompactView(!compactView)}
      />
      <div
        className={compactView ? "newsContainer compactView" : "newsContainer"}
      >
        {news.length > 0 ? (
          news.map((n, i) => {
            if (i < currentIndex) {
              return (
                <NewsItem
                  title={n.title}
                  urlSource={n.link}
                  imgSource={n.image}
                  publishDate={n.date}
                  sourceName={""}
                />
              );
            }
            return <></>;
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
