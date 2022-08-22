import { StarIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import { Badge, Box, Button, Center } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const property = [
  { imageUrl: 'https://www.mychef.kr/data/goods/17/10/39/1000000822/1000000822_main_040.jpg', title: '찹스테이크', formattedPrice: 12900, reviewslide: 52, rating: 4 },
  { imageUrl: 'https://www.mychef.kr/data/goods/22/07/27/1000002298/1000002298_main_0100.jpg', title: '짬뽕 순두부', formattedPrice: 12900, reviewslide: 33, rating: 3 },
  { imageUrl: 'https://www.mychef.kr/data/goods/22/03/13/1000002193/1000002193_main_090.jpg', title: '돼지불백', formattedPrice: 12900, reviewslide: 24, rating: 3 },
  { imageUrl: 'https://www.mychef.kr/data/goods/22/05/20/1000002243/1000002243_add2_05.jpg', title: '매콤 쭈꾸미 삼겹살', formattedPrice: 19900, reviewslide: 17, rating: 4 },
  { imageUrl: 'https://www.mychef.kr/data/goods/22/06/23/1000002261/1000002261_add2_013.jpg', title: '불고기 퀘사디아', formattedPrice: 12600, reviewslide: 9, rating: 5 },
  { imageUrl: 'https://www.mychef.kr/data/goods/22/05/19/1000002239/1000002239_add2_088.jpg', title: '백순대볶음', formattedPrice: 11900, reviewslide: 45, rating: 5 },
  { imageUrl: 'https://www.mychef.kr/data/goods/22/05/19/1000002235/1000002235_add2_062.jpg', title: '알리오 올리오 파스타', formattedPrice: 11500, reviewslide: 87, rating: 5 },
  { imageUrl: 'https://www.mychef.kr/data/goods/22/04/14/1000002198/1000002198_add2_06.jpg', title: '나시고랭', formattedPrice: 13900, reviewslide: 106, rating: 4 },
];

const ItemCarousel = () => {
  const [slide, setSlide] = useState(0);

  const leftHandler = () => {
    setSlide(slide - 1);
    if (slide < 0) {
      setSlide(0);
    }
  };

  const rightHandler = () => {
    setSlide(slide + 1);
    if (slide === 5) {
      setSlide(0);
    }
  };

  const Items = () => {
    return property.map((v, k) => {
      return (
        <Link
          href={{
            pathname: '/buyItem',
            query: v,
          }}
          key={k}
        >
          <a>
            <Box minW="25rem" borderWidth="1px" ml="5">
              <Image src={`/${k + 1}.jpeg`} width={500} height={600} />
              <Box p="6">
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                  <Badge borderRadius="full" px="2" colorScheme="blue">
                    Best
                  </Badge>
                  {' ' + v.title}
                </Box>

                <Box>{v.formattedPrice} P</Box>
                <Box mt="2" alignItems="center">
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <StarIcon key={i} color={i < v.rating ? 'blue.500' : 'gray.300'} />
                    ))}
                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    {v.reviewslide} reviews
                  </Box>
                </Box>
              </Box>
            </Box>
          </a>
        </Link>
      );
    });
  };

  const trans = {
    transform: `translateX(${slide * -25}rem)`,
  };

  return (
    <>
      <Carousel style={trans}>
        <Slider>{Items()}</Slider>
      </Carousel>
      <SlideBtn>
        <Center>
          <Button onClick={leftHandler} leftIcon={<ArrowBackIcon ml={2} />} colorScheme="blue" variant="outline" width={20} mt={10} mr={4} mb={20} />
          <Button onClick={rightHandler} rightIcon={<ArrowForwardIcon mr={2} />} colorScheme="blue" variant="outline" width={20} mt={10} ml={4} mb={20} />
        </Center>
      </SlideBtn>
    </>
  );
};

export default ItemCarousel;

const Carousel = styled.div`
  width: 100%;
  position: absolute;
  margin-top: 10rem;
  transition: all 1s;
`;

const Slider = styled.div`
  width: 50rem;
  display: flex;
`;

const SlideBtn = styled.div`
  width: 100%;
  padding-top: 48rem;
`;
