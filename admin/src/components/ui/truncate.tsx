import { useState } from 'react';
import { Button, Text } from '@chakra-ui/react';

type TruncateProps = {
  expandedText?: string;
  compressText?: string;
  character: number;
  children: string;
  btnClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Truncate: React.FC<TruncateProps> = ({
  children,
  expandedText = 'Read More',
  compressText = 'Read Less',
  character = 150,
  btnClassName,
  onClick,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleLines = () => {
    setExpanded((prev) => !prev);
  };

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      return onClick(e);
    }
    toggleLines();
  }

  if (!children) return null;
  const isCharacterLimitExceeded = children.length > character;

  if (!isCharacterLimitExceeded) {
    return <Text>{children}</Text>;
  }

  return (
    <>
      <Text>
        {!expanded ? children.substring(0, character) + '...' : children}
      </Text>
      <br />
      {/* <Button
        mt={1}
        fontWeight="bold"
        color="accent"
        className={btnClassName}
        onClick={handleClick}
      >
        {expanded ? compressText : expandedText}
      </Button> */}
    </>
  );
};

export default Truncate;
