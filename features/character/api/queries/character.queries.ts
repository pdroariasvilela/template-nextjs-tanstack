import { queryOptions } from '@tanstack/react-query';
import { httpClient } from '@/config/api';
import { CharacterService } from '../character.service';

const characterService = new CharacterService(httpClient);

export const getSingleCharacterQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['get-character-single', id],
    queryFn: async () => characterService.getSingleCharacter({ id }),
  });

export const getAllCharactersQueryOptions = (args: {
  page: number;
  search: string;
}) =>
  queryOptions({
    queryKey: ['get-all-characters', { page: args.page, search: args.search }],
    queryFn: async () => characterService.getAllCharacters(args),
    placeholderData: (previousData) => previousData,
  });
