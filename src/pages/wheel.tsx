import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Page, Button, Box, Text, Icon } from "zmp-ui";
import { Wheel} from 'react-custom-roulette'
import "../css/wheel.css"

const ImageProps = [
  { uri :'https://phattien.com/wp-content/uploads/2023/03/160-xanh-xam-den.png',
    offsetY: 150
  },
  { uri :'https://vn.karmamedical.com/wp-content/uploads/2020/08/AGL-TW1_1050x960_S-1024x936.png',
    offsetY: 150
  },
  { uri :'https://static.vecteezy.com/system/resources/thumbnails/027/182/346/small/delivery-truck-isolated-on-a-transparent-background-png.png',
    offsetY: 150
  },
  { uri :'https://pngimg.com/d/ambulance_PNG31.png',
    offsetY: 150
  },
  { uri :'https://freepngimg.com/thumb/bmw/3-2-bmw-png-image.png',
    offsetY: 150
  },
  { uri :'https://pngimg.com/d/audi_PNG99482.png',
    sizeMultiplier: 0.5,
    offsetY: 150
  },
]

const data = [
  { option: '1', image: ImageProps[0], style: { backgroundColor: 'Violet',} },
  { option: '2', image: ImageProps[1], style: { backgroundColor: 'Orange',} },
  { option: '3', image: ImageProps[2], style: { backgroundColor: 'Tomato',} },
  { option: '4', image: ImageProps[3], style: { backgroundColor: 'DodgerBlue',} },
  { option: '5', image: ImageProps[4], style: { backgroundColor: 'MediumSeaGreen',} },
  { option: '6', image: ImageProps[5], style: { backgroundColor: 'Gray',} },
]

const LuckyWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [dataWheel, setDataWheel] = useState(data);

  const handleSpinClick = async () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }
  
  useEffect(() => {
    console.log(data)
    axios({
      method: 'get',
      baseURL: 'http://localhost:8000/api/zalo-mini-app/show-prize',
      params: {
        pwd: '1234'
      },
    })
      .then(function (response) {
        setDataWheel(response['data']['data'])
        console.log(typeof(data))
      }).catch(function (error){
        console.log(error);
      })
  }, []);

  return (
    <div className="wheel-spin">
      <div className="wheel-roll" onClick={handleSpinClick} >
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={dataWheel}
          perpendicularText={true}
          radiusLineWidth={7}
          innerRadius={5}
          innerBorderColor={'black'}
          radiusLineColor={'black'}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
      </div>
    </div>
  )
}

export default LuckyWheel;