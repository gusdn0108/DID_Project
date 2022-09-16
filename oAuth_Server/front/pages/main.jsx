import React from 'react'
import { useLottie, useLottieInteractivity } from "lottie-react";
import test9 from "../animation/test9.json";


const Main = () => {
   
    const option = {
        animationData : test9
    }
    
    const lottieObj = useLottie(option)
    const animation = useLottieInteractivity({
        lottieObj,
        mode:"scroll",
        actions:[
            {
                visibility:[0.1,0.9],
                type:"seek",
                frames:[0,170]
            },
        ],
    })
    
  
  
   
  return (
    animation

    
  )
}

export default Main