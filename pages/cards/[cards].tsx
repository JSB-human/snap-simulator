import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import CardJson from "../api/cards.json";

const Card = () => {

    const [cost1, setCost1] = useState<string>('');
    const [cost2, setCost2] = useState<string>('');
    const [cost3, setCost3] = useState<string>('');
    const [cost4, setCost4] = useState<string>('');
    const [cost5, setCost5] = useState<string>('');
    const [cost6, setCost6] = useState<string>('');

    const [abil1, setAbil1] = useState<string>('');
    const [abil2, setAbil2] = useState<string>('');
    const [abil3, setAbil3] = useState<string>('');
    const [abil4, setAbil4] = useState<string>('');
    const [abil5, setAbil5] = useState<string>('');
    const [abil6, setAbil6] = useState<string>('');

    const [search, setSearch] = useState('');
    const [ability, setAbility] = useState('');
    const [pool, setPool] = useState('');
    const [cost, setCost] = useState(0);
    const [power, setPower] = useState(0);
    const [sort, setSort] = useState(0); // 분류

    const [costNum, setCostNum] = useState('');


  
    
    const cardSort = CardJson.sort((a,b) => 
        sort === 0 ? 
        cost != 0 ? parseInt(a.cost) - parseInt(b.cost) : parseInt(b.cost) - parseInt(a.cost)
        :
        power != 0 ? parseInt(a.power) - parseInt(b.power) : parseInt(b.power) - parseInt(a.power)

        ).filter(val => {
            let card : any = val.name.includes(search);
            
            return card;
        }).filter(val => {
            let card;

            card = val.sort?.includes(ability) || val.sort2?.includes(ability) || val.sort3?.includes(ability);

            return card;
        }).filter(val => {
            let card;
            if(costNum === '-1'){
                card = Number(val.cost) <= 1;
            }else if(costNum === '6+'){
                card = Number(val.cost) >= 6; 
            }else{
                card = val.cost.includes(costNum);
            }
            return card;
        }).map((val, index) => {
        let cardName = val.en.replace(/ /g, "-");
        cardName = cardName.replace(/'/g, "");

        return (
            <div key={index} className="flex flex-col justify-center items-center border-4 rounded-lg border-gray-300 m-2 bg-white">
                <Image alt="card" src={`/cards/${cardName}.png`}
                    className=""
                    width={200}
                    height={200}
                    // placeholder={"blur"}
                    // blurDataURL={"/white.png"}
                ></Image>
                <span className="font-bold text-lg">{val.name}</span>
                <div className="text-sm p-2">
                    <span className="font-bold">{val.kind}</span>{val.kind!=undefined ? ':' : ''} {val.description}
                    <br/>
                    <span className="font-bold">{val.kind2}</span>{val.kind2!=undefined ? ':' : ''} {val.description2}
                    <span>{val.description!=undefined ? '' : val.base}</span>
                    <span>{val.text}</span>
                </div>
            </div>
        )
    })

    const costBtn1 = () => {
        if(costNum === '-1'){
            setCostNum('');
            setCost1('');
            setCost2('');
            setCost3('');
            setCost4('');
            setCost5('');
            setCost6('');
        }else{
            setCostNum('-1');
            setCost1('bg-green-600 text-white hover:bg-green-800');
            setCost2('');
            setCost3('');
            setCost4('');
            setCost5('');
            setCost6('');
        }
    }
    const costBtn2 = () => {
        if(costNum === '2'){
            setCostNum('');
            setCost1('');
            setCost2('');
            setCost3('');
            setCost4('');
            setCost5('');
            setCost6('');
        }else{
            setCostNum('2');
            setCost1('');
            setCost2('bg-green-600 text-white hover:bg-green-800');
            setCost3('');
            setCost4('');
            setCost5('');
            setCost6('');
        }
    }
    const costBtn3 = () => {
        if(costNum === '3'){
            setCostNum('');
            setCost1('');
            setCost2('');
            setCost3('');
            setCost4('');
            setCost5('');
            setCost6('');
        }else{
            setCostNum('3');
            setCost1('');
            setCost2('');
            setCost3('bg-green-600 text-white hover:bg-green-800');
            setCost4('');
            setCost5('');
            setCost6('');
        }
    }
    const costBtn4 = () => {
        if(costNum === '4'){
            setCostNum('');
            setCost1('');
            setCost2('');
            setCost3('');
            setCost4('');
            setCost5('');
            setCost6('');
        }else{
            setCostNum('4');
            setCost1('');
            setCost2('');
            setCost3('');
            setCost4('bg-green-600 text-white hover:bg-green-800');
            setCost5('');
            setCost6('');
        }
    }
    const costBtn5 = () => {
        if(costNum === '5'){
            setCostNum('');
            setCost1('');
            setCost2('');
            setCost3('');
            setCost4('');
            setCost5('');
            setCost6('');
        }else{
            setCostNum('5');
            setCost1('');
            setCost2('');
            setCost3('');
            setCost4('');
            setCost5('bg-green-600 text-white hover:bg-green-800');
            setCost6('');
        }
    }
    const costBtn6 = () => {
        if(costNum === '6+'){
            setCostNum('');
            setCost1('');
            setCost2('');
            setCost3('');
            setCost4('');
            setCost5('');
            setCost6('');
        }else{
            setCostNum('6+');
            setCost1('');
            setCost2('');
            setCost3('');
            setCost4('');
            setCost5('');
            setCost6('bg-green-600 text-white hover:bg-green-800');
        }
    }

    const costSortBtn = () => {
        if(cost === 0){
            setCost(1);
            setSort(0);
        }else{
            setCost(0);
            setSort(0);
        }
    }

    const powerSortBtn = () => {
        if(power === 0){
            setPower(1);
            setSort(1);
        }else{
            setPower(0);
            setSort(1);
        }
    }

    const searchTxt = (e : any) => {
        setSearch(e.target.value);
    }

    const abilBtn = (txt : string) => {
        // let abilTxt = ability;
        // if(abilTxt.includes(txt)){
        //     abilTxt = abilTxt.replace(txt, '');
        // }else{
        //     abilTxt = abilTxt + txt;
        // }
        // setAbility(abilTxt);
        if(txt === '출현'){
            if(abil1 === 'bg-purple-600 text-white hover:bg-purple-800'){
                setAbil1('');
                setAbil2('');
                setAbil3('');
                setAbil4('');
                setAbil5('');
                setAbil6('');
            }else{
                setAbil1('bg-purple-600 text-white hover:bg-purple-800');
                setAbil2('');
                setAbil3('');
                setAbil4('');
                setAbil5('');
                setAbil6('');
            }
        }else if(txt === '지속'){
            if(abil2 === 'bg-purple-600 text-white hover:bg-purple-800'){
                setAbil1('');
                setAbil2('');
                setAbil3('');
                setAbil4('');
                setAbil5('');
                setAbil6('');
            }else{
                setAbil1('');
                setAbil2('bg-purple-600 text-white hover:bg-purple-800');
                setAbil3('');
                setAbil4('');
                setAbil5('');
                setAbil6('');
            }
        }else if(txt === '능력없음'){
            if(abil3 === 'bg-purple-600 text-white hover:bg-purple-800'){
                setAbil1('');
                setAbil2('');
                setAbil3('');
                setAbil4('');
                setAbil5('');
                setAbil6('');
            }else{
                setAbil1('');
                setAbil2('');
                setAbil3('bg-purple-600 text-white hover:bg-purple-800');
                setAbil4('');
                setAbil5('');
                setAbil6('');
            }
        }else if(txt === '버리기'){
            if(abil4 === 'bg-purple-600 text-white hover:bg-purple-800'){
                setAbil1('');
                setAbil2('');
                setAbil3('');
                setAbil4('');
                setAbil5('');
                setAbil6('');
            }else{
                setAbil1('');
                setAbil2('');
                setAbil3('');
                setAbil4('bg-purple-600 text-white hover:bg-purple-800');
                setAbil5('');
                setAbil6('');
            }
        }else if(txt === '이동'){
            if(abil5 === 'bg-purple-600 text-white hover:bg-purple-800'){
                setAbil1('');
                setAbil2('');
                setAbil3('');
                setAbil4('');
                setAbil5('');
                setAbil6('');
            }else{
                setAbil1('');
                setAbil2('');
                setAbil3('');
                setAbil4('');
                setAbil5('bg-purple-600 text-white hover:bg-purple-800');
                setAbil6('');
            }
        }else if(txt === '파괴'){
            if(abil6 === 'bg-purple-600 text-white hover:bg-purple-800'){
                setAbil1('');
                setAbil2('');
                setAbil3('');
                setAbil4('');
                setAbil5('');
                setAbil6('');
            }else{
                setAbil1('');
                setAbil2('');
                setAbil3('');
                setAbil4('');
                setAbil5('');
                setAbil6('bg-purple-600 text-white hover:bg-purple-800');
            }
        }

        if(ability.includes(txt)){
            setAbility('');
        }else{
            setAbility(txt);
        }
    }

    return(
        <div className="min-h-screen h-full w-full text-center bg-gray-100">
            <Header></Header>

            <div className="text-2xl p-4">카드</div>
            <div className="grid grid-cols-2">
                <div className="text-left">
                    <span>비용 : </span>
                    <Button variant="outlined" color="success" onClick={costBtn1} className={`${cost1}`}>-1</Button>
                    <Button variant="outlined" color="success" onClick={costBtn2} className={`${cost2}`}>2</Button>
                    <Button variant="outlined" color="success" onClick={costBtn3} className={`${cost3}`}>3</Button>
                    <Button variant="outlined" color="success" onClick={costBtn4} className={`${cost4}`}>4</Button>
                    <Button variant="outlined" color="success" onClick={costBtn5} className={`${cost5}`}>5</Button>
                    <Button variant="outlined" color="success" onClick={costBtn6} className={`${cost6}`}>6+</Button>
                
                </div>
                <div className="text-right">
                    <TextField variant="outlined" label="search" type={'search'}
                        onChange={(e) => searchTxt(e)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="text-left">
                    <span>능력 : </span>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('출현')} className={`${abil1}`}>출현</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('지속')} className={`${abil2}`}>지속</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('능력없음')} className={`${abil3}`}>능력없음</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('버리기')} className={`${abil4}`}>버리기</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('이동')} className={`${abil5}`}>이동</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('파괴')} className={`${abil6}`}>파괴</Button>
                
                </div>
                <div className="text-right">
                  <span>분류 : </span>
                  <Button variant="outlined" onClick={costSortBtn}>{sort === 0 ? cost === 0 ? '비용 ↓' : '비용 ↑' : '비용'}</Button>
                  <Button variant="outlined" onClick={powerSortBtn}>{sort === 1 ? power === 0 ? '파워 ↓' : '파워 ↑' : '파워'}</Button>
                </div>
            </div>
           
            <div className="grid grid-cols-2 xl:grid-cols-6 pt-2 pb-2">
                {cardSort}
            </div>

        <Footer></Footer>

        </div>
    )


}

export default Card;