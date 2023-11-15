import { useQuery } from "@tanstack/react-query";
import "../styles/KioskMode.css";
import getNewsItems from "../helpers/getNewsItem";
import { sourceToggle } from "../types/types";
import { useEffect, useRef, useState } from "react";

const KioskMode = () => {
  const refreshInterval = 120000;
  const tickerRef = useRef<HTMLDivElement>(null);
  const newsItemsAmountAsHeadline = 6;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(20);
  const [timer, setTimer] = useState(null as unknown as NodeJS.Timer);

  // Queries
  const query = useQuery({
    queryKey: ["kiosk"],
    refetchInterval: refreshInterval,
    queryFn: async () => {
      return getNewsItems([
        { enabled: true, sources: [{ name: "nos", enabled: true }] },
      ] as unknown as Array<sourceToggle>);
    },
    onSuccess: (e) => {
      const animationScrollSpeed = 6;
      const mainNewsLineSwitchms = 8000;
      // Set a timer for switching between highlighted news item.
      // Put it in state so that it can be checked whether its been instantiated between refreshes
      if (!timer) {
        setTimer(
          setInterval(() => {
            setCurrentIndex(
              (prevIndex) => (prevIndex + 1) % newsItemsAmountAsHeadline
            );
            console.log(currentIndex);
          }, mainNewsLineSwitchms)
        );
      }
      setAnimationDuration(e.length * animationScrollSpeed);
    },
  });

  useEffect(() => {
    // Dynamically get width of ticker items to determine full width
    if (tickerRef.current) {
      const totalWidth = Array.from(tickerRef.current.children).reduce(
        (acc, child) => acc + child.getBoundingClientRect().width,
        0
      );

      tickerRef.current.style.width = `${totalWidth}px`;
    }
  }, [query.data]);

  return (
    <>
      <div className="kioskContainer">
        <div className="kioskNewsContainer">
          <img
            alt={query.data ? query.data![currentIndex].title : ""}
            src={query.data ? query.data![currentIndex].image : ""}
          />
          {query.data
            ?.filter((e, i) => i < newsItemsAmountAsHeadline)
            .map((e, i) => {
              if (i === currentIndex) {
                return (
                  <>
                    <h2 className="newsItemHighlight">{e.title}</h2>
                  </>
                );
              }
              return <h2>{e.title}</h2>;
            })}
        </div>
      </div>
      <div className="tickerContainer">
        <div
          ref={tickerRef}
          className="ticker"
          style={{ animationDuration: `${animationDuration}s` }}
        >
          {query.data &&
            query.data
              .filter((e, i) => i > newsItemsAmountAsHeadline)
              .map((e, i) => {
                const letterLengthWeight = 12;
                const contentWidth = e.title.length * letterLengthWeight;
                return (
                  <div
                    className="tickerItem"
                    style={{ width: `${contentWidth}px` }}
                  >
                    {e.title}
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default KioskMode;
