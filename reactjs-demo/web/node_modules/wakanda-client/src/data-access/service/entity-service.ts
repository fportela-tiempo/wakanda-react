import AbstractService from './abstract-service';
import Entity from '../../presentation/entity';
import {DataClass} from '../../presentation/dataclass';
import {IEntityDBO} from '../../business/entity-business';
import {EntityBaseService} from './base/entity-base-service';
import WakandaClient from '../../wakanda-client';

class EntityService extends AbstractService {

  private entity: Entity;
  private dataClass: DataClass;

  constructor({wakJSC, entity, dataClass}:
  {wakJSC: WakandaClient, entity: Entity, dataClass: DataClass}) {
    super({wakJSC});

    this.entity = entity;
    this.dataClass = dataClass;
  }

  public save(data: IEntityDBO, expand: string) {
    return EntityBaseService.save({
      httpClient: this.httpClient,
      dataClassName: this.dataClass.name,
      expand,
      data
    });
  }

  public recompute(data: IEntityDBO) {
   return EntityBaseService.recompute({
      httpClient: this.httpClient,
      dataClassName: this.dataClass.name,
      data
    });
  }

  public callMethod(methodName: string, parameters: any[]) {
    return EntityBaseService.callMethod({
      httpClient: this.httpClient,
      dataClassName: this.dataClass.name,
      methodName,
      parameters,
      entityKey: this.entity._key
    });
  }

  public delete() {
    return EntityBaseService.delete({
      httpClient: this.httpClient,
      dataClassName: this.dataClass.name,
      entityKey: this.entity._key
    });
  }
}

export default EntityService;
