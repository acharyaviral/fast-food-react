import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';

interface UpdateOrderProps {
  orderId: string;
}

function UpdateOrder({ orderId }: UpdateOrderProps) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" action={`/order/${orderId}`} className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
