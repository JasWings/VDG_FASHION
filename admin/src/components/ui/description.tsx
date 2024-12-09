import React from 'react';
import { Box, Heading, Text, Divider, Flex, Card, useColorModeValue } from '@chakra-ui/react';

// Description Component
type DescriptionProps = {
  className?: string;
  title?: string;
  details?: string | JSX.Element;
  [key: string]: unknown;
};

const Description: React.FC<DescriptionProps> = ({ title, details, className, ...props }) => {
  return (
    <Box className={className} {...props}>
      {title && (
        <Heading as="h4" size="sm" mb={2} fontWeight="semibold" color={useColorModeValue('gray.700', 'gray.300')}>
          {title}
        </Heading>
      )}
      {details && (
        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
          {details}
        </Text>
      )}
    </Box>
  );
};

export default Description