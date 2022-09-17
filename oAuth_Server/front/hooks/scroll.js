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
