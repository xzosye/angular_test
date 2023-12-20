import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const registerData = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      position: this.registerForm.value.position,
    };

    this.http
      .post<any>('http://localhost/backend/register.php', registerData)
      .subscribe(
        (response) => {
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'การลงทะเบียนสำเร็จ',
              text: 'ตอนนี้คุณสามารถเข้าสู่ระบบด้วยข้อมูลประจำตัวของคุณ',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              this.router.navigate(['/login']); // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบหลังการลงทะเบียนสำเร็จ
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'การลงทะเบียนไม่สำเร็จ',
              text: response.message,
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'บางอย่างผิดพลาด. กรุณาลองใหม่อีกครั้งในภายหลัง.',
          });
          console.error(error);
        }
      );
  }
}
