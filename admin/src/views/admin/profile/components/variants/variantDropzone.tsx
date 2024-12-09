import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

function VariantDropzone(props: { content: JSX.Element | string; onFilesSelected: (files: File[]) => void; [x: string]: any}) {
  const { content, onFilesSelected, ...rest } = props;
  const { getRootProps, getInputProps, isDragAccept, isDragActive, isDragReject } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        console.error('Rejected files:', rejectedFiles);
        return;
      }
      
      onFilesSelected(acceptedFiles);
    },
	accept:{
				'image/png': ['.png'],
				'image/jpg': ['.jpg'],
				'image/jpeg': ['.jpeg'],
				},    multiple: true,
  });

  const activeStyle = {
    borderColor: '#2196f3',
  };

  const acceptStyle = {
    borderColor: '#00e676',
  };

  const rejectStyle = {
    borderColor: '#ff1744',
  };

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const bg = useColorModeValue('gray.100', 'navy.700');
  const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');

  return (
    <Flex
      align='center'
      justify='center'
      bg={bg}
      border='1px dashed'
      borderColor={borderColor}
      borderRadius='16px'
      w='100%'
      h='max-content'
      minH='100%'
      cursor='pointer'
      {...getRootProps({ className: 'dropzone', style })}
      {...rest}>
      <input {...getInputProps()}   id='proimgid' />
      <Button variant='no-effects'>{content}</Button>
    </Flex>
  );
}

export default VariantDropzone;

