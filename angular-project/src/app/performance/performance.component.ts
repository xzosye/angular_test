import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // import AuthService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css'],
})
export class PerformanceComponent {

  status = true;
  addToggle() {
    this.status = !this.status;
  }
  
  loggedInUsername: string = ''; // เพิ่ม property loggedInUsername

  tasks: any[] = [];

  newTask: any = {
    taskName: '',
    // เพิ่มฟิลด์อื่น ๆ ที่ต้องการสร้างงานใหม่
  };

  constructor(
    private logoutService: LogoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ทำการกำหนดค่าให้กับ loggedInUsername เมื่อ Component เริ่มทำงาน
    this.loggedInUsername = this.authService.getUserPosition();

    // ดึงรายการงานจาก Backend และกำหนดให้กับ this.tasks
    this.tasks = [
      // ข้อมูลตัวอย่าง (คุณควรแทนที่ด้วยข้อมูลจริงที่ดึงมาจาก Backend)
      {
        assignedBy: 'John Doe',
        taskName: 'Task 1',
        taskDuration: '3 days',
        assignedTo: 'Alice',
        status: 'In Progress',
      },
      {
        assignedBy: 'Jane Smith',
        taskName: 'Task 2',
        taskDuration: '1 week',
        assignedTo: 'Bob',
        status: 'Completed',
      },
    ];
  }

  // เมทอดสำหรับเพิ่มงานใหม่
  addTask() {
    // ส่งข้อมูลงานใหม่ไปยัง Backend เพื่อบันทึก
    console.log('Adding new task:', this.newTask);
    // เพิ่มโค้ดส่งข้อมูลไปยัง Backend ที่นี่
  }

  // เมทอดสำหรับแก้ไขงาน
  editTask(task: any) {
    // ส่งข้อมูลงานที่ต้องการแก้ไขไปยังหน้าแก้ไข
  }

  // เมทอดสำหรับลบงาน
  deleteTask(task: any) {
    // ส่งคำขอลบงานไปยัง Backend
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
