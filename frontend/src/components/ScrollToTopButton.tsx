import {FaArrowUp} from "react-icons/fa6";

export default function ScrollToTopButton() {
    function handleClick() {
        window.scroll({top: 0, behavior: 'smooth'});
    }

    return (
        <button type="button"
                onClick={handleClick}
                className="fixed bottom-10 right-4 bg-cyan-800 rounded-full p-2 group hover:bg-white hover:cursor-pointer">
            <FaArrowUp className="fill-white group-hover:fill-cyan-800"/>
        </button>
    );
}