import { Component, OnInit, Input } from '@angular/core';
// import { Hero } from '../hero';
// import { HeroService } from '../hero.service';

import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  students: Student[] = [];

  @Input() page: number; //the current page
  @Input() count: number;
  @Input() perPage: number;
  @Input() pageToShow: number;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
    // this.getStudents2();
  }

  ngOnChange() {
    this.getStudents2();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students.slice(0, 10));
  }

  getStudents2(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students.slice(10, 20));
  }
}