import AbstractService from './abstract-service';
import Collection from '../../presentation/collection';
import { DataClass } from '../../presentation/dataclass';
import { QueryOption } from '../../presentation/query-option';
import { ICollectionDBO } from '../../business/collection-business';
import WakandaClient from '../../wakanda-client';
declare class CollectionService extends AbstractService {
    private collection;
    private dataClass;
    private collectionUri;
    private isEntitySet;
    constructor({wakJSC, collection, dataClass, collectionUri}: {
        wakJSC: WakandaClient;
        collection: Collection;
        dataClass: DataClass;
        collectionUri: string;
    });
    fetch(options: QueryOption): Promise<ICollectionDBO>;
    callMethod(methodName: string, parameters: any[]): Promise<any>;
}
export default CollectionService;
