import { Activity, ChangeEvent, useEffect, useState } from 'react';
import { useLayoutSettingsContext } from '@/hooks/useLayoutSettingsContext.ts';

const KEY = 'title';

export default function Title() {
    const [title, setTitle] = useState(() => localStorage.getItem(KEY) ?? '');
    const { title: titleLayout } = useLayoutSettingsContext();

    useEffect(() => {
        localStorage.setItem(KEY, title);
    }, [title]);

    function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    return (
        <Activity mode={titleLayout.isVisible ? 'visible' : 'hidden'}>
            <input
                className="w-full border-b border-cyan-800 text-center focus:outline-none"
                type="text"
                value={title}
                onChange={onTitleChange}
            />
        </Activity>
    );
}
