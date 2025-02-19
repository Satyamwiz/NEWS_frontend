import { useState, useEffect } from "react";
import axios from "axios";
import NewsFeed from "./NewsFeed";
import './index.css';

function App() {
  const [filters, setFilters] = useState({
    industry: "",
    location: "",
    governmentScheme: "",
    trade: "",
    geopolitics: "",
    sentiment: "",
    event: "",
  });

  const [filterOptions, setFilterOptions] = useState({});
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://news.bklay.xyz/news_feed");
        const sortedNews = res.data.news_feed.sort((a, b) => new Date(b.time) - new Date(a.time));
        setNews(sortedNews);
        extractFilterOptions(sortedNews);
      } catch (err) {
        console.error("Error fetching news feed:", err);
      }
    };
    fetchNews();
  }, []);
  //just where is it going?
  const extractFilterOptions = (newsData) => {
    const options = {
      industry: new Set(),
      location: new Set(),
      governmentScheme: new Set(),
      trade: new Set(),
      geopolitics: new Set(),
      sentiment: new Set(),
      event: new Set(),
    };

    newsData.forEach(item => {
      if (item.news.industries) item.news.industries.forEach(i => options.industry.add(i));
      if (item.news.locations) item.news.locations.forEach(l => options.location.add(l));
      if (item.news.government_scheme) options.governmentScheme.add(item.news.government_scheme);
      if (item.news.trade) options.trade.add(item.news.trade);
      if (item.news.geopolitics) options.geopolitics.add(item.news.geopolitics);
      if (item.news.sentiment) options.sentiment.add(item.news.sentiment);
      if (item.news.event) options.event.add(item.news.event);
    });

    setFilterOptions(Object.fromEntries(Object.entries(options).map(([key, value]) => [key, Array.from(value)])));
  };

  const filteredNews = news.filter((item) => {
    return (
      (!filters.industry || item.news.industries?.includes(filters.industry)) &&
      (!filters.location || item.news.locations?.includes(filters.location)) &&
      (!filters.governmentScheme || item.news.government_scheme === filters.governmentScheme) &&
      (!filters.trade || item.news.trade === filters.trade) &&
      (!filters.geopolitics || item.news.geopolitics === filters.geopolitics) &&
      (!filters.sentiment || item.news.sentiment === filters.sentiment) &&
      (!filters.event || item.news.event === filters.event)
    );
  });

  console.log('filteredNews', filteredNews);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-primary text-primary-text min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-white">Latest News</h1>
  
      <div className="grid grid-cols-2 gap-4 mb-6 w-full max-w-2xl">
        {Object.keys(filters).map((key) => (
          <select
            key={key}
            name={key}
            value={filters[key]}
            onChange={handleFilterChange}
            className="p-3 border border-primary-accent rounded-md w-full bg-primary-light text-primary-text shadow-sm focus:ring focus:ring-blue-400 outline-none"
          >
            <option value="">Select {key.replace(/([A-Z])/g, " $1").trim()}</option>
            {(filterOptions[key] || []).map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        ))}
      </div>
  
      <NewsFeed filteredNews={filteredNews} />
    </div>
  );  
}

export default App;
