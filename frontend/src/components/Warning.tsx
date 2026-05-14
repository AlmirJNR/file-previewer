import {FaTriangleExclamation} from "react-icons/fa6";

interface IWarningProps {
    text: string;
}

export default function Warning({text}: IWarningProps) {
    return (
        <div className="flex items-center justify-center gap-2">
            <FaTriangleExclamation className="fill-yellow-400"/>
            <span>{text}</span>
            <FaTriangleExclamation className="fill-yellow-400"/>
        </div>
    );
}