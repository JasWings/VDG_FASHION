import React, { useState } from 'react';
import TextArea from '@/components/ui/forms/text-area';
import { orderNoteAtom } from '@/store/checkout';
import { useAtom } from 'jotai';
import { PlusIcon } from '../icons/plus-icon';
import { useCart } from '@/store/quick-cart/cart.context';
import client from '@/framework/client';
import { showToast } from '../ui/toast/toast';

function OrderNote({ count, label }: { count: number; label: string }) {
  const [note, setNote] = useAtom(orderNoteAtom);
  const [error,setError]=useState(null)
  const {Cart}=useCart()

  const handleAddNote=async()=>{
      
      if(note?.length===0 || note===""){
        setError("not cannot be empty")
      }else if(note?.length!==0){
        try {
          await client.cart.addNote({note:note},Cart.uuid)
          // window.location.reload()
        } catch (error) {
          showToast("Try again something wrong","error")
        }

      }
  }
  
  return (
    <div className="bg-light p-5 shadow-700 md:p-8">
      <div className="mb-5 flex items-center justify-between md:mb-8">
        <div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-base text-light lg:text-xl">
            {count}
          </span>
          <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
        </div>
          <button
            className="flex items-center text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover focus:text-accent-hover focus:outline-0"
            onClick={()=>handleAddNote()}
            // disabled={note?.length===0}
          >
            <PlusIcon className="h-4 w-4 stroke-2 ltr:mr-0.5 rtl:ml-0.5" />
           {note?.length!==0?"update note":"add note"} 
          </button>
      </div>
      {error&&<span className=' text-red-500'>{error}</span>}
      <div className="block">
        <TextArea
          //@ts-ignore
          value={note}
          name="orderNote"
          onChange={(e) => {setNote(e.target.value);setError(null)}}
          variant="outline"
        />
      </div>
    </div>
  );
}

export default OrderNote;
