import ScrollToTopButton from "./components/ScrollToTopButton.tsx";
import TitleControllerButton from "./components/TitleControllerButton.tsx";

export default function ActionButtons() {
    return (
        <div className="fixed top-0 right-0 p-4 group/actionButtons">
            <div
                className="
                            flex flex-col items-end space-y-2
                            opacity-25 translate-x-full pointer-events-none
                            transition-all duration-300
                            group-hover/actionButtons:opacity-100
                            group-hover/actionButtons:translate-x-0
                            group-hover/actionButtons:pointer-events-auto
                "
            >
                <ScrollToTopButton/>
                <TitleControllerButton/>
            </div>
        </div>
    );
}