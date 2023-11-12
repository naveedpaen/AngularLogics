export interface BookModel {
  id: number;
  name: string; // textbox
  pages: number; // number
  availability: boolean; // radio
  translations: number[]; // Checkbox
  category: number; // DD
}

export interface StudentModel {
  id: number;
  name: string;
  age: number;
  gender: boolean;
  sports: number[];
  city: number;
}
