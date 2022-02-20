import { Component, OnInit } from '@angular/core';
import { MONTHS, WEEKDAYS } from '../resurces';
import { DbService } from '../db.service';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  Arr = Array;
  eves: Array<any> = [];
  dayEves: any = {};

  curDate: Date = new Date();
  curYear: number = 0;
  curMonth: number = 0;
  monthName: string = "";

  weekdays: Array<string> = WEEKDAYS;

  startday: number = 0;
  noOfDays: number = 0;

  dayDescVisi = false;
  selectedDate: number = 0;
  category: string = "";
  constructor(private db: DbService, private sup: SupportService) { }

  prevMonth() {
    if(this.curMonth == 0) {
      this.curMonth = 12;
      this.curYear--;
    }
    this.curMonth = (this.curMonth - 1) % 12;
    this.monthName = MONTHS[this.curMonth];
    this.setStartDay();
  }
  nextMonth() {
    if(this.curMonth == 11) this.curYear++;
    this.curMonth = (this.curMonth + 1) % 12;
    this.monthName = MONTHS[this.curMonth];
    this.setStartDay();
  }
  setStartDay() {
    let startDate: Date = new Date(this.curYear, this.curMonth, 1);
    this.startday = startDate.getDay();

    let monthIndex: number = this.curMonth;
    switch(monthIndex) {
      case 0: case 2: case 4: case 6: case 7: case 9: case 11:
        this.noOfDays = 31;
        break;
      case 3: case 5: case 8: case 10:
        this.noOfDays = 30;
        break;
      default:
        if(this.curYear % 4 == 0) this.noOfDays = 29;
        else this.noOfDays = 28;
    }
    this.getMonthlyEves();
  }
  getMonthlyEves() {
    this.db.table("eves").where("eveMilli").between(Date.parse(new Date(this.curYear, this.curMonth, 1) as any), Date.parse(new Date(this.curYear, this.curMonth, this.noOfDays) as any), true, true).toArray()
    .then(data => {
      this.dayEves = {};
      data.forEach(ele => {
        let d = new Date(ele.eveMilli as number);
        let date = d.getDate();
        if(this.dayEves[date]) this.dayEves[date].push(ele.category);
        else this.dayEves[date] = [ele.category];
      });
    })
    .catch(err => console.log(err.message));
  }

  dayDesc(day: number) {
    this.selectedDate = day;
    this.getAllEves();
  }

  addEve(eve: string) {
    let selectD: Date = new Date(this.curYear, this.curMonth, this.selectedDate);
    this.sup.setSelectedMilli(selectD);
    this.sup.setAddEve(eve);
  }
  editEve(uniqueId: number) {
    this.sup.setEditEve(uniqueId);
  }
  deleteEve(uniqueId: number, ind: number) {
    this.db.table("eves").delete(uniqueId)
    .then(data => this.eves.splice(ind, 1))
    .catch(err => console.log(err.message));
  }
  
  statusChange(uniqueId: number, newStatus: string, curStatus: string, ind: number) {
    if(newStatus !=  curStatus)
      this.db.table("eves").update(uniqueId, {status: newStatus})
      .then(data => this.eves[ind].status = newStatus)
      .catch(err => console.log(err.message));
  }

  getAllEves() {
    let openDate: Date = new Date(this.curYear, this.curMonth, this.selectedDate);
    this.db.table("eves").where("eveMilli").equals(Date.parse(openDate as any)).offset(0).toArray()
    .then(eves => {
      this.eves = eves;
      this.getMonthlyEves();
    })
    .catch(err => console.log(err.message));
  }
  ngOnInit(): void {
    this.db.openMyDB();

    this.curYear = this.curDate.getFullYear();
    this.curMonth = this.curDate.getMonth();
    this.monthName = MONTHS[this.curMonth];
    this.setStartDay();

    this.sup.getAddEve().subscribe(data => {
      this.category = data;
      this.getAllEves();
    });
    this.sup.getEditEve().subscribe(data => {
      if(data == 0) {
        this.category = '';
        this.getAllEves();
      }
    });
  }

}
