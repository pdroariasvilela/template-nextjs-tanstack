export interface ILocationLink {
    name: string;
    url: string;
  }
  
  export interface ICharacter {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin: ILocationLink;
    location: ILocationLink;
    image: string;
    episode: string[];
    url: string;
    created: string;
  }