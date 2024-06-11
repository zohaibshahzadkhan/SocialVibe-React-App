import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Trends = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchTrends = () => {
      const dummyTrends = [
        { id: 1, hashtag: 'ReactJS', occurences: 120 },
        { id: 2, hashtag: 'JavaScript', occurences: 95 },
        { id: 3, hashtag: 'WebDevelopment', occurences: 80 },
      ];
      setTrends(dummyTrends);
    };

    fetchTrends();
  }, []);

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <h3 className="mb-6 text-xl">Trends</h3>

      <div className="space-y-4">
        {trends.map((trend) => (
          <div key={trend.id} className="flex items-center justify-between">
            <p className="text-xs">
              <strong>#{trend.hashtag}</strong><br />
              <span className="text-gray-500">{trend.occurences} posts</span>
            </p>
            <Link to={`/trendview/${trend.hashtag}`} className="py-2 px-3 bg-purple-600 text-white text-xs rounded-lg">
              Explore
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trends;