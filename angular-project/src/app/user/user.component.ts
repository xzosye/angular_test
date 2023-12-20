import { Component } from '@angular/core';
import { LogoutService } from '../logout.service';
import { AuthService } from '../auth.service'; // import AuthService
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  loggedInUsername: string = ''; // เพิ่ม property loggedInUsername
  showPopup: boolean = false; // เพิ่มตัวแปรเพื่อติดตามสถานะของ popup
  email: string = '';
  title: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  phoneNumber: string = '';
  emailAddress: string = '';

  // สร้างตัวแปรสำหรับเก็บข้อมูลงานใหม่
  taskName: string = '';
  taskDescription: string = '';
  assignerName: string = '';
  position: string = '';
  assigneeName: string = '';
  additionalPosition: string = '';
  startDate: string = '';
  endDate: string = '';

  // ตัวแปรเก็บสถานะการแสดง Popup
  isTaskPopupVisible: boolean = false;

  // ฟังก์ชันแสดง Popup สำหรับเพิ่มงาน
  showTaskPopup() {
    this.isTaskPopupVisible = true;
  }

  // ฟังก์ชันปิด Popup
  onCloseTaskPopup() {
    this.isTaskPopupVisible = false;
  }

  // ฟังก์ชันเพิ่มงานใหม่
  onSaveTask() {
    // ทำการเพิ่มรายการงานใหม่ลงในตารางหรือฐานข้อมูลของคุณที่นี่
    // ตัวอย่างเพิ่มเติม: คุณสามารถสร้างข้อมูลสำหรับตารางโดยใช้ตัวแปรที่เก็บข้อมูลงานใหม่ได้เช่น taskName, taskDescription, assignerName, position, assigneeName, additionalPosition, startDate, endDate
    console.log(
      'งานใหม่ที่ต้องเพิ่ม:',
      this.taskName,
      this.taskDescription,
      this.assignerName,
      this.position,
      this.assigneeName,
      this.additionalPosition,
      this.startDate,
      this.endDate
    );

    // เมื่อเพิ่มงานเสร็จสิ้น ปิด Popup
    this.isTaskPopupVisible = false;

    // แสดงข้อความหรือโชว์แจ้งเตือนอื่นๆ ตามความเหมาะสม
    // คุณอาจจะเพิ่มโค้ดเพื่อนำข้อมูลที่เพิ่มเข้าไปในตารางของคุณหรือฐานข้อมูล โดยใช้ HTTP Request หรือ Service ที่เกี่ยวข้องกับการจัดการข้อมูลของคุณ
  }

  goToPerformance() {
    this.router.navigate(['/performance']);
  }

  showSignupPopup() {
    this.showPopup = true;
  }

  closeSignupPopup() {
    this.showPopup = false;
  }

  submitSignup() {
    // ทำสิ่งที่ต้องการเมื่อกดปุ่มสมัครสมาชิก (เช่น เก็บข้อมูลที่ผู้ใช้ป้อน และส่งไปที่เซิร์ฟเวอร์)
    // เมื่อเสร็จสิ้นให้ปิด popup
    this.showPopup = false;
  }

  constructor(
    private logoutService: LogoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // ทำการกำหนดค่าให้กับ loggedInUsername เมื่อ Component เริ่มทำงาน
    this.loggedInUsername = this.authService.getUserPosition();
  }

  confirmLogout() {
    Swal.fire({
      title: 'คุณต้องการออกจากระบบหรือไม่?',
      text: 'คลิกยืนยันเพื่อออกจากระบบ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout(); // ทำการออกจากระบบเมื่อคลิก "ออกจากระบบ"
      } else {
        // ทำอะไรก็ตามหากผู้ใช้ยกเลิกการออกจากระบบ
      }
    });
  }

  logout() {
    // ทำการออกจากระบบ และแสดง SweetAlert2 ด้วยข้อความ "Logout สำเร็จ" ที่ต้องการ
    Swal.fire({
      icon: 'success',
      title: 'Logout สำเร็จ',
      text: 'คุณได้ออกจากระบบแล้ว',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      this.logoutService.logout();
    });
  }
}
