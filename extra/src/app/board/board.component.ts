import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  displayPopUp: boolean;
  detailHeader: string;
  detaildesc: string;

  toDoList: any[] = [
    { Id: 1, Grades: 'Ceate Logo' ,       Description: 'this task is important'  },
    { Id: 2, Grades: 'Write Services' ,   Description: 'should do it in time'    },
    { Id: 3, Grades: 'Delete Db',         Description: 'Not Very important'      },
    { Id: 11, Grades: 'Ceate Logo' ,       Description: 'this task is important'  },
    { Id: 21, Grades: 'Write Services' ,   Description: 'should do it in time'    },
    { Id: 31, Grades: 'Delete Db',         Description: 'Not Very important'      },
  ];



  inProgressList: any[] = [
    { Id: 4, Grades: 'Write Repository' , Description: 'this task is important'     },
    { Id: 5, Grades: 'Deployment'       , Description: 'should do it in time'       },
    { Id: 6, Grades: 'make services'    , Description: 'Not Very important'         },
  ];


  delayList: any[] = [
    { Id: 7, Grades: 'Write APIs',  Description: 'this task is important'  },
    { Id: 8, Grades: 'Get Data' ,   Description: 'should do it in time'     },
    { Id: 9, Grades: 'Get data' ,   Description: 'Not Very important'        },
    { Id: 81, Grades: 'Get Information' ,   Description: 'should do it in time'     },
    { Id: 91, Grades: 'Insert Data' ,   Description: 'Not Very important'        },
  ];


  DoneList: any[] = [
    { Id: 10, Grades: 'Include Bootstrap' , Description: 'this task is important'  },
    { Id: 11, Grades: 'Exclude data'    ,  Description: 'should do it in time'    },
    { Id: 13, Grades: 'Use Materiak'   ,   Description: 'Not Very important'       },
  ];

  draggedvalue: any[];
  type: string;

  constructor() { }

  ngOnInit() {
    // this.selectedValues = [];

  }

  dragStart(abc, item, type: string) {
    this.draggedvalue = item;
    this.type = type;
  }




  drop( task: string) {
    if (task === 'toDo') {
      if (this.type === 'toDo') {
      } else if (this.type === 'inProgress') {
        this.inProgressList.splice(this.inProgressList.indexOf(this.draggedvalue), 1);
        this.toDoList.push(this.draggedvalue);
      } else if (this.type === 'delay') {
        this.delayList.splice(this.delayList.indexOf(this.draggedvalue), 1);
        this.toDoList.push(this.draggedvalue);
      } else if (this.type === 'done') {
        this.DoneList.splice(this.DoneList.indexOf(this.draggedvalue), 1);
        this.toDoList.push(this.draggedvalue);
      }

    } else if (task === 'inProgress') {
      if (this.type === 'toDo') {
        this.toDoList.splice(this.toDoList.indexOf(this.draggedvalue), 1);
        this.inProgressList.push(this.draggedvalue);
      } else if (this.type === 'inProgress') {
      } else if (this.type === 'delay') {
        this.delayList.splice(this.delayList.indexOf(this.draggedvalue), 1);
        this.inProgressList.push(this.draggedvalue);
      } else if (this.type === 'done') {
        this.DoneList.splice(this.DoneList.indexOf(this.draggedvalue), 1);
        this.inProgressList.push(this.draggedvalue);
      }

    } else if (task === 'delay') {
      if (this.type === 'toDo') {
        this.toDoList.splice(this.toDoList.indexOf(this.draggedvalue), 1);
        this.delayList.push(this.draggedvalue);
      } else if (this.type === 'inProgress') {
        this.inProgressList.splice(this.inProgressList.indexOf(this.draggedvalue), 1);
        this.delayList.push(this.draggedvalue);
      } else if (this.type === 'delay') {
      } else if (this.type === 'done') {
        this.DoneList.splice(this.DoneList.indexOf(this.draggedvalue), 1);
        this.delayList.push(this.draggedvalue);
      }

    } else if (task === 'done') {
      if (this.type === 'toDo') {
        this.toDoList.splice(this.toDoList.indexOf(this.draggedvalue), 1);
        this.DoneList.push(this.draggedvalue);
      } else if (this.type === 'inProgress') {
        this.inProgressList.splice(this.inProgressList.indexOf(this.draggedvalue), 1);
        this.DoneList.push(this.draggedvalue);
      } else if (this.type === 'delay') {
        this.delayList.splice(this.delayList.indexOf(this.draggedvalue), 1);
        this.DoneList.push(this.draggedvalue);
      } else if (this.type === 'done') {
      }
    }
  }



  abc(item) {

    this.detailHeader = item.Grades;
    this.detaildesc = item.Description;
    this.displayPopUp = true;
  }


  hidePopUp() {
 this.displayPopUp = false;
  }

  // drop2(event,  task: string) {
  //   debugger;
  //   if (task === 'toDo') {
  //     this.listOne.splice(this.listOne.indexOf(this.draggedvalue), 1);
  //     this.listTwo.push(this.draggedvalue);

  //   } else if (task === 'inProgress') {
  //     this.listTwo.splice(this.listTwo.indexOf(this.draggedvalue), 1);
  //     this.listOne.push(this.draggedvalue);
  //   }
  // }


  // drop3(event,  task: string) {
  //   debugger;
  //   if (task === 'toDo') {
  //     this.listOne.splice(this.listOne.indexOf(this.draggedvalue), 1);
  //     this.listTwo.push(this.draggedvalue);

  //   } else if (task === 'inProgress') {
  //     this.listTwo.splice(this.listTwo.indexOf(this.draggedvalue), 1);
  //     this.listOne.push(this.draggedvalue);
  //   }
  // }



  // drop4(event,  task: string) {
  //   debugger;
  //   if (task === 'toDo') {
  //     this.listOne.splice(this.listOne.indexOf(this.draggedvalue), 1);
  //     this.listTwo.push(this.draggedvalue);

  //   } else if (task === 'inProgress') {
  //     this.listTwo.splice(this.listTwo.indexOf(this.draggedvalue), 1);
  //     this.listOne.push(this.draggedvalue);
  //   }
  // }



}
