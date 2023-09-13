import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FunctionComponent, useEffect } from "react";
import getNewsItems from "../helpers/getNewsItem";
import { sourceToggle } from "../types/types";
import React from "react";
import NewsItem from "./NewsItem";
import PlaceholderNewsItemView from "./PlaceHolderNewsItemsView";
import ErrorPage from "./ErrorPage";

interface NewsListProps {
  newsSourcesToFetch: sourceToggle[];
  compactedView: boolean;
}

const NewsList: FunctionComponent<NewsListProps> = ({
  newsSourcesToFetch,
  compactedView
}: NewsListProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(30);
  const containerRef = React.createRef<HTMLDivElement>();
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

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      return getNewsItems(newsSourcesToFetch);
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries(["test"])
    query.refetch()
  }, [newsSourcesToFetch])

  if (query.isLoading) {
    return (
        <div className={"newsContainer"}>
        <PlaceholderNewsItemView />
        </div>
    )
  }

  if (query.error) {
    return (
        <ErrorPage />
    )
  }

  return (
    <div className={compactedView ? "newsContainer compactView" : "newsContainer"}>
      {query.data?.map((n, i) => {
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
      })}
    </div>
  );
};

export default NewsList;
