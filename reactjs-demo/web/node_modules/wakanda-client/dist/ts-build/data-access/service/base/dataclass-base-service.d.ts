import HttpClient from '../../http/http-client';
import { QueryOption } from '../../../presentation/query-option';
import { IEntityDBO } from '../../../business/entity-business';
import { ICollectionDBO } from '../../../business/collection-business';
export interface IFindParams {
    httpClient: HttpClient;
    key: number | string;
    options: QueryOption;
    dataClassName: string;
}
export interface IQueryParams {
    httpClient: HttpClient;
    options: QueryOption;
    dataClassName: string;
}
export interface ICallMethodParams {
    httpClient: HttpClient;
    methodName: string;
    parameters: any[];
    dataClassName: string;
}
export declare class DataClassBaseService {
    static find({httpClient, key, options, dataClassName}: IFindParams): Promise<IEntityDBO>;
    static query({httpClient, options, dataClassName}: IQueryParams): Promise<ICollectionDBO>;
    static callMethod({httpClient, methodName, parameters, dataClassName}: ICallMethodParams): Promise<any>;
    private static _sanitizeOptionParams(params);
}
