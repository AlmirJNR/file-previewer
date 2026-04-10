import ScrollToTopButton from "./components/ScrollToTopButton.tsx";
import MeetingAgendaButton from "@/components/actionButtons/components/MeetingAgendaButton.tsx";

export default function ActionButtons() {
    return (
        <div className="fixed bottom-4 right-4 flex flex-col justify-center items-end space-y-2">
            <ScrollToTopButton/>
            <MeetingAgendaButton/>
        </div>
    );
}