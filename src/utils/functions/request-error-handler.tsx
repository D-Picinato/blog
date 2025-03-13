import ResponseFormat from '@/utils/classes/response-format';
import Toast from '@/components/ui/toast';
import toast from 'react-hot-toast';
import { JSX } from 'react';

export default function requestErrorHandler(response: ResponseFormat<unknown>) {
  if (!response)
    toast.custom(<Toast variant="warning">Servidor indisponível!</Toast>);

  const criticalMessage = 'Erro crítico!';

  const status: Record<number, JSX.Element> = {
    401: <Toast variant="warning">{response.message || criticalMessage}</Toast>,
  };

  toast.custom(
    status[response.status] || (
      <Toast variant="danger">{response.message || criticalMessage}</Toast>
    )
  );
}
