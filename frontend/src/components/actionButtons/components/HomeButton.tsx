import {FaHouse} from "react-icons/fa6";
import {Link} from "react-router";

export default function HomeButton() {
    return (
        <Link to="/" className="bg-cyan-800 rounded-full p-2 group hover:bg-white">
            <FaHouse className="fill-white group-hover:fill-cyan-800"/>
        </Link>
    );
}