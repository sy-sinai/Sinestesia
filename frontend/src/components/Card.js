import Link from 'next/link';

export default function Card({ item, type }) {
  const getDetailLink = () => {
    switch(type) {
      case 'movie': return `/movies/${item._id}`;
      case 'music': return `/music/${item._id}`;
      case 'food': return `/food/${item._id}`;
      default: return '#';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <img 
        src={item.imageUrl || '/placeholder.jpg'} 
        alt={item.title || item.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 line-clamp-1">{item.title || item.name}</h3>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-yellow-500">★ {item.averageRating?.toFixed(1) || 'N/A'}</span>
          <span className="text-gray-600">
            {item.releaseYear || item.year || item.countryOfOrigin}
          </span>
        </div>
        
        <Link 
          href={getDetailLink()}
          className="block w-full bg-blue-500 text-white py-2 px-4 rounded text-center hover:bg-blue-600 transition-colors"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}