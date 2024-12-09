import React from 'react';
import { Box, Button } from '@chakra-ui/react';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box display="flex" justifyContent='flex-start' mt={4}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          onClick={() => onPageChange(index + 1)}
          variant={index + 1 === currentPage ? 'solid' : 'outline'}
          colorScheme="teal"
          size="sm"
          mx={1}
        >
          {index + 1}
        </Button>
      ))}
    </Box>
  );
};

export default CustomPagination;
