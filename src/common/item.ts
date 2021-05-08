import { immerable } from 'immer';
import {v4 as uuidV4} from 'uuid';


export class Item {
    uuid: string;
    [immerable]: boolean = true;
    
    constructor() {
        this.uuid = uuidV4();
    }
}