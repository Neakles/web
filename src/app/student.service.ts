import { Injectable } from '@angular/core';
// HTTP header untuk mengambil file di REST API berupa JSON
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs'; //asynchronus javascript
import { catchError, map, tap } from 'rxjs/operators'; //error handling

// import { Hero } from './hero';
// import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { Student } from './student';


//konstan ditaruh sebelum decorator
//httpoption untuk memberitahu apa tipe yang akan di option, yaitu JSON
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root' 
})
export class StudentService {

  private studentsUrl = 'api/students';  // URL to web api sebagai end point
  //ketika /heroes di akses dengan method API, maka akan keluar datanya

  constructor(
    private http: HttpClient, //inject HttpClient
    private messageService: MessageService
  ) { }
  //diatas adl dependency injection = inject service ke service yang lain

  /** GET students from the server */
  getStudents() : Observable<Student[]> {
    this.messageService.add('StudentService: fetched students');

    return this.http.get<Student[]>(this.studentsUrl)
      .pipe(
        tap(_ => this.log('fetched students')), //untuk meng asign isinya apa
        catchError(this.handleError('getStudents', []))
      );
    // return of(HEROES);
  }

  // getHeroes() : Hero[] {
  //   return HEROES;
  // }

  /** GET hero by id. Return `undefined` when id not found */
  getStudentNo404<Data>(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/?id=${id}`;
    return this.http.get<Student[]>(url)
      .pipe(
        map(students => students[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} student id=${id}`);
        }),
        catchError(this.handleError<Student>(`getStudent id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  /** GET hero by id. Will 404 if id not found */
  getStudent(id: number): Observable<Student> {

    const url = `${this.studentsUrl}/${id}`; //harus ada constant di dalam fungsi
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );

    //end point nanti ada ID nya => api/heroes/id
  }

  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  /* GET heroes whose name contains search term */
  searchStudents(term: string): Observable<Student[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Student[]>(`${this.studentsUrl}/?name=${term}`)
    .pipe(
      tap(_ => this.log(`found students matching "${term}"`)),
      catchError(this.handleError<Student[]>('searchStudents', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  //name pada heroes TS diubah ke model Hero, agar bisa dipakek di sini
  addStudent (student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, httpOptions)
    .pipe(
      tap(
        (student: Student) => this.log(`added student w/ id=${student.id}`)
        ),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteStudent (student: Student | number): Observable<Student> {
    //typeof untuk mengecek tipe data 
    const id = typeof student === 'number' ? student : student.id;
    const url = `${this.studentsUrl}/${id}`;

    return this.http.delete<Student>(url, httpOptions) //method delete API
    .pipe(
      tap(_ => this.log(`deleted student id=${id}`)), 
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  /** PUT: update the hero on the server */
  // update dipanggil di hero detail.ts
  updateStudent (student: Student): Observable<any> {
    return this.http.put(this.studentsUrl, student, httpOptions).pipe(
      tap(_ => this.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StudentService: ${message}`);
  }
  //${} manipulasi string biasa
  //kalau di typescript bermasalah jika string harus ke string juga
}
