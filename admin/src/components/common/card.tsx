import cn from 'classnames';
import { Box } from '@chakra-ui/react';

type Props = {
  className?: string;
  [key: string]: unknown;
};
const Card: React.FC<Props> = ({ className, ...props }) => {
  return (
    <Box
      p={{sm:"5px",md:"8px"}}
      bg={"whiteAlpha.300"}
      shadow={"sm"}
      rounded={"sm"}
      {...props}
    />
  );
};

export default Card;
