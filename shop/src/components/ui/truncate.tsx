import { useState } from 'react';
import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation();
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
    return <>{children}</>;
  }
  return (
    <>
      {!expanded ? children.substring(0, character) + '...' : children}
      <br />
      <span>
        <button
          onClick={handleClick}
          className={`mt-1 inline-block font-bold text-accent ${
            btnClassName ? btnClassName : ''
          }`}
        >
          {expanded ? compressText : expandedText}
        </button>
      </span>
    </>
  );
};
export default Truncate;
