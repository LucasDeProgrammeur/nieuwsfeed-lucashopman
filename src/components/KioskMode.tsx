import { useQuery, useQueryClient } from "@tanstack/react-query";
import "../styles/KioskMode.css";
import getNewsItems from "../helpers/getNewsItem";
import { sourceToggle } from "../types/types";
import { useEffect, useState } from "react";

const KioskMode = () => {
  // Access the client
  const queryClient = useQueryClient();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([] as string[])
  const [titles, setTitles] = useState([] as string[])


  // Queries
  const query = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      return getNewsItems([
        { enabled: true, sources: [{ name: "nu", enabled: true }] },
      ] as unknown as Array<sourceToggle>);
    },
    onSuccess: (e) => {
        const length = 6
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
            console.log(currentIndex)
        }, 2000);
    }
  });





  return (
    <>
      <div className="kioskContainer">
        <div className="kioskNewsContainer">
            <img src={query.data ? query.data![currentIndex].image: ""} />
          {query.data?.map((e, i) => {
          if (i < 5) {
            
            if (i === currentIndex) {
              return (
                <>
                  <h2 className="newsItemHighlight">{e.title}</h2>
                  </>
              );
            }
            return <h2>{e.title}</h2>
          }
        })}

          {/* {titles.length &&
            titles.map((e, i) => {
              if (i === currentIndex) {
                return (
                  <>
                    <img src={images[i]} />
                    <h2>{e}</h2>
                  </>
                );
              }

              return <h2>{e}</h2>;
            })} */}
        </div>
      </div>
      <div className="tickerContainer">
        <div className="ticker">
          {query.data?.map((e) => {
            return <div className="tickerItem">{e.title}</div>;
          })}
        </div>
      </div>
    </>
  );
};

export default KioskMode;
