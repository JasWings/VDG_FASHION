import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteSliderMutation } from '@/data/slider';

const SliderDeleteView = () => {
  const { mutate: deleteType, isLoading: loading } = useDeleteSliderMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  async function handleDelete() {
    deleteType({
      id: data,
    });
    closeModal();
  }

  console.log(data,"sliderdata")

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default SliderDeleteView;
