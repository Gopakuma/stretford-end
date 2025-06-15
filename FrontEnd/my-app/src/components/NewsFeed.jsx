import React, { useEffect, useState } from 'react';
import './style/newsFeed.css';

const NewsFeed = () => {
  const [articles, setArticles] = useState([
    {
        "url": "12234",
        "title": "test",
        "description": "description"
    }
  ]);

//   useEffect(() => {
//     // Sample API call (replace with an actual news API)
//     fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY')
//       .then(response => response.json())
//       .then(data => setArticles(data.articles))
//       .catch(error => console.error('Error fetching news:', error));
//   }, []);

  return (
    <div className="news-feed">
      <h2 className="news-title">Latest News</h2>
      <div className="news-list">
        {articles.map((article, index) => (
          <div key={index} className="news-item">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <img src={article.urlToImage} alt={article.title} className="news-image" />
            </a>
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;

