import {FaArrowUp} from "react-icons/fa6";
import {Activity, useEffect, useState} from "react";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    function handleClick() {
        window.scroll({top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        const onScrollEnd = () => {
            const element = document.documentElement;
            const maxScroll = element.scrollHeight - element.clientHeight;
            const isBelowMiddle = element.scrollTop >= maxScroll / 2;
            setIsVisible(isBelowMiddle);
        };

        window.addEventListener("scrollend", onScrollEnd);
        return () => {
            window.removeEventListener("scrollend", onScrollEnd);
        }
    }, []);

    return (
        <Activity mode={isVisible ? 'visible' : 'hidden'}>
            <button type="button"
                    onClick={handleClick}
                    className="
                        flex justify-evenly items-center gap-2
                        bg-cyan-800 rounded-full p-2 group
                        hover:bg-white hover:cursor-pointer
                    "
            >
                <FaArrowUp className="fill-white group-hover:fill-cyan-800"/>
                <span className="text-white group-hover:text-cyan-800 text-xs">Ir para o topo</span>
            </button>
        </Activity>
    );
}