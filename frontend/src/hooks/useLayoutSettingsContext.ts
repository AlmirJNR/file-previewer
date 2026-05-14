import { use } from 'react';
import { LayoutSettingsContext } from '@/contexts/layoutSettingsContext.ts';

function useLayoutSettingsContext() {
    const context = use(LayoutSettingsContext);
    if (!context) {
        throw new Error('useLayoutSettingsContext hook used without LayoutSettingsContext!');
    }

    return context;
}

export { useLayoutSettingsContext };
