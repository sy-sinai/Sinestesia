import { useEffect, useState } from 'react';
import { getTopRatedItems } from '../lib/api';
import NominationSection from '../components/NominationSection';

export default function Home() {
  const [topItems, setTopItems] = useState({
    movies: [],
    music: [],
    food: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopItems = async () => {
      try {
        const [movies, music, food] = await Promise.all([
          getTopRatedItems('movies'),
          getTopRatedItems('music'),
          getTopRatedItems('food')
        ]);
        
        setTopItems({
          movies: movies || [],
          music: music || [],
          food: food || []
        });
      } catch (error) {
        console.error('Error fetching top items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-center mb-12">Lo más valorado en Culturapp</h1>
      
      <NominationSection 
        title="Películas mejor valoradas" 
        items={topItems.movies} 
        type="movie"
      />
      
      <NominationSection 
        title="Música mejor valorada" 
        items={topItems.music} 
        type="music"
      />
      
      <NominationSection 
        title="Comida mejor valorada" 
        items={topItems.food} 
        type="food"
      />
    </div>
  );
}