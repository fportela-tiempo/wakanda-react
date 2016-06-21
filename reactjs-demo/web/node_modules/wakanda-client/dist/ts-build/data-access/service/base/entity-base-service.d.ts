import HttpClient from '../../http/http-client';
import { IEntityDBO } from '../../../business/entity-business';
export interface ISaveParams {
    httpClient: HttpClient;
    data: IEntityDBO;
    expand: string;
    dataClassName: string;
}
export interface IRecomputeParams {
    httpClient: HttpClient;
    data: IEntityDBO;
    dataClassName: string;
}
export interface ICallMethodParams {
    httpClient: HttpClient;
    dataClassName: string;
    methodName: string;
    parameters: any[];
    entityKey: string;
}
export interface IDeleteParams {
    httpClient: HttpClient;
    dataClassName: string;
    entityKey: string;
}
export declare class EntityBaseService {
    static save({httpClient, data, expand, dataClassName}: ISaveParams): Promise<IEntityDBO>;
    static recompute({httpClient, dataClassName, data}: IRecomputeParams): Promise<IEntityDBO>;
    static callMethod({httpClient, dataClassName, methodName, parameters, entityKey}: ICallMethodParams): Promise<any>;
    static delete({httpClient, dataClassName, entityKey}: IDeleteParams): Promise<boolean>;
}
