import {Activity, ChangeEvent} from "react";
import {useTitleContext} from "@/hooks/useTitleContext.ts";

export default function Title() {
    const {isVisible, title, setTitle} = useTitleContext();

    function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    return (
        <Activity mode={isVisible ? 'visible' : 'hidden'}>
            <input className="w-full text-center focus:outline-none border-b border-cyan-800"
                   type="text"
                   value={title}
                   onChange={onTitleChange}
            />
        </Activity>
    );
}