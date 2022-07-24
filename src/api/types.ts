export type Dog = {
  id: string;
  breeds: Breed[];
  url: string;
  height: number;
  width: number;
};

export type Breed = {
  id: number;
  name: string;
  breed_group: string;
  temperament: string;
  life_span: string;
  height: { imperial: string; metric: string };
  weight: { imperial: string; metric: string };
  reference_image_id: string;
};

export type FavoriteDog = {
  created_at: string;
  id: number;
  image: {
    id: string;
    url: string;
  };
  image_id: string;
  sub_id: string;
  user_id: string;
};
