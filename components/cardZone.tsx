import { FC, memo } from "react";
import { useDrop } from "react-dnd";
import Image from "next/image";

interface cardZoneProps {
    cardName : string, 
    zoneNo : number
  }
  

export const CardZone : FC<cardZoneProps> = memo(function cardZone({ cardName, zoneNo }) {
    const [{canDrop, isOver}, drop] = useDrop(() => ({
      accept : 'box',
      drop : () => ({name : cardName, zone : zoneNo}),
      collect:  (monitor) => ({
        isOver: monitor.isOver(),
        canDrop : monitor.canDrop(),
      }),
    }),
    [cardName, zoneNo]
    )

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
      <Image alt="카드"
        src={`/cards/${cardName}.png`}
        width={100}
        height={100}
        ref={drop}
        className={`${bgColor}`}
      ></Image>
    )
  })