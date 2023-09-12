import React, { useEffect } from "react";
import Header from "./components/Header";
import NewsItem from "./components/NewsItem";
import PeaceMode from "./components/Peacemode";
import PlaceholderNewsItemView from "./components/PlaceHolderNewsItemsView";
import SettingsPage from "./components/SettingsPage";
import getNewsItems from "./helpers/getNewsItem";
import sources from "./sources.json";
import { sourceCategory } from "./types/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewsList from "./components/NewsList";

type newsItems = {
  title: string;
  link: string;
  date: string;
  image: string;
}[];

function App() {
  const queryClient = new QueryClient();
  const [news, setNews] = React.useState<newsItems>([]);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [weatherLocation, setWeatherLocation] = React.useState(() => {
    if (localStorage.getItem("location") === null) {
      return "De Bilt";
    }
    return localStorage.getItem("location")!;
  });
  const [compactView, setCompactView] = React.useState(() => {
    if (localStorage.getItem("compactView") === null) {
      return false;
    }
    return JSON.parse(localStorage.getItem("compactView")!);
  });

  const [peaceMode, setPeaceMode] = React.useState(false);
  const [newsSourcesToFetch, setNewsSourcesToFetch] = React.useState(() => {
    let newsCategories: Array<sourceCategory> = JSON.parse(
      JSON.stringify(sources)
    );
    if (localStorage.getItem("newsSources") === null) {
      let defaultSourcesWithToggles = newsCategories.map((x) => ({
        ...x,
        enabled: true,
        sources: x.sources.map((x: string) => ({ name: x, enabled: true })),
      }));
      return defaultSourcesWithToggles;
    }

    return JSON.parse(localStorage.getItem("newsSources")!);
  });

  React.useEffect(() => {
    const getNewsItemsToSet = async () => {
      setNews(await getNewsItems(newsSourcesToFetch));
    };
    getNewsItemsToSet();
  }, [settingsOpen, newsSourcesToFetch]);



  return (
    <>
      <Header
        isOpen={settingsOpen}
        weatherLocation={weatherLocation}
        setIsOpen={setSettingsOpen}
      />
      <SettingsPage
        opened={settingsOpen}
        setOpened={setSettingsOpen}
        newsSourcesToFetch={newsSourcesToFetch}
        setNewsSourcesToFetch={setNewsSourcesToFetch}
        compactView={compactView}
        setCompactView={setCompactView}
        peaceMode={peaceMode}
        setPeaceMode={setPeaceMode}
        setWeatherLocation={setWeatherLocation}
        weatherLocation={weatherLocation}
      />
      {peaceMode && <PeaceMode setPeaceMode={setPeaceMode} />}

      {!peaceMode && (
        <QueryClientProvider client={queryClient}>
          
            <NewsList newsSourcesToFetch={newsSourcesToFetch} />
        </QueryClientProvider>
      )}
    </>
  );
}

export default App;
