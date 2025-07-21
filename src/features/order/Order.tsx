import { useFetcher, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import OrderItem from './OrderItem';
import UpdateOrder from './UpdateOrder';
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers';

export interface CartItem {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderType {
  id: string;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: CartItem[];
}

export interface PizzaItem {
  id: number;
  name: string;
  ingredients: string[];
}

function Order() {
  const order = useLoaderData() as OrderType;
  const fetcher = useFetcher<{ data: PizzaItem[] }>();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <h2>Order #{id} status</h2>
      <p>
        {priority && <span className="text-red-500 font-bold">Priority</span>} {status} order
      </p>

      <p>
        {deliveryIn >= 0
          ? `Only ${deliveryIn} minutes left `
          : 'Order should have arrived'}
      </p>

      <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>

      <div>
        {cart.map((item) => {
          const matchedPizza = fetcher.data?.data.find(
            (pizza) => pizza.id === item.pizzaId
          );

          return (
            <OrderItem
              key={item.pizzaId}
              item={item}
              ingredients={matchedPizza?.ingredients ?? []} isLoadingIngredients={fetcher.state !== 'idle'}            />
          );
        })}
      </div>

      <p>Price pizza: {formatCurrency(orderPrice)}</p>

      {priority && (
        <p>Price priority: {formatCurrency(priorityPrice)}</p>
      )}

      <p>
        To pay on delivery: {formatCurrency(orderPrice + (priorityPrice || 0))}
      </p>

      {!priority && <UpdateOrder orderId={id} />}
    </div>
  );
}

export default Order;
