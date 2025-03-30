import ScrollToTopButton from "./components/ScrollToTopButton.tsx";
import HomeButton from "./components/HomeButton.tsx";

export default function ActionButtons() {
    return (
        <div className="fixed bottom-4 right-4 flex flex-col justify-center items-center space-y-2">
            <ScrollToTopButton/>
            <HomeButton/>
        </div>
    );
}