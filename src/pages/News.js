import React, { useEffect, useState } from "react";
import axios from "axios";
import Article from "../components/Article";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const getData = () => {
    axios
      .get("http://localhost:3003/articles")
      .then(res => setNewsData(res.data));
  };
  // console.log(typeof (newData.author));

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (content.length < 50) {
      setError(true);
    } else {
      axios
        .post("http://localhost:3003/articles", {
          author,
          content,
          date: Date.now()
        })
        .then(() => {
          setError(false);
          setAuthor();
          setContent("");
          getData();
        });
    }
  };

  return (
    <div className="news-container">
      <h1>News</h1>

      <form onSubmit={e => handleSubmit(e)}>
        <input
          onChange={e => setAuthor(e.target.value)}
          type="text"
          placeholder="Nom"
          value={author}
        />
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          onChange={e => setContent(e.target.value)}
          placeholder="Message"
          value={content}
        />
        {error && <p>Veuillez écrire un minimum de 50 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {newsData
          .sort((a, b) => b.date - a.date)
          .map(article => <Article key={article.id} article={article} />)}
      </ul>
    </div>
  );
};

export default News;
