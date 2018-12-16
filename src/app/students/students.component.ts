import { Component, OnInit } from '@angular/core';

import { Student } from '../student'; //import nama class Student diluar folder
import { StudentService } from '../student.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {
  students: Student[];

  selectedStudent: Student;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }


  getStudents(): void {
    //asynchronus
    this.studentService.getStudents()
    .subscribe(students => this.students = students); //observable nya students
    //harus dimasukkan dalam properti heroes di file ini
  }

  add(name: string, nim: number): void {
    name = name.trim();
    
    if (!name) { 
      return; 
    } //jika value trim kosongan, maka langsung di return
    
    this.studentService.addStudent({ name, nim } as Student) // jika tidak kosong, maka masuk perintah ini
      .subscribe(student => {
        this.students.push(student);
      });

  }

  delete(student: Student): void {
    this.students = this.students.filter(h => h !== student);
    this.studentService.deleteStudent(student).subscribe();
  }


}
