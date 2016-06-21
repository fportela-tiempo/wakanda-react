import HttpClient from '../../http/http-client';
import {IDataClassDBO} from '../../../business/catalog-business';

export class CatalogBaseService {

  public static get({httpClient, dataClasses}: {httpClient: HttpClient, dataClasses?: string|string[]}) {
    let strDataclasses = '/';

    if (Array.isArray(dataClasses)) {
      strDataclasses += dataClasses.join();
    }
    else if (typeof dataClasses === 'undefined') {
      strDataclasses += '$all';
    }
    else {
      throw new Error('Catalog.get: first parameter should be an array');
    }

    return httpClient.get({uri: '/$catalog' + strDataclasses})
      .then(res => {
        let catalog: IDataClassDBO[] = [];
        let rawObj = JSON.parse(res.body);

        for (let d of rawObj.dataClasses) {

          let attributes: any[] = [];
          if (d.attributes) { //Seriously? :)
            for (let attr of d.attributes) {
              attributes.push({
                name: attr.name,
                kind: attr.kind,
                type: attr.type,
                readOnly: attr.readOnly
              });
            }
          }

          let methods: any[] = [];
          if (d.methods) {
            for (let m of d.methods) {
              methods.push({
                name: m.name,
                applyTo: m.applyTo
              });
            }
          }

          catalog.push({
            name: d.name,
            collectionName: d.collectionName,
            attributes,
            methods
          });
        }

        return catalog;
      });
  }
}
