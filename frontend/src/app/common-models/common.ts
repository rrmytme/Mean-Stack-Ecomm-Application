export interface Root {
  success: boolean;
  products: Array<Products>;
}

export interface Products {
  _id: string;
  name: string;
  price: string;
  description: string;
  ratings: string;
  images: Array<Images>;
  category: string;
  seller: string;
  stock: number;
}

export interface Images {
  _id: string;
  image: string;
}
