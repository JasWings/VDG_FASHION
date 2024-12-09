'use client'
import React, { useState } from 'react';
import { Switch } from '@chakra-ui/react';
import { Update } from '@/utils/url/api';
import { updateProductEndPoint } from '@/utils/url/url';
import { useCustomToast } from '@/components/toast/Toast';

function Published({value,data,toastObject,updateToastObject,updateproduct}) {
  const [switchState, setSwitchState] = useState(value);
  const showToast=useCustomToast()

  const handleSwitchToggle =async() => {
    setSwitchState(!switchState); 
    await Update(updateProductEndPoint,data.uuid,{is_active:!value})
    showToast({title:'Product update successfully!',status:"success",position:"top"})
    updateproduct()
  };


  return (
    <div>
      <Switch colorScheme='brand' isChecked={switchState} onChange={handleSwitchToggle} />
    </div>
  );
}

export default Published;
