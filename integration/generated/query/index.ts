
import { HttpClient } from './http-client';
import { CategoryViewResource } from './CategoryViewResource';
import { ProductViewResource } from './ProductViewResource';
import { SearchConfigResource } from './SearchConfigResource';
import { SearchDocumentResource } from './SearchDocumentResource';
import { SearchProfileResource } from './SearchProfileResource';
import { SiteContentResource } from './SiteContentResource';
import { V2CategoryResource } from './V2CategoryResource';
import { V2ProductResource } from './V2ProductResource';
import { V2UrlResource } from './V2UrlResource';
const publicClient = new HttpClient({
	baseUrl: process.env.NODE_ENV === 'production' ? '/search/resources':'/api/search',
});
const privateClient = new HttpClient({
	baseUrl: (process.env.USE_MOCK === 'true' ? 'http://localhost:' + process.env.MOCK_HOST_PORT : process.env.SEARCH_ORIGIN as string) + '/search/resources',
});

export const queryCategoryViewResource = (pub: boolean) => new CategoryViewResource(pub ? publicClient : privateClient);
export const queryProductViewResource = (pub: boolean) => new ProductViewResource(pub ? publicClient : privateClient);
export const querySearchConfigResource = (pub: boolean) => new SearchConfigResource(pub ? publicClient : privateClient);
export const querySearchDocumentResource = (pub: boolean) => new SearchDocumentResource(pub ? publicClient : privateClient);
export const querySearchProfileResource = (pub: boolean) => new SearchProfileResource(pub ? publicClient : privateClient);
export const querySiteContentResource = (pub: boolean) => new SiteContentResource(pub ? publicClient : privateClient);
export const queryV2CategoryResource = (pub: boolean) => new V2CategoryResource(pub ? publicClient : privateClient);
export const queryV2ProductResource = (pub: boolean) => new V2ProductResource(pub ? publicClient : privateClient);
export const queryV2UrlResource = (pub: boolean) => new V2UrlResource(pub ? publicClient : privateClient);
