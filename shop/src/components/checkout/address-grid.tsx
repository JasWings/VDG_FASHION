import { useModalAction } from '@/components/ui/modal/modal.context';
import { RadioGroup } from '@headlessui/react';
import { useAtom, WritableAtom } from 'jotai';
import { useEffect, useState } from 'react';
import AddressCard from '@/components/address/address-card';
import { AddressHeader } from '@/components/address/address-header';
import { useTranslation } from 'next-i18next';
import type { Address } from '@/types';
import { useCart } from '@/store/quick-cart/cart.context';
import { useUpdateAddress } from '@/framework/user';
import client from '@/framework/client';
import { showToast } from '../ui/toast/toast';
interface AddressesProps {
  addresses: Address[] | undefined | null;
  label: string;
  atom: WritableAtom<Address | null, any, Address>;
  className?: string;
  userId: string;
  count: number;
  type: string;
}

export const AddressGrid: React.FC<AddressesProps> = ({
  addresses,
  label,
  atom,
  className,
  userId,
  count,
  type,
}) => {
  const { t } = useTranslation('common');
  const [selectedAddress, setAddress] = useState(null)
  const { openModal } = useModalAction();
  const {Cart,fetchCart}=useCart()
  const {mutate:updateProfile}=useUpdateAddress()

  // useEffect(() => {
  //   if (addresses?.length) {
  //     if (selectedAddress?.id) {
  //       const index = addresses.findIndex((a) => a.id === selectedAddress.id);
  //       setAddress(addresses[index]);
  //     } else {
  //       setAddress(addresses?.[0]);
  //     }
  //   }
  // }, [addresses, addresses?.length, selectedAddress?.id, setAddress]);

  function onAdd() {
    openModal('ADD_OR_UPDATE_ADDRESS', { customerId: userId, type });
  }
  function onEdit(address: any) {
    openModal('ADD_OR_UPDATE_ADDRESS', { customerId: userId, address });
  }
  function onDelete(address: any) {
    openModal('DELETE_ADDRESS', { customerId: userId, addressId: address?.id });
  }
  
  const handleAddress=async(addres:any,event)=>{
    const clickedElement = event.target;
    if(clickedElement?.classList?.contains('edit-button')||clickedElement?.classList?.contains('delete-button')){
    }else if(!clickedElement?.classList?.contains('edit-button')&&!clickedElement?.classList?.contains('delete-button')&&Cart[addres.address_type+"_address"]?.id!==addres.id){
      try {
        const response =await client.cart.updateAddress({address_uuid:addres.uuid,type:addres.address_type})
        fetchCart()
        showToast(response.message,"success")
        window.location.reload()
      } catch (error:any) {
        showToast(error?.response?.data?.message,"error")
      }
    }
  }
  
  
  return (
    <div className={className}>
      <AddressHeader onAdd={onAdd} count={count} label={label} />
      
      {  addresses?.length===0 ? (
        <div className="grid grid-cols-1 gap-4">
          <span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
            {t('text-no-address')}
          </span>
        </div>
      ) : (
        <RadioGroup value={selectedAddress} onChange={setAddress}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {addresses?.map((address) => ( 
               <RadioGroup.Option value={address} key={address?.id} 
               onClick={(e)=>handleAddress(address,e)}
               
               > 
                 {({ checked }: { checked: boolean }) => (
                  <AddressCard
                  checked={address.id===selectedAddress?.id || address.id===Cart.shipping_address.id || address.id===Cart.billing_address.id }
                    // checked={address.id===selectedAddress?.id || type==="shipping" ? address.id===Cart.shipping_address.id :address.id===Cart.billing_address.id }
                    onDelete={() => onDelete(address)}
                    onEdit={() => onEdit(address)}
                    address={address}
                    onAdd={(e)=>handleAddress(address,e)}
                  />
             )} 
             </RadioGroup.Option> 
             ))} 
          </div>
        </RadioGroup>
      )}
    </div>
  );
};
export default AddressGrid;
