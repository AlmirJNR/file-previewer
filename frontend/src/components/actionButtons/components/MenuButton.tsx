import { FaBars } from 'react-icons/fa6';

interface IMenuButtonProps {
    onClick: () => void;
}

export default function MenuButton({ onClick }: IMenuButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`group flex items-center justify-evenly gap-2 rounded-full bg-cyan-800 p-2 hover:cursor-pointer hover:bg-white`}
        >
            <FaBars className="fill-white group-hover:fill-cyan-800" />
            <span className="text-xs text-white group-hover:text-cyan-800">Abrir menu</span>
        </button>
    );
}
