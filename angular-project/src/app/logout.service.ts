// logout.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private router: Router) {}

  logout() {
    // ส่วนการ logout ควรปรับแก้ให้สอดคล้องกับการทำงานของแอปพลิเคชันของคุณ
    // ตัวอย่างเช่น clear session, clear local storage, เปลี่ยนสถานะผู้ใช้งาน, แล้ว navigate ไปหน้า Login หรือหน้าอื่นๆ
    // ตัวอย่าง: หากคุณต้องการกลับไปหน้า Login ให้ใช้ router.navigate(['/login']);
    this.router.navigate(['/login']);
  }
}
