import { UserAddress } from '@/types';
function removeFalsy(obj: any) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => Boolean(v)));
}

export function formatAddress(address: UserAddress) {
  if (!address) return;
  const temp = ['address_line_1',"address_line_2","address_line_3","city","landmark","pin_code","remarks"].reduce(
    (acc, k) => ({ ...acc, [k]: (address as any)[k] }),
    {}
  );
  const formattedAddress = removeFalsy(temp);
  return Object.values(formattedAddress).join(', ');
}
