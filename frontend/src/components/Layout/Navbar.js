import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FiMenu } from 'react-icons/fi';

export default function Navbar({ toggleSidebar }) {
  const { data: session } = useSession();
  
  return (
    <nav className="fixed top-0 w-full bg-blue-800 text-white p-4 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-200">
          Culturapp
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/movies" className="hover:text-blue-200">Películas</Link>
          <Link href="/music" className="hover:text-blue-200">Música</Link>
          <Link href="/food" className="hover:text-blue-200">Comida</Link>
          <Link href="/nominations" className="hover:text-blue-200">Nominaciones</Link>
          
          {session ? (
            <button 
              onClick={toggleSidebar} 
              className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <span>Mi Cuenta</span>
            </button>
          ) : (
            <Link href="/auth/signin" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500">
              Iniciar Sesión
            </Link>
          )}
        </div>

        <button 
          onClick={toggleSidebar} 
          className="md:hidden text-2xl"
        >
          <FiMenu />
        </button>
      </div>
    </nav>
  );
}