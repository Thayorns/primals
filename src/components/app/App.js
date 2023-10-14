import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { Input, Button, Popover } from 'antd';
import { useEffect } from 'react'

import './App.css';
import { useState, useMemo} from "react";

function App() {
  const x = useMotionValue(0)
  const xInput = [-60, 0, 60];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)"
  ]);
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)"
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);
  const [userNum, setUserNum] = useState(null)
  
  
  // const text = <span>Congratulations! You did it!</span>;//POPOVER
  // const [showArrow, setShowArrow] = useState(true);
  // const [arrowAtCenter, setArrowAtCenter] = useState(false)
  // const mergedArrow = useMemo(() => {
  //   if (arrowAtCenter) return { pointAtCenter: true };
  //   return showArrow;
  // }, [showArrow, arrowAtCenter])
  //--------------------------------------
  
  const primeCheck = (userNum) => {
    let isPrime = true
    if (userNum <= 1 || userNum == null) {
      isPrime = false
    }    
    for (let i = 2; i <= Math.sqrt(userNum); i++) {
      if (userNum % i === 0) {
        isPrime = false
        break
      }
    }
    if (isPrime) {
      animate(x, 100, { duration: 0.9 })
    } else {
      animate(x, -100, { duration: 0.9 })
    }
  }
  useEffect(() => {
    primeCheck(userNum)
    animate(x, 0, { duration: 0.5 })
  }, [userNum])
  
  return (
    <div className="App">
      <motion.div className="container" style={{ background }}>
        
        <h1>A prime number is a whole number greater than 1 with exactly two divisors: 1 and itself.</h1>
        <p>
          Let's find out if your number is prime!<br/>
          Type it inside the field and click the button
        </p>
        <Input placeholder="your number"
          required
          type="number"
          onChange={(e)=> setUserNum(e.target.value)}
          />
        <Button 
          onClick={() => {
            primeCheck(userNum)
          }}
        >
          Click!
        </Button>
        
        {/* <Popover placement="leftBottom" title={text} arrow={mergedArrow}></Popover> */}
        <div className="switch">
          <motion.div className="box" 
            style={{ x }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            drag="x" 
            dragConstraints={{ left: 0, right: 0}}>
            
            <svg className="progress-icon" viewBox="0 0 50 50">
              <motion.path className='progress-icon'// ALL stuff
                fill="none"
                strokeWidth="2"
                stroke={color}
                d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                // style={{ translateX: 5, translateY: 5 }} он теперь в CSS
              />
              <motion.path className='green'
                fill="none"
                strokeWidth="2"
                stroke={color}
                d="M14,26 L 22,33 L 35,16"
                strokeDasharray="0 1"
                style={{ pathLength: tickPath }}
              />
              <motion.path className='red-one'// RED LEFT
                fill="none"
                strokeWidth="2"
                stroke={color}
                d="M17,17 L33,33"
                strokeDasharray="0 1"
                style={{ pathLength: crossPathA }}
              />
              <motion.path className='red-two'// RED RIGHT
                fill="none"
                strokeWidth="2"
                stroke={color}
                d="M33,17 L17,33"
                strokeDasharray="0 1"
                style={{ pathLength: crossPathB }}
              />
            </svg>
          </motion.div>
        </div>
        
      </motion.div>
    </div>
  );
}

export default App;
