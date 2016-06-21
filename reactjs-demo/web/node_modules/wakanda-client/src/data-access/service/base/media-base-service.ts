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

export class MediaBaseService {

  public static upload({httpClient, dataClassName, entityKey, attributeName, file, isImage}: IUploadParams): Promise<HttpResponse> {

    let uri = this._buildUri(dataClassName, entityKey, attributeName);

    if (isImage) {
      uri += '?$rawPict=' + file.type;
    }

    //FIXME - real crappy not to return some piece of information to refresh entity
    return httpClient.post({
      uri,
      data: file,
      binary: true
    });
  }

  public static delete({httpClient, dataClassName, entityKey, entityStamp, attributeName}: IDeleteParams): Promise<HttpResponse> {
    let uri = '/' + dataClassName + '(' + entityKey + ')';
    let data: any = {
      __KEY: entityKey,
      __STAMP: entityStamp
    };

    data[attributeName] = null;

    //FIXME - crappy
    return httpClient.post({
      uri,
      data
    });
  }

  private static _buildUri(dataClassName: string, entityKey: string, attributeName: string): string {
    return '/' + dataClassName + '(' + entityKey + ')' + '/' + attributeName;
  }
}
