import {useEffect, useState} from "react";
import {sessionGetItem, sessionSetItem} from "@/services/storeService.ts";
import {Outlet} from "react-router";
import ScrollToTopButton from "@/components/ScrollToTopButton.tsx";
import HomeButton from "@/components/HomeButton.tsx";

export default function App() {
    const [title, setTitle] = useState('');

    useEffect(() => {
        const title = sessionGetItem<string>('title');
        setTitle(title ?? '');
    }, []);

    return (
        <div className="m-4 p-4 rounded shadow-lg shadow-gray-200 space-y-4">
            <header>
                <input
                    type="text"
                    placeholder="insira um título"
                    value={title}
                    onChange={(e) => {
                        const value = e.target.value;
                        setTitle(value);
                        sessionSetItem('title', value);
                    }}
                    onKeyUp={(e) => {
                        if (e.key !== 'Enter') {
                            return;
                        }

                        const target = e.target as HTMLInputElement;
                        target.blur();
                    }}
                    className="w-full text-center text-xl uppercase hover:outline-2 focus:outline-2 outline-cyan-800 rounded"
                />
            </header>

            <main>
                <Outlet/>
            </main>

            <ScrollToTopButton/>
            <HomeButton/>
        </div>
    );
}