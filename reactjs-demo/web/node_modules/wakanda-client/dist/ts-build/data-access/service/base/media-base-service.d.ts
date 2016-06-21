import HttpClient from '../../http/http-client';
import HttpResponse from '../../http/http-response';
export interface IUploadParams {
    httpClient: HttpClient;
    dataClassName: string;
    entityKey: string;
    attributeName: string;
    file: File;
    isImage: boolean;
}
export interface IDeleteParams {
    httpClient: HttpClient;
    dataClassName: string;
    entityKey: string;
    entityStamp: number;
    attributeName: string;
}
export declare class MediaBaseService {
    static upload({httpClient, dataClassName, entityKey, attributeName, file, isImage}: IUploadParams): Promise<HttpResponse>;
    static delete({httpClient, dataClassName, entityKey, entityStamp, attributeName}: IDeleteParams): Promise<HttpResponse>;
    private static _buildUri(dataClassName, entityKey, attributeName);
}
