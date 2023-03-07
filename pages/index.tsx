import { Button } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"
import Header from "../components/header";
import cardDb from "./api/carddata";
import CardJson from "./api/cards.json";

// interface Card { 
//   cid: number; 
//   cname: string; 
//   type: string; 
//   art: string; 
//   url: string; 
//   ability: string; 
//   cost: number; 
//   power: number; 
//   carddefid: string; 
//   uuid: string; 
//   source: string; 
//   source_slug: string; 
// }

interface Card {
  name: string;
  imageUrl: string;
}

export default function Home() {
  useEffect(() => {
     
  
   
  },[])



  return (
    <div className="min-h-screen h-full w-full text-center bg-white">
      <main className="">
        <Header></Header>
        <div className="grid grid-cols-3">
          <div className="flex flex-col justify-center items-center">
            <div className="grid grid-cols-2">
              <Image alt="구역"
                src="/cards/ant-man.png"
                width={100}
                height={100}
              ></Image>
              <Image alt="구역"
                src="/cards/ant-man.png"
                width={100}
                height={100}
              ></Image>
              <Image alt="구역"
                src="/cards/ant-man.png"
                width={100}
                height={100}
              ></Image>
              <Image alt="구역"
                src="/cards/ant-man.png"
                width={100}
                height={100}
              ></Image>
            </div>
            <Image alt="구역"
              src="/locations/Asgard.png"
              width={150}
              height={150}
            ></Image>
          </div>
          <div className="flex flex-col justify-center items-center">
           <Image alt="구역"
            src="/locations/Asgard.png"
            width={150}
            height={150}
          ></Image>
          </div>
          <div className="flex flex-col justify-center items-center">
           <Image alt="구역"
            src="/locations/Asgard.png"
            width={150}
            height={150}
          ></Image>
          </div>

        </div>
      </main>
    </div>
   
  )
}
