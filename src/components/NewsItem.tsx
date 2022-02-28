import * as React from "react";
import getNewsItems from "../helpers/getNewsItem";
import getTime from "../helpers/getTime";

type Props = {
  title: string;
  urlSource: string;
  imgSource: string;
  publishDate: string;
  sourceName: string;
};

const NewsItem = ({
  title,
  urlSource,
  imgSource,
  publishDate,
  sourceName,
}: Props) => {
  let time;
  if (publishDate != undefined) {
    try {
      time = publishDate.includes("T")
        ? publishDate.split("T")[0] +
          " " +
          publishDate.split("T")[1].substring(0, 5)
        : publishDate;
    } catch (exception) {}
  }

  let image = "";
  sourceName = urlSource
    .replace("https://", "")
    .replace("www.", "")
    .split("/")[0];

  try {
    image = require("../img/" + sourceName + ".png");
  } catch (exception) {
    image = require("../img/newsfeed.png");
  }

  return (
    <>
      <a href={urlSource} target="_blank">
        <div className="panel newsItem">
          <img
            className={"articleImage"}
            src={imgSource ? imgSource : require("../img/newsfeed.png")}
          ></img>
          <h3>{title}</h3>
          <h4>{time}</h4>
          <img className="newsSource" src={image} width="24" />
        </div>
      </a>
    </>
  );
};

export default NewsItem;
