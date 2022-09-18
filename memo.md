# 이벤트 스크롤

Next 에서 이벤트 스크롤 구현해볼려고하니 에러가뜸
웬지 모르겠지만 To resolve this only create new StyledComponents outside of any render method and function component.
styledComponents 엄청뜸 이슈를 해결할러고해도 안됨.. 다른방법찾아보는중

# framer motion

## https://www.framer.com/docs/examples/

next.js 사용자들은 대부분 이 라이브러리를 이용하여 이벤트 스크롤을 처리함 왜 인지모르겠지만 통상적으로 이벤트 스크롤을 쓰면 이슈가 발생해서 다들 라이브러리로 처리하는거같음 다음에 기회가된다면 리액트에선 라이브러리를 쓰지않고 처리해보고싶음 .

- Scroll-triggered animations

# useScroll

- 4개의 모션 값을 반환
- scrollX / Y : 스크롤 위치 (픽셀)
- scrollProgress / YProgress : 정의된 오프셋 사이의 스크롤 위치 , 0 및 사이의 1 값

사용방법은 리액트에서 window.scrollY 스크롤 이벤트를 사용했던것처럼 이용할수있음

많이 사용될거같아 'hooks'로 빼두겠음

``js
import { useScroll } from "framer-motion";
import { useEffect } from "react";

export const scrollEvent = () => {
const { scrollY } = useScroll();

useEffect(() => {
return scrollY.onChange((e) => {
console.log("스크롤 좌표는?", e);
});
});
};

``

`useScroll hooks`

# 사용용도

스크롤 추적

# motion.div

내가 원하는 위치에 모션 & 위치까지 선정하게 할수있게해주는 녀석

animationOption = {
offscreen: { x: -300 },
onscreen: { x: 0, rotate: [-2, 3, 5] },
transition: { type: "spring", bounce: 1, duration: 4 },
}

정리하다 말았음 모르고 깃이그노어처리 못햇슴니다..
