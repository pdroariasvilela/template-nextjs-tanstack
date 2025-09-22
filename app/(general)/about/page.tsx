'use client';

import { getSingleCharacterQueryOptions } from '@/services/api/queries/get-single-character.query';
import { useQuery } from '@tanstack/react-query';
import { ICharacter } from '@/shared/types/single-user';
const StatusIndicator = ({ status }: { status: ICharacter['status'] }) => {
  const color = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-400',
  }[status];

  return <span className={`inline-block h-3 w-3 rounded-full mr-2 ${color}`}></span>;
};

export default function AboutPage() {
  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useQuery(getSingleCharacterQueryOptions(2));


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-xl">Cargando personaje...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      {character && ( 
        <div className="w-full max-w-sm bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img
            className="w-full h-64 object-cover object-center"
            src={character.image}
            alt={`Imagen de ${character.name}`}
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-2">{character.name}</h1>
            
            <div className="flex items-center text-gray-300 mb-4">
              <StatusIndicator status={character.status} />
              <span className="capitalize">{character.status} - {character.species}</span>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Última ubicación conocida:</p>
              <p className="text-white">{character.location.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}