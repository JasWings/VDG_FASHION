import ConfirmationCard from '@/components/ui/cards/confirmation';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteAddress } from '@/framework/user';
import Cancel from '../icons/cancel-icon';
import client from '@/framework/client';
import { showToast } from '../ui/toast/toast';

export default function OrderCancelView() {
  const {
    data:data,
  } = useModalState();
  const { closeModal } = useModalAction();
  const { mutate: deleteAddressById, isLoading } = useDeleteAddress();

  async function handleDelete() {
    if (!data) {
      return;
    }
    try {
        const response:any=await client.orders.cancelOrder(data?.uuid,data)
        showToast(response?.message,"success")  
        closeModal() 
        window.location.reload()
    } catch (error:any) {
      showToast(error?.response?.data?.message,"error")
      closeModal()
    }

  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={isLoading}
      icon={<Cancel className="h-12 w-12" />}
      title='Cancel'
      description='Are You Sure Want to Cancel the Order ?'
      deleteBtnText='Cancel Order'
      cancelBtnText='Close'
    />
  );
}
