export interface Recipe {
  id: number;
  name: string;
  author: string;
  descriptionLong: string;
  descriptionShort: string;
  category: string;
  pictureMain: string;
  pictureMini: string;
  difficulty: number;
  servings: number;
}
