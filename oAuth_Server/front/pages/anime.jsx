import React from 'react'
import test2 from "../animation/test2.json"
import { useLottie, useLottieInteractivity } from "lottie-react";

const Anime = () => {
    const option = {
        animationData : test2
    }
    
    const lottieObj = useLottie(option)
    const animation = useLottieInteractivity({
        lottieObj,
        mode:"scroll",
        actions:[
            {
                visibility:[1,1],
                type:"seek",
                frames:[0,50],
                position: { [axis in "x" | "y"]: number | [0.1, 6] }
            },
        ],
    })
  return (
    animation
  )
}

export default Anime