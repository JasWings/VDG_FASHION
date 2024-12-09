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

// Main Component
const FormLayout: React.FC = () => {
  return (
    <Box my={5} pb={8} borderBottomWidth={1} borderBottomStyle="dashed" borderColor="gray.300" sm={{ my: 8 }}>
      <Flex
        wrap="wrap"
        className="sm:flex-nowrap"
        direction={{ base: 'column', sm: 'row' }}
        spacing={5}
        alignItems="flex-start"
      >
        <Description
          title="Input Label Image"
          details="Helper text for the category image input field."
          className="sm:w-4/12 md:w-1/3"
          py={{ base: 5, sm: 8 }}
          px={{ base: 0, sm: 4 }}
          pr={{ md: 5 }}
        />
        <Card
          w="full"
          sm={{ w: '8/12' }}
          md={{ w: '2/3' }}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
        >
          {/* Replace this with your file input */}
          {/* <FileInput name="image" multiple={false} /> */}
        </Card>
      </Flex>
    </Box>
  );
};


export default FormLayout;
