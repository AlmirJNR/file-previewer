/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    endOfLine: 'lf',
    printWidth: 100,
    arrowParens: 'avoid',
    jsxSingleQuote: false,

    // sort imports
    importOrder: [
        '^react$',
        '^react-dom(.*)$',
        '<THIRD_PARTY_MODULES>',
        '^@/utils(.*)$',
        '^@/services(.*)$',
        '^@/hooks(.*)$',
        '^@/components(.*)$',
        '^@/types(.*)$',
        '^[./]',
        '^.+\\.s?css$',
    ],
    importOrderSortSpecifiers: true,
};

export default config;
