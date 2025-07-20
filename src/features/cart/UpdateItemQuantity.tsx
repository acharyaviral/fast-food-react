import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

interface UpdateItemQuantityProps {
  pizzaId: number | string;
  currentQuantity: number;
}

function UpdateItemQuantity({ pizzaId, currentQuantity }: UpdateItemQuantityProps) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(Number(pizzaId)))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(Number(pizzaId)))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
