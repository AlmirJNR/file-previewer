import {use} from "react";
import {TitleContext} from "@/contexts/titleContext.ts";

function useTitleContext() {
    const context = use(TitleContext);
    if (!context) {
        throw new Error('useTitleContext hook used without TitleContext!');
    }

    return context;
}

export { useTitleContext };