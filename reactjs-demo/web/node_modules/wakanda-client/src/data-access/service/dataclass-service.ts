import AbstractService from './abstract-service';
import {QueryOption} from '../../presentation/query-option';
import {DataClass} from '../../presentation/dataclass';
import {IEntityDBO} from '../../business/entity-business';
import {ICollectionDBO} from '../../business/collection-business';
import {DataClassBaseService} from './base/dataclass-base-service';
import WakandaClient from '../../wakanda-client';

class DataClassService extends AbstractService {

  private dataClass: DataClass;

  constructor({wakJSC, dataClass}: {wakJSC: WakandaClient, dataClass: DataClass}) {
    super({wakJSC});

    this.dataClass = dataClass;
  }

  public find(id: string|number, options: QueryOption): Promise<IEntityDBO> {
    return DataClassBaseService.find({
      httpClient: this.httpClient,
      key: id,
      options,
      dataClassName: this.dataClass.name
    });
  }

  public query(options: QueryOption): Promise<ICollectionDBO> {
    return DataClassBaseService.query({
      httpClient: this.httpClient,
      options,
      dataClassName: this.dataClass.name
    });
  }

  public callMethod(methodName: string, parameters: any[]): Promise<any> {
    return DataClassBaseService.callMethod({
      httpClient: this.httpClient,
      dataClassName: this.dataClass.name,
      methodName,
      parameters
    });
  }
}

export default DataClassService;
