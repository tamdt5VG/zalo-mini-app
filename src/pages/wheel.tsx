import React, { useState } from 'react'
import { Page, Button, Box, Text, Icon } from "zmp-ui";
import { Wheel} from 'react-custom-roulette'
import "../css/wheel.css"

const data = [
  { option: '0',style: { backgroundColor: 'green', textColor: 'black' }  },
  { option: '1', style: { backgroundColor: 'white' } },
  { option: '2' },
  { option: '3' },
]

const LuckyWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  return (
    <div className="wheel-spin">
      <div className="wheel-roll">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}

          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
      </div>
      <div className="button-spin">
        <Button onClick={handleSpinClick} size="large" icon={<Icon icon="zi-arrow-right"/>}>
              GO
        </Button>
      </div>
    </div>
  )
}

export default LuckyWheel;