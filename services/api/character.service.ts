import { ICharacter } from "@/shared/types/single-user";
import {
  buildEndpoint,
  END_POINTS,
  HttpClient,
} from "./../../config/api/index";

export class CharacterTypeService {
  constructor(private readonly http: HttpClient) {}

  getSingleCharacter = async (args: {id : number}): Promise<ICharacter> => {
    const enpoint = buildEndpoint(END_POINTS.CHARACTER.GET_SINGLE_CHARACTER, {
      id: args.id.toString(),
    });
    const { data } = await this.http.get<ICharacter>(enpoint ,{},"get-character-single");
    return data;
  };
}
