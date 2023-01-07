import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import axios from "axios";
import Article from '../components/Article';

const News = () => {

    const [newData, setNewData] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState("");




    const getData = () => {
        axios
            .get("http://localhost:3003/articles")
            .then((res) => setNewData(res.data))
    }
    // console.log(typeof (newData.author));

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='news-container'>
            <Navigation />
            <Logo />
            <h1>News</h1>

            <form >
                <input
                    type="text"
                    placeholder='Nom'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)} />

                <textarea
                    placeholder='Message'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <input type="submit" value="Envoyer" />
            </form>

            <ul>
                {newData.map((article) => (
                    <Article key={article.id} article={article} />
                ))}
            </ul>

        </div>


    );
};

export default News;