import api from "api";
import { Breed, Dog, FavoriteDog } from "./types";

type PageParams = {
  pageParam: number;
};

export const getPaginatedDogs =
  (breed: string | undefined) =>
  async ({
    pageParam = 1,
  }: Partial<PageParams>): Promise<{ res: Dog[]; nextPage: number }> => ({
    res: await api
      .get(
        `images/search?limit=6&page=${pageParam}&order=DESC${
          breed ? `&breed_id=${breed}` : ""
        }`
      )
      .json(),
    nextPage: pageParam + 1,
  });

export const getDog = (id: string | undefined): Promise<Dog> =>
  api.get(`images/${id}`).json();

export const getFavorites = (): Promise<FavoriteDog[]> =>
  api.get("favourites").json();

export const getBreeds = (): Promise<Breed[]> => api.get("breeds").json();
