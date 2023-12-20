import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service'; // import AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  submitted = false;
  position = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.http
      .post<any>('http://localhost/backend/login.php', loginData)
      .subscribe(
        (response) => {
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'เข้าสู่ระบบสำเร็จ',
              text: response.message,
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              this.authService.setUserPosition(response.position); // เก็บค่าสิทธิ์ลงใน AuthService
              this.redirectBasedOnPosition();
              console.log(response.position);
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'เข้าสู่ระบบไม่สำเร็จ',
              text: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
            showConfirmButton: false,
            timer: 1500,
          });
          console.error(error);
        }
      );
  }

  redirectBasedOnPosition() {
    const userPosition = this.authService.getUserPosition();
    switch (userPosition) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'manager':
        this.router.navigate(['/manager']);
        break;
      case 'user':
        this.router.navigate(['/user']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}
