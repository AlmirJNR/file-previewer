import {FaSpinner} from "react-icons/fa6";

export default function Loading() {
    return (
        <div className="flex justify-center items-center space-x-2">
            <span>Carregando</span>
            <FaSpinner className="animate-spin"/>
        </div>
    );
}