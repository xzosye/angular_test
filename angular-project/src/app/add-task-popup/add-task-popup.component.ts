import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';  // นำเข้า DatePipe
import Swal from 'sweetalert2'; // นำเข้า SweetAlert2

@Component({
  selector: 'app-add-task-popup',
  templateUrl: './add-task-popup.component.html',
  styleUrls: ['./add-task-popup.component.css'],
  providers: [DatePipe], // เพิ่ม DatePipe เป็น Providers
})
export class AddTaskPopupComponent {
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  departments: any[] = []; // ตัวแปรเพื่อเก็บข้อมูลแผนก
  levels: any[] = []; // ตัวแปรเพื่อเก็บข้อมูลระดับ
  users: any[] = []; // เพิ่มตัวแปร users เพื่อเก็บข้อมูลผู้ใช้งาน

  assignments: any[] = [
    {
      assignedTo: null,
      departId: null,
      levelId: null,
    },
  ];

  addAssignment() {
    this.assignments.push({
      assignedTo: '', // เปลี่ยนเป็นค่าว่าง
      departId: null,
      levelId: null,
    });
  }

  removeAssignment(index: number) {
    this.assignments.splice(index, 1);
  }

  form!: FormGroup; // สร้าง FormGroup

  taskData: any = {
    taskName: '',
    emailContent: '',
    assignedBy: '',
    startDate: '',
    endDate: '',
    status: '',
    email: '',
    taskFiles: '',
  };

  assignment: any = {
    departId: '',
    levelId: '',
    assignedTo: '',
  };

  ngOnInit(): void {
    // เรียกใช้งานฟังก์ชันเพื่อดึงรายการแผนกและระดับ
    this.getDepartments();
  }

  // ฟังก์ชันเรียกข้อมูลแผนก
  getDepartments() {
    this.http
      .get<any[]>('http://localhost/backend/depart_tbl.php')
      .subscribe((data) => {
        this.departments = data;
      });
  }

  // ฟังก์ชันเรียกข้อมูลระดับขึ้นอยู่กับ depart_id ที่ถูกเลือก
  getLevels(departId: number) {
    // ตรวจสอบว่า departId ไม่เป็นค่าว่าง
    if (departId) {
      this.http
        .get<any[]>(
          'http://localhost/backend/level_tbl.php?departId=' + departId
        )
        .subscribe((data) => {
          this.levels = data;
        });
    } else {
      // ถ้า departId เป็นค่าว่าง ให้ล้างค่า levels ให้ว่าง
      this.levels = [];
    }
  }

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงของแผนกและตำแหน่งในรายการมอบหมายงาน
  onAssignmentChange(index: number) {
    const assignment = this.assignments[index];
    if (assignment.departId && assignment.levelId) {
      // ดึงข้อมูลผู้ใช้ที่อยู่ในแผนกและตำแหน่งที่เลือก
      this.http
        .get<any[]>(
          `http://localhost/backend/user_tbl.php?departId=${assignment.departId}&levelId=${assignment.levelId}`
        )
        .subscribe((data) => {
          assignment.users = data;
        });
    } else {
      // ถ้าไม่มีการเลือกแผนกหรือตำแหน่งให้ล้างข้อมูลผู้ใช้ในรายการมอบหมายงาน
      assignment.users = [];
    }
  }

  emailRecipients = [{ email: '' }];

  onClosePopup() {
    this.closePopup.emit();
  }

  constructor(
    private emailService: EmailService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe, // อ้างอิง DatePipe
  
    
  ) {
    // ดึงข้อมูลแผนกเมื่อโหลดคอมโพเนนต์
    this.getDepartments();
  }

  fileToUpload: File[] | null = null;

  // รับอินพุตไฟล์ที่เลือกจากองค์ประกอบ input และเก็บในตัวแปร fileToUpload
  onFileChange(event: any) {
    this.fileToUpload = event.target.files;
  }

  private apiUrl = 'http://localhost/backend'; // ระบุ URL ที่เชื่อมต่อกับ Backend

  sendEmail() {
    // ตรวจสอบว่ามีไฟล์ที่แนบมาหรือไม่
    const filesToUpload = this.fileToUpload ? this.fileToUpload : [];

    // ตรวจสอบว่ามีผู้รับอีเมลหรือไม่
    if (this.emailRecipients.length === 0) {
      Swal.fire({
        icon: 'error',
        text: 'โปรดเพิ่มผู้รับอย่างน้อยหนึ่งราย',
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

     // จัดรูปแบบวันที่และเวลาสำหรับวันเริ่มต้นและวันสิ้นสุดงาน
    const formattedStartDate = this.datePipe.transform(this.taskData.startDate, 'yyyy-MM-dd HH:mm:ss');
    const formattedEndDate = this.datePipe.transform(this.taskData.endDate, 'yyyy-MM-dd HH:mm:ss');

    // สร้างข้อมูลที่จะส่งไปยัง Backend
    const requestData = {
      recipients: this.emailRecipients.map((recipient) => recipient.email),
      subject: this.taskData.taskName, // ใช้ค่าจาก taskData.taskName
      content: this.taskData.emailContent, // ใช้ค่าจาก taskData.emailContent
      assignedTo: this.assignments.map((assignment) => assignment.assignedTo), // ใช้ค่าจาก assignments
      startDate: formattedStartDate,  // ใช้วันเริ่มต้นที่จัดรูปแบบแล้ว
      endDate: formattedEndDate,      // ใช้วันสิ้นสุดที่จัดรูปแบบแล้ว
    };

    // Inside the sendTaskAssignmentEmail() method
    this.emailService
      .sendTaskAssignmentEmail(
        requestData,
        requestData.recipients,
        requestData.subject,
        requestData.content,
        filesToUpload
      )
      .subscribe((response) => {
        // ซ่อนไอคอนโหลดและแสดงข้อความแจ้งเตือนเมื่อส่งอีเมลสำเร็จ
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.message,
          timer: 1500, // 1.5 วินาที
          showConfirmButton: false, // ซ่อนปุ่ม OK
        });

        // เพิ่มรายละเอียดงานใน task_tbl
        const taskData = {
          taskName: this.taskData.taskName,
          assignedBy: this.taskData.assignedBy,
          assignedTo: this.assignments
            .map((assignment) => assignment.assignedTo)
            .join(','), // ใช้ค่าจาก assignments
          status: this.taskData.status,
          startDate: formattedStartDate, // ใช้วันเริ่มต้นที่จัดรูปแบบแล้ว
          endDate: formattedEndDate,     // ใช้วันสิ้นสุดที่จัดรูปแบบแล้ว
          task_file: 'ชื่อไฟล์ที่บันทึก', // แทนชื่อไฟล์ที่ต้องการบันทึก
        };

        // สร้างอ็อบเจ็กต์สำหรับการรับข้อมูลจาก API
        interface TaskResponse {
          task_id: number; // ประกาศคุณานของ task_id และประเภทข้อมูล
          // เพิ่มคุณานอื่น ๆ ที่คุณจะใช้ไปในคำขอ API ตามที่เหมาะสม
        }

        // เพิ่มรายละเอียดงานใน task_tbl และรับข้อมูลที่เพิ่มเข้าในฐานข้อมูล
        this.http
          .post<TaskResponse>(`${this.apiUrl}/create_task.php`, taskData)
          .subscribe(
            (taskResponse) => {
              // เมื่อเพิ่มงานเสร็จสิ้น
              console.log('Task added successfully:', taskResponse);

              // บันทึกการกระทำใน action_log_tbl
              const actionLogData = {
                task_id: taskResponse.task_id, // ใช้ ID งานที่เพิ่มใน task_tbl
                user_id: this.taskData.assignedBy, // ใช้ ID ผู้มอบหมายงาน
                action_type: 'สร้างงาน', // ประเภทการกระทำ (เช่น 'สร้างงาน')
                action_description: 'สร้างงาน ' + this.taskData.taskName, // คำอธิบายการกระทำ
              };

              this.http
                .post(`${this.apiUrl}/log_action.php`, actionLogData)
                .subscribe(
                  (actionResponse) => {
                    // เมื่อบันทึกการกระทำสำเร็จ
                    console.log(
                      'Action log added successfully:',
                      actionResponse
                    );
                  },
                  (actionError) => {
                    // เมื่อเกิดข้อผิดพลาดในการบันทึกการกระทำ
                    console.error('Error adding action log:', actionError);
                  }
                );
            },
            (taskError) => {
              // เมื่อเกิดข้อผิดพลาดในการเพิ่มงาน
              console.error('Error adding task:', taskError);
            }
          );
      });
  }

  addRecipient() {
    this.emailRecipients.push({ email: '' });
  }
  removeRecipient(index: number) {
    this.emailRecipients.splice(index, 1);
  }
}
