// import cn from 'classnames';

// type BadgeProps = {
//   className?: string;
//   color?: string;
//   textColor?: string;
//   text?: string;
//   textKey?: string;
//   animate?: boolean;
// };

// const Badge: React.FC<BadgeProps> = (props) => {
//   const {
//     className,
//     color: colorOverride,
//     textColor: textColorOverride,
//     text,
//     textKey,
//     animate = false,
//   } = props;

//   const classes = {
//     root: 'px-3 py-1 rounded-full text-xs whitespace-nowrap relative',
//     animate: 'animate-pulse',
//     default: 'bg-accent',
//     text: 'text-light',
//   };

//   return (
//     <>
//       <span
//         className={cn(
//           classes.root,
//           {
//             [classes.default]: !colorOverride,
//             [classes.text]: !textColorOverride,
//             [classes.animate]: animate,
//           },
//           colorOverride,
//           textColorOverride,
//           className
//         )}
//       >
//         {textKey ? textKey : text}
//       </span>
//     </>
//   );
// };

// export default Badge;
import { Badge as ChakraBadge } from '@chakra-ui/react';

type BadgeProps = {
  text?: string;
  colorScheme?: string;
  textColor?: string;
  animate?: boolean;
};

const Badge: React.FC<BadgeProps> = ({ text, colorScheme = 'gray', textColor = 'white', animate = false }) => {
  return (
    <ChakraBadge
      px="3"
      py="1"
      borderRadius="full"
      fontSize="xs"
      whiteSpace="nowrap"
      position="relative"
      color={textColor}
      bg={colorScheme}
      className={animate ? 'animate-pulse' : ''}
    >
      {text}
    </ChakraBadge>
  );
};

export default Badge;

