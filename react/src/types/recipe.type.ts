export interface RecipeType {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
}
