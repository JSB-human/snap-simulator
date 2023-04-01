import Link from "next/link";

export default function Header() {

    return (
        <div className="text-3xl bg-violet-500 text-white p-2 text-left grid-cols-3">
          <span><Link href={"/"}>Snap Simulator</Link></span>
          <span className="pl-4 text-xl">
            <Link href={"/cards/card"}>카드</Link>
          </span>
          <span className="pl-4 text-xl">
            <Link href={"/locations/location"}>구역</Link>
          </span>
            
        </div>
    )
}