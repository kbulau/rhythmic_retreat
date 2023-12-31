import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {useEffect, useRef, useState} from 'react';
import {Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const TopGenreContent = ({lengthQuery}) => {
  console.log('hello');
  const [topGenres, setTopGenres] = useState([]);
  const [topGenreData, setTopGenreData] = useState([]);
  const topGenresCache = useRef(new Map());
  useEffect(() => {
    // Check if data is in the cache
    if (topGenresCache.current.has(lengthQuery)) {
      console.log(`i'm in the cache`);

      const cachedData = topGenresCache.current.get(lengthQuery);
      setTopGenreData(cachedData.topGenreDataSorted);
      setTopGenres(cachedData.topGenres);
    } else {
      fetch(
        `/api/topArtists?lengthQuery=${encodeURIComponent(lengthQuery)}`
      ).then((res) => {
        res.json().then((apiData) => {
          // Save data to the cache
          topGenresCache.current.set(lengthQuery, {
            topGenres: apiData.topGenres,
            topGenreDataSorted: apiData.topGenreDataSorted,
          });
          // Update state with fetched data
          setTopGenres(apiData.topGenres);
          setTopGenreData(apiData.topGenreDataSorted);
        });
      });
    }
  }, [lengthQuery]);

  const pieData = {
    labels: topGenres,
    datasets: [
      {
        data: topGenreData,
        backgroundColor: [
          '#205072',
          '#329d9c',
          '#56c596',
          '#7be495',
          '#cff4d2',
        ],
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#cff4d2',
            font: {
              size: 14,
            },
          },
        },
      },

      scales: {
        y: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
    },
  };

  return (
    <div className="w-[45%] flex justify-center ">
      <Pie data={pieData} />
    </div>
  );
};

export default TopGenreContent;
