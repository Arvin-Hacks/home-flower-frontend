export interface IProduct {
  _id?: string
  title: string;
  description?: string;
  category?: string;
  price: number | null;
  status?: string;
  imageUrl?: string;
  images?: File[];
  quantity?:number
}
export interface RequestProduct {
  title: string;
  description?: string;
  status?: string;
  imageUrl?: string;
  images?: File[];
}
