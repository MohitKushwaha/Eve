import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-add-eve',
  templateUrl: './add-eve.component.html',
  styleUrls: ['./add-eve.component.scss']
})
export class AddEveComponent implements OnInit {

  category: string = "";
  editEve: Object = {};
  editToken: boolean = false;

  attendee: Array<{name: string, email: string}> = [];
  checklist: Array<string> = [];
  constructor(private db: DbService,private sup: SupportService) { }

  checklistAdd() {
    this.checklist.push("");
  }
  checklistChange(eve: any, ind: any) {
    this.checklist[ind] = eve.target.value;
  }
  checklistDelete(ind: any) {
    this.checklist.splice(ind, 1);
  }

  attendeeAdd() {
    this.attendee.push({name: "", email: ""});
  }
  attendeeChange(eve: any, ind: any, field: string) {
    if(field == "name") this.attendee[ind].name = eve.target.value;
    else this.attendee[ind].email = eve.target.value;
  }
  attendeeDelete(ind: any) {
    this.attendee.splice(ind, 1);
  }


  closeCateg() {
    this.sup.setAddEve('');
    try {
      (document.getElementById("title") as HTMLInputElement).value = "";
      (document.getElementById("start-t") as HTMLInputElement).value = "";
      (document.getElementById("end-t") as HTMLInputElement).value = "";
      (document.getElementById("venue") as HTMLTextAreaElement).value = "";
    } catch(err: any) {
      console.log(err.message);
    }
  }

  saveMeet() {
    let title: string = (document.getElementById("title") as HTMLInputElement).value;
    let startTime: string = (document.getElementById("start-t") as HTMLInputElement).value;
    let endTime: string = (document.getElementById("end-t") as HTMLInputElement).value;
    let venue: string = (document.getElementById("venue") as HTMLTextAreaElement).value;

    this.db.table("eves").put({uniqueId: Date.now(), eveMilli: Date.parse(this.sup.getSelectedMilli() as any), category: "meeting", title: title, startTime: startTime, endTime: endTime, venue: venue, status: "pending", checklist: this.checklist, attendee: this.attendee})
    .then(data => this.closeCateg())
    .catch(err => console.log(err.message));
  }
  saveEve() {
    let title: string = (document.getElementById("title") as HTMLInputElement).value;
    let startTime: string = (document.getElementById("start-t") as HTMLInputElement).value;
    let endTime: string = (document.getElementById("end-t") as HTMLInputElement).value;
    let venue: string = (document.getElementById("venue") as HTMLTextAreaElement).value;

    this.db.table("eves").put({uniqueId: Date.now(), eveMilli: Date.parse(this.sup.getSelectedMilli() as any), category: "event", title: title, startTime: startTime, endTime: endTime, venue: venue, status: "pending", checklist: this.checklist})
    .then(data => this.closeCateg())
    .catch(err => console.log(err.message));
  }
  saveBirth() {
    let title: string = (document.getElementById("title") as HTMLInputElement).value;

    this.db.table("eves").put({uniqueId: Date.now(), eveMilli: Date.parse(this.sup.getSelectedMilli() as any), category: "birthday", title: title, status: "pending"})
    .then(data => this.closeCateg())
    .catch(err => console.log(err.message));
  }
  saveRemind() {
    let title: string = (document.getElementById("title") as HTMLInputElement).value;

    this.db.table("eves").put({uniqueId: Date.now(), eveMilli: Date.parse(this.sup.getSelectedMilli() as any), category: "reminder", title: title, status: "pending", checklist: this.checklist})
    .then(data => this.closeCateg())
    .catch(err => console.log(err.message));
  }
  updMeet() {
    let title: string = (document.getElementById("title") as HTMLInputElement).value;
    let startTime: string = (document.getElementById("start-t") as HTMLInputElement).value;
    let endTime: string = (document.getElementById("end-t") as HTMLInputElement).value;
    let venue: string = (document.getElementById("venue") as HTMLTextAreaElement).value;

    this.db.table("eves").update((this.editEve as any).uniqueId, {eveMilli: (this.editEve as any).eveMilli, category: "meeting", title: title, startTime: startTime, endTime: endTime, venue: venue, status: (this.editEve as any).status, checklist: this.checklist, attendee: this.attendee})
    .then(data => this.closeCateg())
    .catch(err => console.log(err.message));
  }
  updEve() {
    let title: string = (document.getElementById("title") as HTMLInputElement).value;
    let startTime: string = (document.getElementById("start-t") as HTMLInputElement).value;
    let endTime: string = (document.getElementById("end-t") as HTMLInputElement).value;
    let venue: string = (document.getElementById("venue") as HTMLTextAreaElement).value;

    this.db.table("eves").update((this.editEve as any).uniqueId, {eveMilli: (this.editEve as any).eveMilli, category: "event", title: title, startTime: startTime, endTime: endTime, venue: venue, status: (this.editEve as any).status, checklist: this.checklist})
    .then(data => this.closeCateg())
    .catch(err => console.log(err.message));
  }
  updBirth() {
    let title: string = (document.getElementById("title") as HTMLInputElement).value;

    this.db.table("eves").update((this.editEve as any).uniqueId, {eveMilli: (this.editEve as any).eveMilli, category: "birthday", title: title, status: (this.editEve as any).status})
    .then(data => this.closeCateg())
    .catch(err => console.log(err.message));
  }
  updRemind() {
    let title: string = (document.getElementById("title") as HTMLInputElement).value;

    this.db.table("eves").update((this.editEve as any).uniqueId, {eveMilli: (this.editEve as any).eveMilli, category: "reminder", title: title, status: (this.editEve as any).status, checklist: this.checklist})
    .then(data => this.closeCateg())
    .catch(err => console.log(err.message));
  }

  ngOnInit(): void {
    //subscribe for changes in 'add event' token from service
    this.sup.getAddEve().subscribe(data=> {
      this.category = data;
      this.editToken = false;
      this.attendee = [];
      this.checklist = [];
    });

    //subscribe for changes in 'edit event' token from service
    this.sup.getEditEve().subscribe(data => {
      if(data > 0) {
        this.editToken = true;
        this.category = "meeting";
        this.db.table("eves").get(data)
        .then(data => {
          this.editEve = data;
          this.category = (this.editEve as any).category;
          (document.getElementById("title") as HTMLInputElement).value = (this.editEve as any).title;
          try {
            (document.getElementById("start-t") as HTMLInputElement).value = (this.editEve as any).startTime;
            (document.getElementById("end-t") as HTMLInputElement).value = (this.editEve as any).endTime;
            (document.getElementById("venue") as HTMLTextAreaElement).value = (this.editEve as any).venue;
          } catch(err: any) {
            console.log(err.message);
          }
          try {
            this.checklist = (this.editEve as any).checklist;
            this.attendee = (this.editEve as any).attendee;
          } catch(err: any) {
            console.log(err.message);
          }
        })
        .catch(err => console.log(err.message));
      }
    })
  }

}
