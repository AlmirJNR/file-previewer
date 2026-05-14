import { useState } from 'react';
import MenuButton from '@/components/actionButtons/components/MenuButton.tsx';
import LayoutControllerButtons from './components/LayoutControllerButtons.tsx';
import ScrollToTopButton from './components/ScrollToTopButton.tsx';

export default function ActionButtons() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function onClickMenuButton() {
        setIsMenuOpen(true);
    }

    function onTransitionEnd() {
        setIsMenuOpen(false);
    }

    return (
        <div className="group/actionButtons fixed top-0 right-0 p-4">
            <div
                className="pointer-events-none flex translate-x-full flex-col items-end space-y-2 opacity-25 transition-all duration-300 group-hover/actionButtons:pointer-events-auto group-hover/actionButtons:translate-x-0 group-hover/actionButtons:opacity-100"
                onTransitionEnd={onTransitionEnd}
            >
                {!isMenuOpen && <MenuButton onClick={onClickMenuButton} />}
                {isMenuOpen && (
                    <>
                        <ScrollToTopButton />
                        <LayoutControllerButtons />
                    </>
                )}
            </div>
        </div>
    );
}
