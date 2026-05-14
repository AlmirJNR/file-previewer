import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useLayoutSettingsContext } from '@/hooks/useLayoutSettingsContext.ts';

interface IButtonProps {
    targetIsVisible: boolean;
    targetIsVisibleText: string;
    targetIsNotVisibleText: string;
    onClick: () => void;
}

function Button({
    targetIsVisible,
    targetIsVisibleText,
    targetIsNotVisibleText,
    onClick,
}: IButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex items-center justify-evenly gap-2 rounded-full bg-cyan-800 p-2 hover:cursor-pointer hover:bg-white"
        >
            {targetIsVisible ? (
                <>
                    <FaEyeSlash className="fill-white group-hover:fill-cyan-800" />
                    <span className="text-xs text-white group-hover:text-cyan-800">
                        {targetIsVisibleText}
                    </span>
                </>
            ) : (
                <>
                    <FaEye className="fill-white group-hover:fill-cyan-800" />
                    <span className="text-xs text-white group-hover:text-cyan-800">
                        {targetIsNotVisibleText}
                    </span>
                </>
            )}
        </button>
    );
}

export default function LayoutControllerButtons() {
    const { title, fileName, fileDescriptionButton } = useLayoutSettingsContext();

    function onClickTitleButton() {
        title.setIsVisible(prevState => !prevState);
    }

    function onClickFileNameButton() {
        fileName.setIsVisible(prevState => !prevState);
    }

    function onClickFileDescriptionButton() {
        fileDescriptionButton.setIsVisible(prevState => !prevState);
    }

    return (
        <>
            <Button
                targetIsVisible={title.isVisible}
                targetIsVisibleText="Ocultar título"
                targetIsNotVisibleText="Mostrar título"
                onClick={onClickTitleButton}
            />

            <Button
                targetIsVisible={fileName.isVisible}
                targetIsVisibleText="Ocultar nome dos arquivos"
                targetIsNotVisibleText="Mostrar nome dos arquivos"
                onClick={onClickFileNameButton}
            />

            <Button
                targetIsVisible={fileDescriptionButton.isVisible}
                targetIsVisibleText="Ocultar botão de descrição"
                targetIsNotVisibleText="Mostrar botão de descrição"
                onClick={onClickFileDescriptionButton}
            />
        </>
    );
}
