import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { createReview } from '../lib/api';
import RatingStars from './RatingStars';

export default function ReviewModal({ isOpen, onClose, itemId, itemType, itemTitle }) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await createReview({
        itemId,
        itemType,
        rating,
        comment
      }, session.accessToken);

      onClose();
      // Aquí podrías agregar un toast de éxito
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Añadir reseña</h2>
          <p className="text-gray-600 mb-4">Para {itemTitle}</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Calificación</label>
              <RatingStars rating={rating} setRating={setRating} />
            </div>
            
            <div className="mb-4">
              <label htmlFor="comment" className="block text-gray-700 mb-2">Comentario</label>
              <textarea
                id="comment"
                rows="4"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}