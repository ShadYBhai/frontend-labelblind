import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaUser } from 'react-icons/fa';

import '../styles/Timline.css';

const Timeline = ({ tweets }) => {
    const [filteredTweets, setFilteredTweets] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [likedTweets, setLikedTweets] = useState([]);

    useEffect(() => {

        const filtered = tweets.filter((tweet) => {
            const tweetDate = new Date(tweet.publishedDate).getTime();
            const start = startDate ? new Date(startDate).getTime() : -Infinity;
            const end = endDate ? new Date(endDate).getTime() : Infinity;
            return tweetDate >= start && tweetDate <= end;
        });
        setFilteredTweets(filtered);
    }, [tweets, startDate, endDate]);

    useEffect(() => {

        const storedLikedTweets = JSON.parse(localStorage.getItem('likedTweets')) || [];
        setLikedTweets(storedLikedTweets);
    }, []);

    const handleLike = (tweetId) => {

        const updatedLikedTweets = likedTweets.includes(tweetId)
            ? likedTweets.filter((id) => id !== tweetId)
            : [...likedTweets, tweetId];
        setLikedTweets(updatedLikedTweets);
        localStorage.setItem('likedTweets', JSON.stringify(updatedLikedTweets));
    };

    const isTweetLiked = (tweetId) => likedTweets.includes(tweetId);

    return (
        <div className="timeline">
            <h1 className='head'>Twitter Timeline</h1>

            <div className="date-filters">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="date-filter-input"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="date-filter-input"
                />
            </div>
            <div className='container'>

                {filteredTweets.map((tweet) => (
                    <div key={tweet._id} className="tweet">
                        <div className="tweet-content">
                            <div className="tweet-author">
                                <FaUser className="author-icon" />
                                <p>{tweet.author}</p>
                            </div>
                            <p className="tweet-text">{tweet.text}</p>
                            <p className="tweet-date">
                                Published: {new Date(tweet.publishedDate).toLocaleString()}
                            </p>
                            <div className="tweet-likes">
                                <button
                                    className={`like-button ${isTweetLiked(tweet._id) ? 'liked' : ''}`}
                                    onClick={() => handleLike(tweet._id)}
                                >
                                    {isTweetLiked(tweet._id) ? (
                                        <FaHeart size={16} />
                                    ) : (
                                        <FaRegHeart size={16} />
                                    )}
                                </button>
                                <p>{tweet.likes} Likes</p>
                            </div>
                        </div>
                        <a href={tweet.url} target="_blank" rel="noopener noreferrer" className="tweet-link">
                            View Tweet
                        </a>
                    </div>
                ))}
                {filteredTweets.length === 0 && <p className="no-tweets">No tweets found.</p>}
            </div>
        </div>
    );
};

export default Timeline;
