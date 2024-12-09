import { Box, Text, Link, Icon } from '@chakra-ui/react';
// import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IosArrowDown } from '@/components/icons/ios-arrow-down';
import { IosArrowUp } from '@/components/icons/ios-arrow-up';
import React, { ReactNode } from 'react';

interface StickerCardProps {
  titleTransKey: string;
  subtitleTransKey: string;
  icon: ReactNode;
  iconBgStyle?: React.CSSProperties;
  price: any;
//   indicator: 'up' | 'down' | undefined;
//   indicatorText: string;
//   note: string;
//   link?: string;
//   linkText?: string;
}

const StickerCard: React.FC<StickerCardProps> = ({
  titleTransKey,
  subtitleTransKey,
  icon,
  iconBgStyle,
  price,
//   indicator,
//   indicatorText,
//   note,
//   link,
//   linkText,
}: StickerCardProps) => {
  return (
    <Box bg="gray.100" p={7} rounded="md" display="flex" flexDirection="column" h="100%" w="100%">
      <Box mb="auto" display="flex" justifyContent="space-between" pb={8}>
        <Box display="flex" flexDirection="column">
          <Text mb={1} fontSize="lg" fontWeight="semibold" color="gray.900">
            {titleTransKey}
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="gray.600">
            {subtitleTransKey}
          </Text>
        </Box>

        <Box
          mr={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={12}
          h={12}
          flexShrink={0}
          rounded="full"
          bg="gray.200"
          style={iconBgStyle}
        >
          {icon}
        </Box>
      </Box>

      <Text mb={2} fontSize="xl" fontWeight="semibold" color="gray.900">
        {price}
      </Text>

      {/* {indicator === 'up' && (
        <Text mb={12} fontSize="sm" fontWeight="semibold" color="#03D3B5">
          <Icon as={IosArrowUp} width="9px" height="11px" display="inline-block" /> {indicatorText}
          <Text as="span" fontSize="sm" fontWeight="normal" color="gray.600">
            {note}
          </Text>
        </Text>
      )}

      {indicator === 'down' && (
        <Text mb={12} fontSize="sm" fontWeight="semibold" color="#FC6687">
          <Icon as={IosArrowDown} width="9px" height="11px" display="inline-block" /> {indicatorText}
          <Text as="span" fontSize="sm" fontWeight="normal" color="gray.600">
            {note}
          </Text>
        </Text>
      )}

      {link && (
        <Link fontSize="xs" fontWeight="semibold" color="purple.700" textDecoration="none" href={link} target="_blank" rel="noreferrer">
          {linkText}
        </Link>
      )} */}
    </Box>
  );
};

export default StickerCard;
