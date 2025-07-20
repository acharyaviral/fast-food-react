import { useLoaderData } from 'react-router-dom';
import MenuItem from './MenuItem';
import type { Pizza } from './menuLoader';

function Menu() {
  const menu = useLoaderData() as Pizza[];
 
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza: Pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;