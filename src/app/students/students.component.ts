import { Component, OnInit } from '@angular/core';

import { Student } from '../student'; //import nama class Student diluar folder
import { StudentService } from '../student.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {
  students: Student[];
  // form: FormGroup;

  selectedStudent: Student;

  form = new FormGroup({
    gender: new FormControl(Validators.required),
  });

  constructor(private studentService: StudentService) {
    // this.form = fb.group({
    //   gender: ['', Validators.required]
    // });
  }


  ngOnInit() {
    this.getStudents();
  }


  getStudents(): void {
    //asynchronus
    this.studentService.getStudents()
      .subscribe(students => this.students = students); //observable nya students
    //harus dimasukkan dalam properti students di file ini
  }

  add(name: string, nim: number, alamat: string, jurusan: string, prodi: string, father: string, mother: string)
    : void {
    name = name.trim();
    alamat = alamat.trim();
    jurusan = jurusan.trim();
    prodi = prodi.trim();
    father = father.trim();
    mother = mother.trim();

    if (!name) {
      return;
    } //jika value trim kosongan, maka langsung di return
    // else if (!alamat) {
    //   return;
    // }
    // else if (!jurusan) {
    //   return;
    // }
    // else if (!prodi) {
    //   return;
    // }

    this.studentService.addStudent({ name, nim, alamat, jurusan, prodi } as Student) // jika tidak kosong, maka masuk perintah ini
      .subscribe(student => {
        this.students.push(student);
      });

  }

  delete(student: Student): void {
    this.students = this.students.filter(h => h !== student);
    this.studentService.deleteStudent(student).subscribe();
  }


}
