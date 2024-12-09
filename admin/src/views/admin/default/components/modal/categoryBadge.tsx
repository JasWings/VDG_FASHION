import { Box, Button, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface WeightBadgesProps {
  category: any;
}

const CategoryBadges = ({ category }: WeightBadgesProps) => {
  return (
    <Box mt={4} display="flex" flexDirection="row" alignItems="flex-start" borderTop="1px" borderColor="#E5E7EB"  pt={4} mb={{ mt: 6, pt: 6 }}>
      <Text as={"span"} py={1} fontSize="sm" fontWeight="semibold" textTransform="capitalize" >
        Category:
      </Text>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        <Button
          mb={2}
          whiteSpace="nowrap"
          rounded="md"
          border="1px"
          borderColor="#E5E7EB"
          bg="white"
          py={1}
          px={2.5}
          fontSize="sm"
          textTransform="lowercase"
          letterSpacing="wider"
          color="heading"
          transition="color 0.3s"
          _hover={{ borderColor: 'accent', color: 'accent' }}
          _focus={{ bgOpacity: "1", outline: 'none' }}
          marginLeft="2"
          onClick={() => {}}
        >
          {`${category} `}
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryBadges;
