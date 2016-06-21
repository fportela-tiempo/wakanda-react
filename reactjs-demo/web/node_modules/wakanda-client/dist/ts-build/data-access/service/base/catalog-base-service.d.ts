import HttpClient from '../../http/http-client';
import { IDataClassDBO } from '../../../business/catalog-business';
export declare class CatalogBaseService {
    static get({httpClient, dataClasses}: {
        httpClient: HttpClient;
        dataClasses?: string | string[];
    }): Promise<IDataClassDBO[]>;
}
