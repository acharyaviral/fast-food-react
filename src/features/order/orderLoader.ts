import { getOrder } from '../../services/apiRestaurant';

export async function loader({ params }: any) {
 const order = await getOrder(params.orderId);
 return order;
}
