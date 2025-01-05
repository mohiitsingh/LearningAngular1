import { Component,inject,Input  } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course/course.service';
import { Subscription } from 'rxjs';

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

  coursesSub !: Subscription;

  private courseService = inject(CourseService);

  ngOnInit(){
    this.courses = this.courseService.getCourses();
    this.coursesSub = this.courseService.courses.subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (e) => {
        console.log(e);
      }
    })
    // this.getCourses();
  }

  deleteCourse(course: Course){
    this.courseService.deleteCourse(course);
  }

  ngOnDestroy(){
    if(this.coursesSub) this.coursesSub.unsubscribe();
  }

  

}
