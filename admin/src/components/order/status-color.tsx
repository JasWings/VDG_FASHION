// const StatusColor = (status: string) => {
//   let bg_class = '';
//   if (
//     status?.toLowerCase() === 'initiated' ||
//     status?.toLowerCase() === 'initiated'
//   ) {
//     bg_class = 'bg-status-pending bg-opacity-[.15] text-status-pending';
//   } else if (
//     status?.toLowerCase() === 'placed' ||
//     status?.toLowerCase() === 'payment-processing'
//   ) {
//     bg_class = 'bg-status-processing bg-opacity-[.15] text-status-processing';
//   } else if (
//     status?.toLowerCase() === 'shipped' ||
//     status?.toLowerCase() === 'payment-success'
//   ) {
//     bg_class = 'bg-status-complete bg-opacity-[.15] text-status-complete';
//   } else if (
//     status?.toLowerCase() === 'order-cancelled' ||
//     status?.toLowerCase() === 'payment-reversal'
//   ) {
//     bg_class = 'bg-status-canceled bg-opacity-[.15] text-status-canceled';
//   } else if (
//     status?.toLowerCase() === 'order-failed' ||
//     status?.toLowerCase() === 'payment-failed'
//   ) {
//     bg_class = 'bg-status-failed bg-opacity-[.15] text-status-failed';
//   } else if (status?.toLowerCase() === 'order-at-local-facility') {
//     bg_class =
//       'bg-status-out-for-delivery bg-opacity-[.15] text-status-out-for-delivery';
//   } else if (status?.toLowerCase() === 'delivered') {
//     bg_class =
//       'bg-status-out-for-delivery bg-opacity-[.15] text-status-out-for-delivery';
//   } else {
//     bg_class = 'bg-accent bg-opacity-[.15] !text-accent';
//   }

//   return bg_class;
// };

// export default StatusColor;
const StatusColor = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    initiated: '#D69E2E',
    placed: '#48BB78',
    shipped: '#B83280',
    cancelled:"#E3818A",
    delivered:"#3399FF"

  };

  const normalizedStatus = status ?status.toLowerCase():null;
  return statusMap[normalizedStatus] || 'default'; // Default to a 'gray' scheme if not found
};

export default StatusColor;

