import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  $addEve: BehaviorSubject<string> = new BehaviorSubject("");
  $editEve: BehaviorSubject<number> = new BehaviorSubject(0);
  selectedMilli: Date = new Date();
  constructor() { }

  setAddEve(category: string) {
    this.$addEve.next(category);
  }
  getAddEve(): Observable<string> {
    return this.$addEve;
  }

  setEditEve(uniqueId: number) {
    this.$editEve.next(uniqueId);
  }
  getEditEve(): Observable<number> {
    return this.$editEve;
  }

  setSelectedMilli(d: Date) {
    this.selectedMilli = d;
  }
  getSelectedMilli(): Date {
    return this.selectedMilli ;
  }
}
