import AbstractService from './abstract-service';
import { QueryOption } from '../../presentation/query-option';
import { DataClass } from '../../presentation/dataclass';
import { IEntityDBO } from '../../business/entity-business';
import { ICollectionDBO } from '../../business/collection-business';
import WakandaClient from '../../wakanda-client';
declare class DataClassService extends AbstractService {
    private dataClass;
    constructor({wakJSC, dataClass}: {
        wakJSC: WakandaClient;
        dataClass: DataClass;
    });
    find(id: string | number, options: QueryOption): Promise<IEntityDBO>;
    query(options: QueryOption): Promise<ICollectionDBO>;
    callMethod(methodName: string, parameters: any[]): Promise<any>;
}
export default DataClassService;
