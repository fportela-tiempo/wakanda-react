import AbstractService from './abstract-service';
import Entity from '../../presentation/entity';
import { DataClass } from '../../presentation/dataclass';
import { IEntityDBO } from '../../business/entity-business';
import WakandaClient from '../../wakanda-client';
declare class EntityService extends AbstractService {
    private entity;
    private dataClass;
    constructor({wakJSC, entity, dataClass}: {
        wakJSC: WakandaClient;
        entity: Entity;
        dataClass: DataClass;
    });
    save(data: IEntityDBO, expand: string): Promise<IEntityDBO>;
    recompute(data: IEntityDBO): Promise<IEntityDBO>;
    callMethod(methodName: string, parameters: any[]): Promise<any>;
    delete(): Promise<boolean>;
}
export default EntityService;
