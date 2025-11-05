import { IApiResponse, ICharacter } from "../types/character.types";
import { buildEndpoint, END_POINTS, HttpClient } from "@/config/api/index";

export class CharacterService {
  constructor(private readonly http: HttpClient) {}

  getSingleCharacter = async (args: { id: number }): Promise<ICharacter> => {
    const endpoint = buildEndpoint(END_POINTS.CHARACTER.GET_SINGLE_CHARACTER, {
      id: args.id.toString(),
    });
    const { data } = await this.http.get<ICharacter>(
      endpoint,
      {},
      "get-character-single"
    );
    return data;
  };

  getAllCharacters = async (args: {
    page: number;
    search?: string;
  }): Promise<IApiResponse> => {
    const endpoint = buildEndpoint(END_POINTS.CHARACTER.GET_ALL_CHARACTERS);

    const params = new URLSearchParams();
    params.append("page", (args.page + 1).toString());

    if (args.search) {
      params.append("name", args.search);
    }

    const { data } = await this.http.get<IApiResponse>(
      endpoint,
      { params },
      "get-all-characters"
    );

    return data;
  };
}
