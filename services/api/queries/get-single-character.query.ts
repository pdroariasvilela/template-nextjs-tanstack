import { queryOptions } from '@tanstack/react-query';
import { httpClient } from '@/config/api';
import { CharacterTypeService } from '../character.service';


const singleCharacter = new CharacterTypeService(httpClient);

export const getSingleCharacterQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['get-character-single', id],
    queryFn: async () => singleCharacter.getSingleCharacter({id}),
  });
