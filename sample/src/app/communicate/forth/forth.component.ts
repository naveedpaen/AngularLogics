import { Component, OnInit } from '@angular/core';
import { of, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class StudentVM {
  id: number;
  name: string;
}

@Component({
  selector: 'app-forth',
  templateUrl: './forth.component.html',
  styleUrls: ['./forth.component.css'],
})
export class ForthComponent {
  // Method 1
  studendObj: StudentVM;
  studentsList: StudentVM[] = [];

  father : string;
  teacher: any;
  teacherList:any;

  name: string;
  id: number;
  age = 0;
  address = '';
  file = '';
  password = '';
  radio = 0;
  description = '';
  male = '';
  female = '';
  select = '';
  matrix: string = '';
  fscs = '';
  bsc = '';
  no = '';
  date = '';

  constructor() {}

  ngOnInit() {
    // Method 1
    this.studendObj = new StudentVM();
    this.studendObj.id = 1;
    this.studendObj.name = 'Asif';

    const st = new StudentVM();
    st.id = 2;
    st.name = 'Naveed Ullah';

    let st2 = new StudentVM();
    st2.id = 3;
    st2.name = 'Zeeshan';

    this.studentsList.push(this.studendObj);
    this.studentsList.push(st);
    this.studentsList.push(st2);


    // this.studentsList.splice(1, 1);





    // Method 2
    this.teacher = { "id": 2, "name": 'Sir Junaid', "FatherName": "Asif" };
    this.teacherList = [
      { "id": 20, "name": 'Sir Junaid' },
      { "id": 21, "name": 'Sir Mehmood' },
      { "id": 22, "name": 'Sir Ahmad' }
    ]
  }

  save() {
    let stu : any = {"Id": 1, "Name": "Khan"}


  }

  delete(stuId:number) {
const deff = this.studentsList[0];
const deff2 = this.studentsList[0].id;
const deff3 = this.studentsList[0].name;


  const index =  this.studentsList.findIndex(item => item.id === stuId);
  const obj = this.studentsList.find(item => item.id === stuId);
  const obj2 = this.studentsList.filter(item => item.id === stuId);
  
  const lenthTotal =  this.studentsList.length;

for (let index = 0; index < this.studentsList.length; index++) {
      if (this.studentsList[index].id === stuId) {
        this.studentsList.splice(index,1);
        this.studentsList[0].name = "Qasim";
      }    


}


  //this.studentsList.splice(index,1);


    // not good
   //const ind =    this.studentsList.indexOf(stuObj);
   //this.studentsList.splice(ind,1);

    // best method
   // this.studentsList.splice(ind,1);
  }

  saveUser() {
    debugger;

    let abc = new  StudentVM()
   // abc.id =+ this.id;
    abc.id = Number(this.id);
    abc.name= this.name;


    this.studentsList.push(abc)
    abc = null;
    this.id= null;
    this.name= "";
  }
}
