import React, { useRef } from "react";
import logo from "./logo.svg";
import Header from "./components/Header";
import TimeDisplayer from "./components/TimeDisplayer";
import NewsItem from "./components/NewsItem";
import getNewsItems from "./helpers/getNewsItem";
import UkraineHeading from "./components/UkraineHeading";
import SettingsPage from "./components/SettingsPage";
import WeatherDisplayer from "./components/WeatherDisplayer";

type newsItems = {
  title: string;
  link: string;
  date: string;
  image: string;
}[];

function App() {
  const newsDefaults = {
    NU: true,
    Tweakers: true,
    NOS: true,
    AD: true,
    Security: true,
    Telegraaf: true,
  };


  const [news, setNews] = React.useState<newsItems>([]);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(30);
  const [newsSourcesToFetch, setNewsSourcesToFetch] = React.useState({
    NU: true,
    Tweakers: true,
    NOS: true,
    AD: true,
    Security: true,
    Telegraaf: true,
  })

  console.log(newsSourcesToFetch)

  React.useEffect(() => {
    const getNewsItemsToSet = async () => {
      setNews(await getNewsItems(newsSourcesToFetch));
    };
    console.log("set")
    getNewsItemsToSet();
  }, [settingsOpen]);

  // React.useEffect(() => {
  //   setNewsSourcesToFetch(
  //     JSON.parse(
  //       localStorage.getItem("newsSources") || JSON.stringify(newsDefaults)
  //     )
  //   )
  // }, [])

  React.useEffect(() => {
    window.addEventListener("scroll", scrollAction);

  }, [currentIndex])


  const scrollAction = (e: any) => {

    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    console.log("curr index: " + currentIndex + "News items length " + news.length)
    let height = (window.innerHeight + 0.0) + window.scrollY;
    if (height !== undefined && height > document.body.offsetHeight - 300) {
      console.log("triggered")
      // setNewsIndex(newsIndex + 5);
      // currentIndex = currentIndex + 5;
      if (currentIndex + 5 > news.length) {
        setCurrentIndex(news.length)

      }
      setCurrentIndex(currentIndex + 50);
      window.removeEventListener("scroll", scrollAction)


    }
  }


  return (
    <>
      <Header isOpen={settingsOpen} setIsOpen={setSettingsOpen} />
      <SettingsPage
        opened={settingsOpen} setOpened={setSettingsOpen} newsSourcesToFetch={newsSourcesToFetch} setNewsSourcesToFetch={setNewsSourcesToFetch}
      />
      <WeatherDisplayer />
      <div className={"newsContainer"}>
        {news.length > 0 ? (
          news.map((n, i) => {
            if (i < currentIndex)
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
