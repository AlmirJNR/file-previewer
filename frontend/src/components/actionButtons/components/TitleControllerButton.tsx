import {FaEye, FaEyeSlash} from "react-icons/fa6";
import {useTitleContext} from "@/hooks/useTitleContext.ts";

export default function TitleControllerButton() {
    const {isVisible, setIsVisible} = useTitleContext();

    function onClick() {
        setIsVisible((prevState) => !prevState);
    }

    return (
        <button type="button"
                onClick={onClick}
                className="
                    flex justify-evenly items-center gap-2
                    bg-cyan-800 rounded-full p-2 group
                    hover:bg-white hover:cursor-pointer
                "
        >
            {isVisible
                ? <>
                    <FaEyeSlash className="fill-white group-hover:fill-cyan-800"/>
                    <span className="text-white group-hover:text-cyan-800 text-xs">Ocultar título</span>
                </>
                : <>
                    <FaEye className="fill-white group-hover:fill-cyan-800"/>
                    <span className="text-white group-hover:text-cyan-800 text-xs">Mostrar título</span>
                </>
            }
        </button>
    );
}