import js from '@eslint/js';
import { default as reactDom } from 'eslint-plugin-react-dom';
import reactRefresh from 'eslint-plugin-react-refresh';
import { default as reactX } from 'eslint-plugin-react-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.strictTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'react-refresh': reactRefresh,
            'react-x': reactX,
            'react-dom': reactDom,
        },
        rules: {
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            ...reactX.configs['recommended-typescript'].rules,
            ...reactDom.configs.recommended.rules,
        },
    }
);
