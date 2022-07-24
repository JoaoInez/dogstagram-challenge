import api from "api";

type PostFavoriteRes = {
  id: string | number;
  message: string;
};

type PostFavoriteArgs = {
  imageId: string;
};

export const postFavorite = ({
  imageId,
}: PostFavoriteArgs): Promise<PostFavoriteRes> =>
  api.post("favourites", { json: { image_id: imageId } }).json();

export const deleteFavorite = (id: number) => api.delete(`favourites/${id}`);
