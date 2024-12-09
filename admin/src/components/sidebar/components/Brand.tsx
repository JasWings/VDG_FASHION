// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { SLRLogo } from '@/components/icons/Icons';
import { HSeparator } from '@/components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('brand.500', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<SLRLogo h='26px' w='175px' my='32px' style={{cursor:"pointer"}} onClick={()=>window.location.href="/Admin/Dashboard"} color={logoColor} />
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
