
const SEARCH_ORIGIN = process.env.SEARCH_ORIGIN;
const TRANSACTION_ORIGIN = process.env.TRANSACTION_ORIGIN;
const MOCK_HOST_PORT = process.env.MOCK_HOST_PORT;
const useMock = process.env.USE_MOCK === 'true';
export const apiProxyOptions = [
   {
        target: useMock ? 'http://localhost:' + MOCK_HOST_PORT : SEARCH_ORIGIN,
        pathRewrite: [
            {
                patternStr: '^/api/search',
                replaceStr: '/search/resources',
            },
        ],
    },
   {
        target: useMock ? 'http://localhost:' + MOCK_HOST_PORT : TRANSACTION_ORIGIN,
        pathRewrite: [
            {
                patternStr: '^/api/resources',
                replaceStr: '/wcs/resources',
            },
        ],
    },
];
