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
  const formatTime = (publishDate: string) => {
    let date = new Date(publishDate);
    let dateString = "";
    let months = [
      "Januari",
      "Februari",
      "Maart",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Augustus",
      "September",
      "Oktober",
      "November",
      "December",
    ];

    if (date.getDate() !== new Date().getDate()) {
      dateString +=
        date.getDate().toString() +
        " " +
        months[date.getUTCMonth()] +
        " " +
        date.getFullYear() +
        " ";
    }

    dateString +=
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2);

    return dateString;
  };

  let time = formatTime(publishDate);

  // if (publishDate != undefined) {
  //   try {
  //     time = publishDate.includes("T")
  //       ? publishDate.split("T")[0] +
  //         " " +
  //         publishDate.split("T")[1].substring(0, 5)
  //       : publishDate;
  //   } catch (exception) {}
  // }

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
      <a href={urlSource} target="_blank" rel="noreferrer">
        <div className="panel newsItem">
          <img
            alt={"Artikel afbeelding"}
            className={"articleImage"}
            src={imgSource ? imgSource : require("../img/newsfeed.png")}
          ></img>
          <h3>{title}</h3>

          <div className="sourceContainer">
            <h4>{time}</h4>
            <img
              loading="lazy"
              alt={sourceName}
              className="newsSource"
              src={image}
              width="24"
            />
          </div>
        </div>
      </a>
    </>
  );
};

export default NewsItem;
