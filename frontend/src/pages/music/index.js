import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Card';
import ReviewModal from '../components/ReviewModal';

const sampleMusic = [
  {
    _id: '1',
    name: 'Bohemian Rhapsody',
    artist: 'Queen',
    year: 1975,
    averageRating: 4.9,
    imageUrl: '/placeholder.jpg'
  }
];

export default function MusicPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">Toda la Música</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleMusic.map(item => (
            <Card 
              key={item._id}
              item={item}
              type="music"
              onAddReview={() => {
                setSelectedItem(item);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      </div>

      <ReviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        itemId={selectedItem?._id}
        itemType="music"
        itemTitle={selectedItem?.name}
      />
    </Layout>
  );
}