import { Activity, useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    function handleClick() {
        window.scroll({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        const onScrollEnd = () => {
            const element = document.documentElement;
            const maxScroll = element.scrollHeight - element.clientHeight;
            const isBelowMiddle = element.scrollTop >= maxScroll / 2;
            setIsVisible(isBelowMiddle);
        };

        window.addEventListener('scrollend', onScrollEnd);
        return () => {
            window.removeEventListener('scrollend', onScrollEnd);
        };
    }, []);

    return (
        <Activity mode={isVisible ? 'visible' : 'hidden'}>
            <button
                type="button"
                onClick={handleClick}
                className={`group flex items-center justify-evenly gap-2 rounded-full bg-cyan-800 p-2 hover:cursor-pointer hover:bg-white`}
            >
                <FaArrowUp className="fill-white group-hover:fill-cyan-800" />
                <span className="text-xs text-white group-hover:text-cyan-800">Ir para o topo</span>
            </button>
        </Activity>
    );
}
