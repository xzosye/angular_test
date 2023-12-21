import { Component, ViewChild } from '@angular/core';
import { LogoutService } from '../logout.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // import AuthService
import Swal from 'sweetalert2';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  plotOptions: ApexPlotOptions;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  labels: any;
};




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any;
  public donutChartOptions: any;
  status = true;
  addToggle() {
    this.status = !this.status;
  }
  

  loggedInUsername: string = ''; // เพิ่ม property loggedInUsername

  isTaskPopupVisible: boolean = false;

  // Function to open the task assignment popup
  openTaskPopup() {
    this.isTaskPopupVisible = true;
    this.status = true; // ปิด sidebar
  }

  // Function to close the task assignment popup
  closeTaskPopup() {
    this.isTaskPopupVisible = false;
  }

  // Function to handle adding the task
  onSaveTask(taskData: any) {
    // Add your logic to save the task here
    // For example, you can perform an HTTP request to save the task to the server
    console.log('Task data:', taskData);

    // Then close the popup
    this.closeTaskPopup();
  }

  goToPerformance() {
    this.router.navigate(['/performance']);
  }

  // สร้างตัวแปรสำหรับเก็บสถานะการแสดง Add Member Popup
  isAddMemberPopupVisible: boolean = false;

  // ฟังก์ชันแสดง Add Member Popup
  showAddMemberPopup() {
    this.isAddMemberPopupVisible = true;
    this.status = true; // ปิด sidebar
  }

  // ฟังก์ชันปิด Add Member Popup
  closeAddMemberPopup() {
    this.isAddMemberPopupVisible = false;
  }

  // ฟังก์ชันเพิ่มสมาชิกใหม่
  onAddMember(newMember: any) {
    // ทำการเพิ่มสมาชิกใหม่ลงในตารางหรือฐานข้อมูลของคุณที่นี่
    // ตัวอย่างเพิ่มเติม: คุณสามารถส่งข้อมูล newMember ไปยัง Service หรือ Function ที่เกี่ยวข้องกับการเพิ่มสมาชิกใหม่ในระบบของคุณได้

    console.log('สมาชิกใหม่ที่ต้องเพิ่ม:', newMember);
  }
  

  constructor(
    private logoutService: LogoutService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.chartOptions = {
      series: [
        {
          name: "Assign",
          data: [3, 4, 5, 5, 4, 6, 6, 1, 4]
        },
        {
          name: "In progress",
          data: [5, 8, 10, 9, 7, 5, 6, 4, 7]
        },
        {
          name: "Completed",
          data: [5, 4, 6, 6, 4, 8, 5, 3, 4]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      title: {
        text: "Work Progress Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    };
    this.donutChartOptions = {

      series: [44, 55, 13],
      chart: {
        type: "donut"
      },
      labels: ["Assign", "In progress", "Completed"],
      title: {
        text: "Work Progress Chart"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
              
            }
          }
        }
      ]
    };
  }
  

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
