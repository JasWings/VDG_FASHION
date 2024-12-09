import { Select } from '@chakra-ui/react';
import theme from '@/theme/theme';

export const statusOptions = [
  { value: 'initiated', label: 'Initiated' },
  { value: 'placed', label: 'Placed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
];

const StatusSelect = ({ currentStatus }) => {


  const onStatusChange=(status)=>{
  }

  return (
    <Select
      value={currentStatus}
      onChange={(e) => onStatusChange(e.target.value)}
    >
      {statusOptions.map((status) => (
        <option key={status.value} selected={currentStatus} value={status.value} style={{ backgroundColor: theme.colors.status[status.value] }}>
          {status.label}
        </option>
      ))}
    </Select>
  );
};

export default StatusSelect;
