import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {

  opened: boolean = false;

  //eves: Dexie.Table<IEve, string>;
  constructor() {
    super("Eve");
    this.version(1).stores({
        eves: "uniqueId, eveMilli, category"
    });
  }

  openMyDB() {
    if(!this.opened)
      this.open()
      .then(data => this.opened = true)
      .catch(err => console.log(err.message));
  }
}

export interface IEve {
  uniqueId: string,
  eveMilli: string,
  category: string
}