import { getMenu } from '../../services/apiRestaurant';

export interface Pizza {
  id: number; 
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
}

export async function loader(): Promise<Pizza[]> {
  const menu = await getMenu();
  return menu.map(item => ({
    id: Number(item.id), 
    name: item.name,
    unitPrice: item.unitPrice,
    ingredients: item.ingredients,
    soldOut: item.soldOut,
    imageUrl: item.imageUrl,
  }));
}