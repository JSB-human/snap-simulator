import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import CardJson from "../api/cards.json";

const Card = () => {

    const [cost1, setCost1] = useState<boolean>(false);
    const [cost2, setCost2] = useState<boolean>(false);
    const [cost3, setCost3] = useState<boolean>(false);
    const [cost4, setCost4] = useState<boolean>(false);
    const [cost5, setCost5] = useState<boolean>(false);
    const [cost6, setCost6] = useState<boolean>(false);

    const [abil1, setAbil1] = useState<boolean>(false);
    const [abil2, setAbil2] = useState<boolean>(false);
    const [abil3, setAbil3] = useState<boolean>(false);
    const [abil4, setAbil4] = useState<boolean>(false);
    const [abil5, setAbil5] = useState<boolean>(false);
    const [abil6, setAbil6] = useState<boolean>(false);

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
        cardName = cardName.toLowerCase();

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
            setCost1(false);
            setCost2(false);
            setCost3(false);
            setCost4(false);
            setCost5(false);
            setCost6(false);
        }else{
            setCostNum('-1');
            setCost1(true);
            setCost2(false);
            setCost3(false);
            setCost4(false);
            setCost5(false);
            setCost6(false);
        }
    }
    const costBtn2 = () => {
        if(costNum === '2'){
            setCostNum('');
            setCost1(false);
            setCost2(false);
            setCost3(false);
            setCost4(false);
            setCost5(false);
            setCost6(false);
        }else{
            setCostNum('2');
            setCost1(false);
            setCost2(true);
            setCost3(false);
            setCost4(false);
            setCost5(false);
            setCost6(false);
        }
    }
    const costBtn3 = () => {
        if(costNum === '3'){
            setCostNum('');
            setCostNum('');
            setCost1(false);
            setCost2(false);
            setCost3(false);
            setCost4(false);
            setCost5(false);
            setCost6(false);
        }else{
            setCostNum('3');
            setCost1(false);
            setCost2(false);
            setCost3(true);
            setCost4(false);
            setCost5(false);
            setCost6(false);
        }
    }
    const costBtn4 = () => {
        if(costNum === '4'){
            setCostNum('');
            setCost1(false);
            setCost2(false);
            setCost3(false);
            setCost4(false);
            setCost5(false);
            setCost6(false);
        }else{
            setCostNum('4');
            setCost1(false);
            setCost2(false);
            setCost3(false);
            setCost4(true);
            setCost5(false);
            setCost6(false);
        }
    }
    const costBtn5 = () => {
        if(costNum === '5'){
            setCostNum('');
            setCost1(false);
            setCost2(false);
            setCost3(false);
            setCost4(false);
            setCost5(false);
            setCost6(false);
        }else{
            setCostNum('5');
            setCost1(false);
            setCost2(false);
            setCost3(false);
            setCost4(false);
            setCost5(true);
            setCost6(false);
        }
    }
    const costBtn6 = () => {
        if(costNum === '6+'){
            setCostNum('');
            setCost1(false);
            setCost2(false);
            setCost3(false);
            setCost4(false);
            setCost5(false);
            setCost6(false);
        }else{
            setCostNum('6+');
            setCost1(false);
            setCost2(false);
            setCost3(false);
            setCost4(false);
            setCost5(false);
            setCost6(true);
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
            if(abil1){
                setAbil1(false);
                setAbil2(false);
                setAbil3(false);
                setAbil4(false);
                setAbil5(false);
                setAbil6(false);
            }else{
                setAbil1(true);
                setAbil2(false);
                setAbil3(false);
                setAbil4(false);
                setAbil5(false);
                setAbil6(false);
            }
        }else if(txt === '지속'){
            if(abil2){
                setAbil1(false);
                setAbil2(false);
                setAbil3(false);
                setAbil4(false);
                setAbil5(false);
                setAbil6(false);
            }else{
                setAbil1(false);
                setAbil2(true);
                setAbil3(false);
                setAbil4(false);
                setAbil5(false);
                setAbil6(false);
            }
        }else if(txt === '능력없음'){
            if(abil3){
                setAbil1(false);
                setAbil2(false);
                setAbil3(false);
                setAbil4(false);
                setAbil5(false);
                setAbil6(false);
            }else{
                setAbil1(false);
                setAbil2(false);
                setAbil3(true);
                setAbil4(false);
                setAbil5(false);
                setAbil6(false);
            }
        }else if(txt === '버리기'){
            if(abil4){
                setAbil1(false);
                setAbil2(false);
                setAbil3(false);
                setAbil4(false);
                setAbil5(false);
                setAbil6(false);
            }else{
                setAbil1(false);
                setAbil2(false);
                setAbil3(false);
                setAbil4(true);
                setAbil5(false);
                setAbil6(false);
            }
        }else if(txt === '이동'){
            if(abil5){
                setAbil1(false);
                setAbil2(false);
                setAbil3(false);
                setAbil4(false);
                setAbil5(false);
                setAbil6(false);
            }else{
                setAbil1(false);
                setAbil2(false);
                setAbil3(false);
                setAbil4(false);
                setAbil5(true);
                setAbil6(false);
            }
        }else if(txt === '파괴'){
            if(abil6){
                setAbil1(false);
                setAbil2(false);
                setAbil3(false);
                setAbil4(false);
                setAbil5(false);
                setAbil6(false);
            }else{
                setAbil1(false);
                setAbil2(false);
                setAbil3(false);
                setAbil4(false);
                setAbil5(false);
                setAbil6(true);
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
                <div className="text-left pl-2">
                    <p><b>비용</b></p>
                    {/* <Button variant="outlined" color="success" onClick={costBtn1} className={cost1 ? 'bg-green-600 text-white hover:bg-green-800' : ''}>-1</Button>
                    <Button variant="outlined" color="success" onClick={costBtn2} className={cost2 ? 'bg-green-600 text-white hover:bg-green-800' : ''}>2</Button>
                    <Button variant="outlined" color="success" onClick={costBtn3} className={cost3 ? 'bg-green-600 text-white hover:bg-green-800' : ''}>3</Button>
                    <Button variant="outlined" color="success" onClick={costBtn4} className={cost4 ? 'bg-green-600 text-white hover:bg-green-800' : ''}>4</Button>
                    <Button variant="outlined" color="success" onClick={costBtn5} className={cost5 ? 'bg-green-600 text-white hover:bg-green-800' : ''}>5</Button>
                    <Button variant="outlined" color="success" onClick={costBtn6} className={cost6 ? 'bg-green-600 text-white hover:bg-green-800' : ''}>6+</Button> */}
                    <Button variant="outlined" color="success" onClick={costBtn1}>{cost1 ? <span className="font-bold underline">-1</span> : <span>-1</span>}</Button>
                    <Button variant="outlined" color="success" onClick={costBtn2}>{cost2 ? <span className="font-bold underline">2</span> : <span>2</span>}</Button>
                    <Button variant="outlined" color="success" onClick={costBtn3}>{cost3 ? <span className="font-bold underline">3</span> : <span>3</span>}</Button>
                    <Button variant="outlined" color="success" onClick={costBtn4}>{cost4 ? <span className="font-bold underline">4</span> : <span>4</span>}</Button>
                    <Button variant="outlined" color="success" onClick={costBtn5}>{cost5 ? <span className="font-bold underline">5</span> : <span>5</span>}</Button>
                    <Button variant="outlined" color="success" onClick={costBtn6}>{cost6 ? <span className="font-bold underline">6+</span> : <span>6+</span>}</Button>
                </div>
                <div className="text-right">
                    <TextField variant="outlined" label="search" type={'search'}
                        onChange={(e) => searchTxt(e)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="text-left pl-2">
                    <p><b>능력</b></p>
                    {/* <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('출현')} className={abil1 ? 'bg-purple-600 text-white hover:bg-purple-800' : ''}>{abil1 ? <span className="bg-purple-600 text-white hover:bg-purple-800">출현</span> : <span className="">출현</span>}</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('지속')} className={abil2 ? 'bg-purple-600 text-white hover:bg-purple-800' : ''}>지속</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('능력없음')} className={abil3 ? 'bg-purple-600 text-white hover:bg-purple-800' : ''}>능력없음</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('버리기')} className={abil4 ? 'bg-purple-600 text-white hover:bg-purple-800' : ''}>버리기</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('이동')} className={abil5 ? 'bg-purple-600 text-white hover:bg-purple-800' : ''}>이동</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('파괴')} className={abil6 ? 'bg-purple-600 text-white hover:bg-purple-800' : ''}>파괴</Button> */}
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('출현')} >{abil1 ? <span className="font-bold underline">출현</span> : <span className="">출현</span>}</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('지속')} >{abil2 ? <span className="font-bold underline">지속</span> : <span className="">지속</span>}</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('능력없음')}>{abil3 ? <span className="font-bold underline">능력없음</span> : <span className="">능력없음</span>}</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('버리기')}>{abil4 ? <span className="font-bold underline">버리기</span> : <span className="">버리기</span>}</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('이동')}>{abil5 ? <span className="font-bold underline">이동</span> : <span className="">이동</span>}</Button>
                    <Button variant={'outlined'} color="secondary" onClick={() => abilBtn('파괴')}>{abil6 ? <span className="font-bold underline">파괴</span> : <span className="">파괴</span>}</Button>
                
                </div>
                <div className="text-right">
                    <b>정렬 : </b>
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