import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Timeline from './components/Temline';

const App = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(
          'https://www.mocky.io/v2/5d1ef97d310000552febe99d'
        );
        setTweets(response.data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div className='app'>
      <Timeline tweets={tweets} />
    </div>
  );
};

export default App;
