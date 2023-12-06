# Important updates

### 9.1.15.0

- Update function `getPageDataFromId` fetcher to take a `boolean` `cart` argument instead of whole cart object. The boolean value represents whether the user has a non-empty cart or not.
- update MUI style related imports to import from `@mui/material/styles` instead of `@mui/material` to remedy Next.js 13 build tree shake issue https://github.com/vercel/next.js/issues/55663
