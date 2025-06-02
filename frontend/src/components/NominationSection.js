import Link from 'next/link';
import Card from './Card';

export default function NominationSection({ title, items, type }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.slice(0, 4).map((item) => (
          <Card key={item._id} item={item} type={type} />
        ))}
      </div>
      <div className="mt-4 text-right">
        <Link 
          href={`/${type}`}
          className="text-blue-600 hover:underline"
        >
          Ver todos →
        </Link>
      </div>
    </section>
  );
}