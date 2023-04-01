import Image from "next/image";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react"
import Header from "../components/header";
import { useDrag, useDrop } from "react-dnd";
import CardJson from "../pages/api/cards.json";
import LocationJson from "../pages/api/location.json";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import Footer from "../components/footer";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

interface cardZoneState {
  cardName : string;
  power : number;
  kr : string;
  description : string;
}

interface cardZoneProps {
  cardName : string;
  zoneNo : {zoneNo : number, index: number};
  power : number;
  dropCard : any;
  kr : string;
  des : string;
}

interface CardProps {
  val: {
    en: string;
    power: string;
    name: string;
    base: string;
    cost: string;
  } | any,
  index: number;
}

export default function Home() {

  const [cardPower, setCardPower] = useState<number[]>(
    [0,0 ,0,0 ,0,0]
  )

  const [cardZones, setCardZones] = useState<cardZoneState[]>([
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""}
  ])
  const [cardZones2, setCardZones2] = useState<cardZoneState[]>([
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""}
  ])
  const [cardZones3, setCardZones3] = useState<cardZoneState[]>([
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""}
  ])
  const [cardZones4, setCardZones4] = useState<cardZoneState[]>([
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""}
  ])
  const [cardZones5, setCardZones5] = useState<cardZoneState[]>([
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""}
  ])
  const [cardZones6, setCardZones6] = useState<cardZoneState[]>([
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""},
    {cardName : "", power : 0 , kr : "", description : ""}
  ])

  const [location1, setLocation1] = useState("");
  const [location1Des, setLocation1Des] = useState({kr : "", description : ""});
  const [location2, setLocation2] = useState("");
  const [location2Des, setLocation2Des] = useState({kr : "", description : ""});
  const [location3, setLocation3] = useState("");
  const [location3Des, setLocation3Des] = useState({kr : "", description : ""});

  const [nowDrop, setNowDrop] = useState({cardName : '', power : 0});

  const innerRef = useRef(null);

  const locationChange = (e : SelectChangeEvent, no : number) => {

    if(no === 1){
      setLocation1(e.target.value);
    }else if(no === 2){
      setLocation2(e.target.value);
    }else if(no === 3){
      setLocation3(e.target.value);
    }
  }

  const locationDesClick = (kr : string, des : string, no : number) => {
    const desJson = {kr : kr, description : des};
    
    if(no === 1){
      setLocation1Des(desJson);
    }else if(no === 2){
      setLocation2Des(desJson);
    }else if(no === 3){
      setLocation3Des(desJson);
    }
  }

  

  const locationDiv = (locationName : string, no : number) => {

    return (
            locationName === "" ?
            <div className="w-[130px] h-[150px] border-2 flex items-center"> 
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
                      
                      let locationKr = val.name.substring(0, val.name.indexOf("("));
                      return (
                        <MenuItem key={i} value={locationImg} onClick={() => locationDesClick(locationKr, val.description, no)}>{val.name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
            </div>
            :
            <Tooltip title={
              <div>
                <p className="text-red-200">{no === 1 ? location1Des.kr : no === 2 ? location2Des.kr : location3Des.kr}</p>
                <p>{no === 1 ? location1Des.description : no === 2 ? location2Des.description : location3Des.description}</p>

              </div>
              
              } disableInteractive>
              <Image alt="구역"
                src={`/locations/${locationName.toLowerCase()}.png`}
                width={150}
                height={150}
                placeholder={"blur"}
                blurDataURL={"/white.png"}
              ></Image>
            </Tooltip>
    )
  }

  // const CardList = CardJson.sort((a,b) => 
  //   parseInt(a.cost) - parseInt(b.cost)
  // ).map((val, idx) => {
  //   let cardName = val.en.replace(/ /g, "-");
  //   cardName = cardName.replace(/'/g, "");
  //   let cardPower = Number(val.power);
  //   let cardKr = val.name;
  //   let cardDetail = val.base;
    
  //   const [{isDragging}, drag] = useDrag(() => ({
  //     type : 'box',
  //     item : { cardName : cardName, power : cardPower, kr : val.name, description : val.base },
      
  //     end : (item, monitor) => {
  //       const dropResult = monitor.getDropResult();
  //       if(item && dropResult) {
  //         setNowDrop({cardName : cardName, power : cardPower});
  //       }
  //     },
  //     collect : (monitor) => ({
  //       isDragging : monitor.isDragging(),
  //       handlerId : monitor.getHandlerId(),
  //     }),
  //   }))

  //   if(isDragging){
  //     window.scrollTo(0,55);
  //   }

  //   return  (
  //     <div key={idx}>
  //       <Tooltip title={
  //         <div>
  //           <p className="text-yellow-400">{cardKr}</p>
  //           <p>{cardDetail}</p>
  //         </div>
  //       } arrow placement="top" disableInteractive>
  //         <Image alt="카드" 
  //           src={`/cards/${cardName}.png`}
  //           width={100}
  //           height={100}
  //           ref={drag} data-testid={'box'}
  //           placeholder={"blur"}
  //           blurDataURL={"/white.png"}
  //         />
  //       </Tooltip>
  //     </div>
  //   )
  // })
  const CardDrop = ({ val, index } : CardProps) => {
    let cardName = val.en.replace(/ /g, "-");
    cardName = cardName.replace(/'/g, "");
    let cardPower = Number(val.power);
    let cardKr = val.name;
    let cardDetail = val.base;
  
    const [{isDragging}, drag] = useDrag(() => ({
      type : 'box',
      item : { cardName : cardName, power : cardPower, kr : val.name, description : val.base },
      
      end : (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if(item && dropResult) {
          setNowDrop({cardName : cardName, power : cardPower});
        }
      },
      collect : (monitor) => ({
        isDragging : monitor.isDragging(),
        handlerId : monitor.getHandlerId(),
      })
    }));
  
    if(isDragging){
      window.scrollTo(0,55);
    }
  
    return (
      <div key={index}>
        <Tooltip title={
          <div>
            <p className="text-yellow-400">{cardKr}</p>
            <p>{cardDetail}</p>
          </div>
        } arrow placement="top" disableInteractive>
          <Image alt="카드" 
            src={`/cards/${cardName.toLowerCase()}.png`}
            width={100}
            height={100}
            ref={drag} data-testid={'box'}
            placeholder={"blur"}
            blurDataURL={"/white.png"}
            onContextMenu={() => {return false;}}
          />
        </Tooltip>
      </div>
    );
  };

  const CardList = CardJson.sort((a,b) => 
    parseInt(a.cost) - parseInt(b.cost)
  ).map((val, index) => (
    <CardDrop val={val} index={index} key={index}/>
  ));



  const handleCardDrop = useCallback(
    (zoneIndex: number, card: any, index : number) => {
      // 업데이트할 카드 존
      let updateZones;
      switch (zoneIndex) {
        case 1:
          updateZones = [...cardZones];
          break;
        case 2:
          updateZones = [...cardZones2];
          break;
        case 3:
          updateZones = [...cardZones3];
          break;
        case 4:
          updateZones = [...cardZones4];
          break;
        case 5:
          updateZones = [...cardZones5];
          break;
        case 6:
          updateZones = [...cardZones6];
          break;
        default:
          return;
      }
      
      // 업데이트할 카드 존에 새로운 카드 정보 추가
      updateZones[index] = {cardName: card.cardName, power: card.power, kr : card.kr, description : card.description};
      
      // 업데이트된 카드 존을 useState 훅으로 업데이트
      switch (zoneIndex) {
        case 1:
          setCardZones(updateZones);
          break;
        case 2:
          setCardZones2(updateZones);
          break;
        case 3:
          setCardZones3(updateZones);
          break;
        case 4:
          setCardZones4(updateZones);
          break;
        case 5:
          setCardZones5(updateZones);
          break;
        case 6:
          setCardZones6(updateZones);
          break;
        default:
          return;
      }
    },
    [cardZones, cardZones2, cardZones3, cardZones4, cardZones5, cardZones6]
  );


  const CardPowerZone = (no : number) => {
    let powerVal;
    let powerVal2;
    let powerCss;
    switch(no){
      case 1 :
        powerVal = cardZones.reduce((prev, cur) => prev + cur.power, 0);
        powerVal2 = cardZones2.reduce((prev, cur) => prev + cur.power, 0);
        if(powerVal > powerVal2){
          powerCss = 'bg-orange-300 border-2 border-yellow-300';
        }else{
          powerCss = 'bg-gray-300 border-2 border-gray-300';
        }
        break;
      case 2:
        powerVal = cardZones2.reduce((prev, cur) => prev + cur.power, 0);
        powerVal2 = cardZones.reduce((prev, cur) => prev + cur.power, 0);
        if(powerVal > powerVal2){
          powerCss = 'bg-orange-300 border-2 border-yellow-300';
        }else{
          powerCss = 'bg-gray-300 border-2 border-gray-300';
        }
        break;
      case 3:
        powerVal = cardZones3.reduce((prev, cur) => prev + cur.power, 0);
        powerVal2 = cardZones4.reduce((prev, cur) => prev + cur.power, 0);
        if(powerVal > powerVal2){
          powerCss = 'bg-orange-300 border-2 border-yellow-300';
        }else{
          powerCss = 'bg-gray-300 border-2 border-gray-300';
        }
        break;
      case 4:
        powerVal = cardZones4.reduce((prev, cur) => prev + cur.power, 0);
        powerVal2 = cardZones3.reduce((prev, cur) => prev + cur.power, 0);
        if(powerVal > powerVal2){
          powerCss = 'bg-orange-300 border-2 border-yellow-300';
        }else{
          powerCss = 'bg-gray-300 border-2 border-gray-300';
        }
        break;
      case 5:
        powerVal = cardZones5.reduce((prev, cur) => prev + cur.power, 0);
        powerVal2 = cardZones6.reduce((prev, cur) => prev + cur.power, 0);
        if(powerVal > powerVal2){
          powerCss = 'bg-orange-300 border-2 border-yellow-300';
        }else{
          powerCss = 'bg-gray-300 border-2 border-gray-300';
        }
        break;
      case 6:
        powerVal = cardZones6.reduce((prev, cur) => prev + cur.power, 0);
        powerVal2 = cardZones5.reduce((prev, cur) => prev + cur.power, 0);
        if(powerVal > powerVal2){
          powerCss = 'bg-orange-300 border-2 border-yellow-300';
        }else{
          powerCss = 'bg-gray-300 border-2 border-gray-300';
        }
        break;
    }
    

    return (
      <div className={`${powerCss} rounded-full text-center pl-2 pr-2`}>
       
          {powerVal}
        
      </div>
    )
  }

  const CardZone : FC<cardZoneProps> = memo(function CardZone({ cardName, zoneNo, power, dropCard, kr, des }) {
  
    const [{canDrop, isOver}, drop] = useDrop(() => ({
      accept : 'box',
      drop : dropCard,
      collect:  (monitor) => ({ 
        isOver: monitor.isOver(),
        canDrop : monitor.canDrop(),
      }),
    }))
    

    const isActive = canDrop && isOver;
    let bgColor = 'bg-gray-50';
    if(isActive){
      bgColor = 'bg-gray-500';
    }else if(canDrop) {
      bgColor = 'bg-gray-200';
    }

    return(
      cardName === "" ? 
      <div className={`border-neutral-400 border-2 w-[70px] h-[100px] m-auto align-middle ${bgColor}  font-bold text-3xl rounded-md`}
        ref={drop}
        data-testid='bin'
      ></div>
      :
      <div>
        <div className="flex items-center justify-center">
          <Tooltip title={
            <div>
              <p className="text-yellow-400">{kr}</p>
              <p>{des}</p>
            </div>
          } disableInteractive>
            <Image alt="카드"
              src={`/cards/${cardName.toLowerCase()}.png`}
              width={100}
              height={100}
              ref={drop}
              className={`${bgColor}`}
              placeholder={"blur"}
              blurDataURL={"/white.png"}
            ></Image>
          </Tooltip>
        </div>
        <div className="">
          <Button onClick={() => powerMinus(zoneNo)}>-</Button>
          {power}
          <Button onClick={() =>  powerPlus(zoneNo)}>+</Button>
        </div>
      </div>
    
    )
  })

  const powerPlus = (zoneNo : {zoneNo : number, index: number}) => {
    let updateZones;
      switch (zoneNo.zoneNo) {
        case 1:
          updateZones = [...cardZones];
          break;
        case 2:
          updateZones = [...cardZones2];
          break;
        case 3:
          updateZones = [...cardZones3];
          break;
        case 4:
          updateZones = [...cardZones4];
          break;
        case 5:
          updateZones = [...cardZones5];
          break;
        case 6:
          updateZones = [...cardZones6];
          break;
        default:
          return;
      }
    let newPower = updateZones[zoneNo.index].power+1;
    updateZones[zoneNo.index] = {cardName: updateZones[zoneNo.index].cardName, power: newPower, kr : updateZones[zoneNo.index].kr, description : updateZones[zoneNo.index].description};

     // 업데이트된 카드 존을 useState 훅으로 업데이트
     switch (zoneNo.zoneNo) {
      case 1:
        setCardZones(updateZones);
        break;
      case 2:
        setCardZones2(updateZones);
        break;
      case 3:
        setCardZones3(updateZones);
        break;
      case 4:
        setCardZones4(updateZones);
        break;
      case 5:
        setCardZones5(updateZones);
        break;
      case 6:
        setCardZones6(updateZones);
        break;
      default:
        return;
    }
  }

  const powerMinus = (zoneNo : {zoneNo : number, index: number}) => {
    let updateZones;
      switch (zoneNo.zoneNo) {
        case 1:
          updateZones = [...cardZones];
          break;
        case 2:
          updateZones = [...cardZones2];
          break;
        case 3:
          updateZones = [...cardZones3];
          break;
        case 4:
          updateZones = [...cardZones4];
          break;
        case 5:
          updateZones = [...cardZones5];
          break;
        case 6:
          updateZones = [...cardZones6];
          break;
        default:
          return;
      }
    let newPower = updateZones[zoneNo.index].power-1;
    updateZones[zoneNo.index] = {cardName: updateZones[zoneNo.index].cardName, power: newPower, kr : updateZones[zoneNo.index].kr, description : updateZones[zoneNo.index].description};

     // 업데이트된 카드 존을 useState 훅으로 업데이트
     switch (zoneNo.zoneNo) {
      case 1:
        setCardZones(updateZones);
        break;
      case 2:
        setCardZones2(updateZones);
        break;
      case 3:
        setCardZones3(updateZones);
        break;
      case 4:
        setCardZones4(updateZones);
        break;
      case 5:
        setCardZones5(updateZones);
        break;
      case 6:
        setCardZones6(updateZones);
        break;
      default:
        return;
    }
  }

  const reset = () => {
    setCardPower([0,0 ,0,0 ,0,0]);
    setCardZones([
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""}
    ])
    setCardZones2([
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""}
    ])
    setCardZones3([
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""}
    ])
    setCardZones4([
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""}
    ])
    setCardZones5([
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""}
    ])
    setCardZones6([
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""},
      {cardName : "", power : 0 , kr : "", description : ""}
    ])
    setLocation1("");
    setLocation2("");
    setLocation3("");

  }

  const scrollUp = () => {
    let cur : any = innerRef.current;
    if(cur){
      cur.scrollTop -= 100;
    }
  }

  const scrollDown = () => {
    let cur : any = innerRef.current;
    if(cur){
      cur.scrollTop += 100;
    }
  }
 



  return (

    <div className="min-h-screen h-full w-full text-center bg-white">
      <main className="">
        <Header></Header>
        <div>
          <Button variant="outlined" color="secondary" onClick={reset}>초기화</Button>
        </div>
        <div className="grid grid-cols-3 pt-2">
          <div className="flex flex-col justify-center items-center">
            {/* 구역1 TOP */}
            <div className="grid grid-cols-2">
              {
                cardZones.map((val, i) => {
                  let powerNo = {zoneNo : 1, index : i}
                  return(
                    <CardZone key={i} cardName={val.cardName} zoneNo={powerNo}  power={val.power} dropCard={(item: any) => handleCardDrop(1, item, i) } kr={val.kr} des={val.description}/>
                  )
                })
              }
            </div>
            {CardPowerZone(1)}
            {locationDiv(location1, 1)}
            {CardPowerZone(2)}
            {/* 구역1 BOTTOM */}
            <div className="grid grid-cols-2">
            {
                cardZones2.map((val, i) => {
                  let powerNo = {zoneNo : 2, index : i}
                  return(
                    <CardZone key={i} cardName={val.cardName} zoneNo={powerNo} power={val.power} dropCard={(item: any) => handleCardDrop(2, item, i)  } kr={val.kr} des={val.description}/>
                  )
                })
              }
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              {/* 구역2 TOP */}
              <div className="grid grid-cols-2">
              {
                cardZones3.map((val, i) => {
                  let powerNo = {zoneNo : 3, index : i}
                  return(
                    <CardZone key={i} cardName={val.cardName} zoneNo={powerNo} power={val.power} dropCard={(item: any) => handleCardDrop(3, item, i)  } kr={val.kr} des={val.description}/>
                  )
                })
              }
              </div>
            </div>
            {CardPowerZone(3)}
            {locationDiv(location2, 2)}
            {CardPowerZone(4)}
          {/* 구역2 BOTTOM */}
            <div className="grid grid-cols-2">
            {
                cardZones4.map((val, i) => {
                  let powerNo = {zoneNo : 4, index : i}
                  return(
                    <CardZone key={i} cardName={val.cardName} zoneNo={powerNo} power={val.power} dropCard={(item: any) => handleCardDrop(4, item, i)  } kr={val.kr} des={val.description}/>
                  )
                })
              }
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            {/* 구역3 BOTTOM */}
            <div className="grid grid-cols-2">
            {
                cardZones5.map((val, i) => {
                  let powerNo = {zoneNo : 5, index : i}
                  return(
                    <CardZone key={i} cardName={val.cardName} zoneNo={powerNo} power={val.power} dropCard={(item: any) => handleCardDrop(5, item, i)  } kr={val.kr} des={val.description}/>
                  )
                })
              }
            </div>
            {CardPowerZone(5)}
            {locationDiv(location3, 3)}
            {CardPowerZone(6)}
            {/* 구역3 BOTTOM */}
            <div className="grid grid-cols-2">
            {
                cardZones6.map((val, i) => {
                  let powerNo = {zoneNo : 6, index : i}
                  return(
                    <CardZone key={i} cardName={val.cardName} zoneNo={powerNo} power={val.power} dropCard={(item: any) => handleCardDrop(6, item, i)  } kr={val.kr} des={val.description}/>
                  )
                })
              }
            </div>
          </div>
        </div>

        <div className="border-2 m-4 p-2">
          <Button className="w-full lg:hidden md:block" onClick={scrollUp}><ArrowCircleUpIcon></ArrowCircleUpIcon></Button>
          <div ref={innerRef} className="grid grid-cols-3 lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-4 overflow-y-auto h-[250px] ">
            {CardList}
          </div>
          <Button className="w-full lg:hidden md:block" onClick={scrollDown}><ArrowCircleDownIcon ></ArrowCircleDownIcon></Button>
        </div>
        <p>카드를 드래그하면 스크롤이 올라갑니다.</p>
        <Footer></Footer>
      </main>
    </div>
   
  )
}
