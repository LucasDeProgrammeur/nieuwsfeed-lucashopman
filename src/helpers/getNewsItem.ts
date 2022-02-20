import Axios from "axios";
import NewsItem from "../components/NewsItem";



type newsItems = {
    source: {
        id: any;
        name: string;
    };
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
  

const getNewsItems = async () => {
    let key = process.env.API_KEY;
    let result:newsItems = [];
    await Axios.get(`https://newsapi.org/v2/top-headlines?country=nl&apiKey=7e324e5ccca64871b482b29f4aec06e5`).then(response => {
        result = response.data.articles;
    })

    return result;  
}

export default getNewsItems;