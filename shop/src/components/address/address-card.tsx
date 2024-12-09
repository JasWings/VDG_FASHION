import { CloseIcon } from '@/components/icons/close-icon';
import { PencilIcon } from '@/components/icons/pencil-icon';
import { formatAddress } from '@/lib/format-address';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

interface AddressProps {
  address: any;
  checked: boolean;
  onEdit?: (data:any,e:any) => void;
  onDelete?: (data:any,e:any) => void;
  onAdd:(data:any,e:any)=>void;
  userId?: any;
}
const AddressCard: React.FC<AddressProps> = ({
  checked,
  address,
  userId,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        'group relative cursor-pointer rounded border p-4 hover:border-accent',
        {
          'border-accent shadow-sm': checked,
          'border-transparent bg-gray-100': !checked,
        }
      )}
      // onClick={(e)=>onAdd(address,e)}
    >
      <p className="mb-3 text-sm font-semibold capitalize text-heading" >
        {address?.address_type}
      </p>
      <p className="text-sm text-sub-heading">
        {formatAddress(address)}
      </p>
      <div className="absolute top-4 flex space-x-2 opacity-0 group-hover:opacity-100 ltr:right-4 rtl:left-4 rtl:space-x-reverse">
        {/* {onEdit && (
          <button
            className="edit-button flex h-5 w-5 items-center justify-center rounded-full bg-accent text-light"
            onClick={(e)=>onEdit(address,e)}
          >
            <span className="sr-only">{t('text-edit')}</span>
            <PencilIcon className="h-3 w-3 edit-button" />
          </button>
        )}
        {onDelete && (
          <button
            className=" delete-button flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-light"
            onClick={(e)=>onDelete(address,e)}
          >
            <span className="sr-only">{t('text-delete')}</span>
            <CloseIcon className="h-3 w-3  delete-button" />
          </button>
        )} */}
      </div>
    </div>
  );
};

export default AddressCard;
