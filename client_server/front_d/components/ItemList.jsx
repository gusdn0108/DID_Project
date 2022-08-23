import { Box, Image, Badge, Flex, Center } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import BuyItemModal from '../components/BuyItemModal.jsx';

const ItemList = ({ property }) => {
	const showItem = () => {
		return property.map((v, k) => {
			return (
				<Box w='30%' borderWidth='1px' borderRadius='lg' overflow='hidden' m='0 1rem'>
					<Image src={v.imageUrl} w='30rem' h='20rem' />

					<Box p='6'>
						<Box display='flex' alignItems='baseline'>
							<Badge borderRadius='full' px='2' colorScheme='yellow'>
								{v.type}
							</Badge>
							<Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase' ml='2'>
								{v.menu}
							</Box>
						</Box>

						<Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
							{v.title}
						</Box>

						<Box>{v.formattedPrice} P</Box>

						<Box display='flex' mt='2' alignItems='center'>
							{Array(5)
								.fill('')
								.map((_, i) => (
									<StarIcon key={i} color={i < v.rating ? 'yellow.500' : 'gray.300'} />
								))}
							<Box as='span' ml='2' color='gray.600' fontSize='sm'>
								{v.reviewCount} reviews
							</Box>
						</Box>
					</Box>
					<Center>
						<BuyItemModal bookInfo={property[k]} />
					</Center>
				</Box>
			);
		});
	};

	return (
		<Flex w='100%' h='30rem'>
			<Center>{showItem()}</Center>
		</Flex>
	);
};

export default ItemList;
