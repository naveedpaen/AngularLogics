import { Component, OnInit } from '@angular/core';
import { log, timeStamp } from 'console';
import { StudentVM } from 'src/app/communicate/forth/forth.component';
export class teacher {
  Id: number;
  name: string;
}

interface student {
  Id: number;
  name: string;
  age: number;
  isMarried?: boolean;
}

interface student2 {
  Id: number;
  name: string;
  age: number;
}

interface student3 {
  fName: string;
  age: number;
}

interface user {
  Id: number;
  name: string;
}
@Component({
  selector: 'app-savepage',
  templateUrl: './savepage.component.html',
  styleUrls: ['./savepage.component.css'],
})
export class SavepageComponent implements OnInit {
  kv1: student = { name: 'Steve' } as student;
  tea: teacher;

  class2: student[] = [
    { Id: 4, name: 'khan', age: 5 },
    { Id: 1, name: 'Zeeshan', age: 40 },
    { Id: 2, name: 'Asif', age: 50 },
    { Id: 3, name: 'Junaid', age: 60 },
  ];

  user: user = {} as Required<user>;
  user2: user = {} as user;
  age: number;

  class1: student[] = [
    { Id: 1, name: 'Naveed Ullah', age: 30, isMarried: true },
    { Id: 2, name: 'Ahmad', age: 5, isMarried: false },
    { Id: undefined, name: 'babar', age: 20, isMarried: true },
    { Id: 4, name: 'Ali', age: 10, isMarried: true },
    { Id: 5, name: '', age: 0, isMarried: true },
  ];

  constructor() {}
  ngOnInit(): void {
    //  A && B && C || D
    let a = true;
    let b = true;
    let c: boolean = false;
    let d = true;

    debugger;
    // make sure to put parenthesis to high precedence first then medium and then lower.
    // best
    if ((a && b && c) || d) {
      alert('true 1');
    }

    // wrong answer
    if (a && b && (c || d)) {
      alert('true 2');
    }

    // wrong answer
    if ((a && b && c) || d) {
      alert('true 3');
    }

    //////////////////////////////////////////////////////////////

    //-----   OR operators
    if (false || false) {
      // result. false
      alert('I got true');
    }

    if (true || true) {
      // result. false
      alert('I got true');
    }

    if (true || false) {
      // result. false
      alert('I got true');
    }

    if (false || true) {
      // result. false
      alert('I got true');
    }

    if (true || true || false) {
      // result. true
      alert('I got true');
    }

    if (true || true || true) {
      // result. true
      alert('I got true');
    }

    if (false || false || false) {
      // result. true
      alert('I got true');
    }

    if (false || false || true) {
      // result. false
      alert('I got true');
    }

    //-----   AND operator
    if (false && false) {
      // result. false
      alert('I got true');
    }

    if (true && true) {
      // result. true
      alert('I got true');
    }

    if (true && false) {
      // result. false
      alert('I got true');
    }

    if (false && true) {
      // result. false
      alert('I got true');
    }

    if (true && true && false) {
      // result. false
      alert('I got true');
    }

    if (true && true && true) {
      // result. true
      alert('I got true');
    }

    if (false && false && false) {
      // result. false
      alert('I got true');
    }

    if (false && false && true) {
      // result. false
      alert('I got true');
    }

    ///////////////////////////////////////////////////

    //-----   AND-OR Mixed
    if ((false && false) || true) {
      // result. true
      alert('True');
    }

    if ((true && false) || true) {
      // result. true
      alert('True');
    }

    if ((false && false && true) || false) {
      // result. false
      alert('True ');
    }

    if ((false && true && true) || false) {
      // result. false
      alert('True');
    }

    if ((false && false && false) || true) {
      // result. true
      alert('True');
    }
    if (false || true || (false && true && false)) {
      // alert('True')
    }

    // new
    if (false || false || true) {
      // result. true
      alert('True');
    }

    if (true || false || true) {
      // result. true
      alert('True');
    }

    if (false || (false && true) || false) {
      // result. false
      alert('True ');
    }

    if (false || (true && true) || false) {
      // result. false
      alert('True');
    }

    if (false || (false && false) || true) {
      // result. true
      alert('True');
    }

    const zzz = this.class1.filter((x) => {
      return true;
      // return true || false && false
      // return x.isMarried || x.age && x.name && x.Id ==220 // why 5 records
      //     return  x.name && x.Id && x.isMarried || x.age // why 4 recods

      // true and true and false
    });

    debugger;
    //  .filter(x => {
    //   return  x.isMarried || x.age
    // })

    const xxx = this.class1.find((x) => {
      return x.name != '';
    });

    if (zzz) {
      //  alert(zzz.length)
    }
  }

  //  let aaa: number;
  //  const bbb = undefined; // Errorn
  //  const ccc : number = -1;
  //  const ddd : boolean = false;
  //  const eee : string = '';
  //  const fff = null ;
  //  const ggg : string = 'ggg';

  //  const ddd53 =  this.isValid(eee);

  // const ddd1 =  this.isValid(aaa);
  // const ddd2 =  this.isValid(bbb);
  // const ddd3 =  this.isValid(ccc);
  // const ddd4 =  this.isValid(ddd);
  // const ddd5 =  this.isValid(eee);
  // const ddd6 =  this.isValid(fff);
  // const ddd63 =  this.isValid(ggg);
  //   }

  // for (let value2 of this.class2) {
  //   console.log(value2.name)
  //   if (value2?.age == 5) {
  //     alert(value2.age)
  //     break
  //   }
  // }

  // for (let value1 of this.class1) {
  //   for (let value2 of this.class2) {
  //     console.log(value2.name)
  //     if (value1.age == value2.age) {
  //       alert(value1.age)
  //       break
  //     }
  //   }
  // }

  // this.class1.forEach((x) => {
  //   const obj = this.class2.find(x2 => {
  //   return  x2.age == x.age;
  //   });
  //   if (obj) {
  //     // set a new value to first list
  //     obj.age = 99;

  //     // set a new value to second list
  //     x.age = 199;
  //   }
  // });
  // }

  get fees() {
    return 100 + 20;
  }

  isValid(e) {
    if (typeof e == 'string') e = e.trim();
    switch (e) {
      case '':
      case 0:
      case -1:
      case '0':
      case null:
      case false:
      case 'false':
      case NaN:
      case 'NaN':
      case undefined:
      case typeof e == 'undefined':
        return false;
      default:
        return true;
    }
  }

  getById() {
    const person4: Partial<teacher> = {
      //  another way is to use partial class
      Id: 3,
    };

    const obj = {
      name: 'Naveed',
    } as student;

    const obj2 = <student>{
      name: 'Naveed',
    };

    const obj5 = <teacher>{
      name: 'Sir bashir',
    };

    const obj6 = {
      name: 'Sir bashir',
    } as teacher;
    this.tea = obj6;

    this.tea = <teacher>{
      name: 'Sir bashir',
    };

    this.tea = {
      name: 'Sir bashir',
    } as teacher;
  }
}
