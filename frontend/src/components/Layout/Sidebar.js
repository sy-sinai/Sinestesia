import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FiX, FiUser, FiStar, FiLogOut } from 'react-icons/fi';

export default function Sidebar({ isOpen, closeSidebar }) {
  const { data: session } = useSession();
  
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'tween' }}
      className="fixed top-0 right-0 h-full w-64 bg-gray-800 text-white z-20 shadow-2xl"
    >
      <button 
        onClick={closeSidebar} 
        className="absolute top-4 right-4 text-2xl hover:text-gray-300"
      >
        <FiX />
      </button>
      
      <div className="p-6 mt-12">
        {session ? (
          <>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-500 rounded-full p-2">
                <FiUser size={20} />
              </div>
              <div>
                <h3 className="font-bold">{session.user.name}</h3>
                <p className="text-sm text-gray-300">{session.user.email}</p>
              </div>
            </div>
            
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/reviews/my-reviews"
                  className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-gray-700"
                  onClick={closeSidebar}
                >
                  <FiStar />
                  <span>Mis Reseñas</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  href="/api/auth/signout"
                  className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-gray-700 text-red-400"
                  onClick={closeSidebar}
                >
                  <FiLogOut />
                  <span>Cerrar Sesión</span>
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="mb-4">Inicia sesión para acceder a tu cuenta</p>
            <Link 
              href="/auth/signin"
              className="bg-blue-600 px-4 py-2 rounded-lg inline-block hover:bg-blue-500"
              onClick={closeSidebar}
            >
              Iniciar Sesión
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}