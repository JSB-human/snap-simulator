import Image from "next/image";
import { FC, memo, useCallback, useEffect, useState } from "react"
import Header from "../components/header";
import { useDrag, useDrop } from "react-dnd";
import CardJson from "../pages/api/cards.json";
import LocationJson from "../pages/api/location.json";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CardZone } from "../components/cardZone";


export default function Home() {

  const [card1_1, setCard1_1] = useState("");
  const [card1_2, setCard1_2] = useState(""); 
  const [card1_3, setCard1_3] = useState(""); 
  const [card1_4, setCard1_4] = useState(""); 

  const [card1_5, setCard1_5] = useState(""); 
  const [card1_6, setCard1_6] = useState(""); 
  const [card1_7, setCard1_7] = useState(""); 
  const [card1_8, setCard1_8] = useState(""); 

  const [card2_1, setCard2_1] = useState(""); 
  const [card2_2, setCard2_2] = useState(""); 
  const [card2_3, setCard2_3] = useState(""); 
  const [card2_4, setCard2_4] = useState(""); 

  const [card2_5, setCard2_5] = useState(""); 
  const [card2_6, setCard2_6] = useState(""); 
  const [card2_7, setCard2_7] = useState(""); 
  const [card2_8, setCard2_8] = useState(""); 

  const [card3_1, setCard3_1] = useState(""); 
  const [card3_2, setCard3_2] = useState(""); 
  const [card3_3, setCard3_3] = useState(""); 
  const [card3_4, setCard3_4] = useState(""); 

  const [card3_5, setCard3_5] = useState(""); 
  const [card3_6, setCard3_6] = useState(""); 
  const [card3_7, setCard3_7] = useState(""); 
  const [card3_8, setCard3_8] = useState(""); 

  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");
  const [location3, setLocation3] = useState("");

  const [nowDrop, setNowDrop] = useState('');
  const [nowZone, setNowZone] = useState(0);

  const [score1_top, setScore1_top] = useState(0);
  const [score1_bot, setScore1_bot] = useState(0);

  const locationChange = (e : SelectChangeEvent, no : number) => {
    if(no === 1){
      setLocation1(e.target.value);
    }else if(no === 2){
      setLocation2(e.target.value);
    }else if(no === 3){
      setLocation3(e.target.value);
    }
  }

  

  const locationDiv = (locationNo : string, no : number) => {

    return (
            locationNo === "" ?
            <div className="w-[150px] h-[150px] border-2 flex items-center"> 
              <FormControl fullWidth>
                <InputLabel id="location-label">구역</InputLabel>
                <Select
                  labelId="location-label"
                  label="구역"
                  value={no===1 ? location1: no===2 ? location2 : location3}
                  onChange={(e) => locationChange(e, no)}
                >
                  {
                    LocationJson.map((val, i) => {
                      let startIndex = val.name.indexOf("(")+1;
                      let endIndex = val.name.indexOf(")");
                      let locationImg = val.name.substring(startIndex, endIndex).replace(/ /g, "-").replace(/'/g, "");

                      return (
                        <MenuItem key={i} value={locationImg}>{val.name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
            </div>
            :
            <Image alt="구역"
              src={`/locations/${locationNo}.png`}
              width={150}
              height={150}
            ></Image>
    )
  }

  const cardList = CardJson.map((val, idx) => {
    let cardName = val.en.replace(/ /g, "-");
    cardName = cardName.replace(/'/g, "");
    
    const [{isDragging}, drag] = useDrag(() => ({
      type : 'box',
      item : {cardName},
      end : (item, monitor) => {
        const dropResult = monitor.getDropResult();
        console.log(item, monitor)  
        if(item && dropResult) {
          setNowDrop(cardName);
        }
      },
      collect : (monitor) => ({
        isDragging : monitor.isDragging(),
        handlerId : monitor.getHandlerId(),
      }),
    }),
    [cardName, 'box'],
    )


    return  (
      <div key={idx}>
        <Image alt="카드" 
          src={`/cards/${cardName}.png`}
          width={100}
          height={100}
          ref={drag} data-testid={'box'}
        />
      </div>
    )
  })

  const handleDrop = useCallback(
    (cardName : string, zoneNo : number) => {
      setNowDrop(cardName);
      setNowZone(zoneNo);
    },
    [nowDrop, nowZone],
  )

  
 



  return (

    <div className="min-h-screen h-full w-full text-center bg-white">
      <main className="">
        <Header></Header>
        <div className="grid grid-cols-3 pt-2">
          <div className="flex flex-col justify-center items-center">
            {/* 구역1 TOP */}
            <div className="grid grid-cols-2">
              <CardZone cardName={nowDrop} zoneNo={0} />
              
            </div>
            {locationDiv(location1, 1)}
            {/* 구역1 BOTTOM */}
            <div className="grid grid-cols-2">
             
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              {/* 구역2 TOP */}
              <div className="grid grid-cols-2">
               
              </div>
            </div>
            {locationDiv(location2, 2)}
          {/* 구역2 BOTTOM */}
            <div className="grid grid-cols-2">
           
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            {/* 구역3 BOTTOM */}
            <div className="grid grid-cols-2">
           
            </div>
            {locationDiv(location3, 3)}
            {/* 구역3 BOTTOM */}
            <div className="grid grid-cols-2">
           
            </div>
          </div>
        </div>

        <div className="border-2 m-4 p-2">
          <div className="grid grid-cols-3 lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-4 overflow-scroll h-[250px]">
            {cardList}
          </div>
        </div>
      </main>
    </div>
   
  )
}
