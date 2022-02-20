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
  let time =
    publishDate.split("T")[0] + " " + publishDate.split("T")[1].substring(0, 5);
  let image = "";
  try {
    image = require("../img/" + sourceName + ".png");
  } catch (exception) {}

  return (
    <>
      <a href={urlSource} target="_blank">
        <div className="panel newsItem">
          <img src={imgSource}></img>
          <h3>{title}</h3>
          <h4>{time}</h4>
          <img className="newsSource" src={image} width="24" />
        </div>
      </a>
    </>
  );
};

export default NewsItem;
