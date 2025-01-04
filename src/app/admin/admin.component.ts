import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CoursesComponent } from '../components/courses/courses.component';
import { Strings } from '../enum/strings.enum';

@Component({
  selector: 'app-admin',
  imports: [FormsModule,CoursesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent  {
  model: any = {};
  cover!: string;
  cover_file: any;
  showError = false;
  courses: any[] = [];

  ngOnInit(){
    this.getCourses();
  }

  getCourses(){
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    console.log(data);
    if(data)
      this.courses = JSON.parse(data);
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cover_file = file;

      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        const dataUrl = reader.result!.toString();
        this.cover = dataUrl;
        console.log('image', this.cover);
      };
      reader.readAsDataURL(file);
      this.showError= false;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.cover) {
      console.log('form invalid');
      form.control.markAllAsTouched();
      if(!this.cover){
        this.showError = true;
      }
      return;
    }

    console.log(form.value);
    this.saveCourse(form.value);
  }

  saveCourse(formValue: any){
    console.log(formValue);
    
    const data = {
      ...formValue,
      image: this.cover,
      id: this.courses.length + 1
    }
    
    this.courses = [...this.courses, data];
    localStorage.setItem(Strings.STORAGE_KEY,JSON.stringify(this.courses));

  }

}
