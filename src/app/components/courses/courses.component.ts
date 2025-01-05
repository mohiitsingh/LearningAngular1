import { Component,inject,Input  } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  
  // @Input() courses: any;
  courses : Course[] = [];
  @Input() isAdmin = false;

  private courseService = inject(CourseService);

  ngOnInit(){
    this.courses = this.courseService.getCourses();
    // this.getCourses();
  }

  

}
