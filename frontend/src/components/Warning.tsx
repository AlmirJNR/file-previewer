import {FaTriangleExclamation} from "react-icons/fa6";

interface IWarningProps {
    text: string;
}

export default function Warning({text}: IWarningProps) {
    const warningElement = <FaTriangleExclamation className="fill-yellow-400"/>;

    return (
        <div className="flex items-center space-x-2">
            {warningElement}
            <span>{text}</span>
            {warningElement}
        </div>
    );
}