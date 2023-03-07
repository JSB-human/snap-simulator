import Image from "next/dist/client/image";
import Header from "../../components/header";
import LocationJson from "../api/location.json";

const Location = () => {

    


    const locationDiv = LocationJson.map((val, index) => {
        let startIndex = val.name.indexOf("(")+1;
        let endIndex = val.name.indexOf(")");
        let locationImg = val.name.substring(startIndex, endIndex).replace(/ /g, "-").replace(/'/g, "");


        return (
            <div className="flex flex-col justify-center items-center border-2 m-2 bg-white" key={index}>
                <Image alt="구역"
                    src={`/locations/${locationImg}.png`}  
                    width={200}
                    height={200}
                />
                <div className="p-2">
                    <div className="font-bold">
                        {val.name}
                    </div>
                    <div>
                        {val.description}
                    </div>
                </div>
            </div>
        )
    })




    return(
        <div className="min-h-screen h-full w-full text-center bg-white">
            <Header></Header>
            <div className="text-2xl p-4">구역</div>
            <div className="grid grid-cols-4 pt-2 pb-2">
                {locationDiv}
            </div>
            
        </div>
    )
}

export default Location;