import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  
  @Input() courses: any;
  @Input() isAdmin = false;
  @Output() del = new EventEmitter();

  deleteCourse(course: any){
    this.del.emit(course)
  }

}
