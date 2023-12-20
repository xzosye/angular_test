import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent implements OnInit {
  @Output() closePopup = new EventEmitter<void>();
  @Output() addMember = new EventEmitter<any>();

  public form!: FormGroup;
  submitted = false;

  levels: { [key: string]: string[] } = {
    งานบริหารทั่วไป: [
      'ผู้อำนวยการงานบริหารทั่วไป',
      'รองผู้อำนวยการงานบริหารทั่วไป',
      'เจ้าหน้าที่บริหารงานทั่วไปปฏิบัติการรักษาราชการแทนหัวหน้าสำนักงานผู้อำนวยการ',
      'เจ้าหน้าที่บริหารงานทั่วไปปฏิบัติการปฏิบัติหน้าที่หัวหน้างานฝ่ายบริหารงานทั่วไป',
      'เจ้าหน้าที่บริหารงานทั่วไปปฏิบัติการ',
      'พนักงานสถานที่',
    ],
    งานวิศวกรรมเครือข่าย: [
      'ผู้อำนวยการงานวิศวกรรมเครือข่าย',
      'รองผู้อำนวยการงานวิศวกรรมเครือข่าย',
      'นักวิชาการคอมพิวเตอร์ชำนาญการปฏิบัติหน้าที่หัวหน้างานวิศวกรรมเครือข่าย',
      'นักวิชาการคอมพิวเตอร์ปฏิบัติการ',
      'ผู้ปฏิบัติงานโสตทัศนศึกษา',
      'นักวิชาการคอมพิวเตอร์ ',
    ],
    งานวิทยบริการและสารสนเทศ: [
      'ผู้อำนวยการฝ่ายวิทยบริการและสารสนเทศ',
      'รองผู้อำนวยการฝ่ายวิทยบริการและสารสนเทศ',
      'นักวิชาการคอมพิวเตอร์ปฏิบัติการ',
      'บรรณารักษ์ปฏิบัติการ',
      'บรรณารักษ์',
      'เจ้าหน้าที่บริหารงานทั่วไป',
    ],
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      prefix: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      level: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // ปรับปรุงที่ส่วนในส่วนของ onSave() เพื่อตรวจสอบค่า response ก่อนที่จะอ่านค่า success
  onSave() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const newMember = {
      username: this.form.value.username,
      prefix: this.form.value.prefix,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      password: this.form.value.password,
      position: this.form.value.position,
      level: this.form.value.level,
      department: this.form.value.department,
      phoneNumber: this.form.value.phoneNumber,
      email: this.form.value.email,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // ตั้งค่า Content-Type เป็น application/json
      }),
    };

    this.http
      .post<any>(
        'http://localhost/backend/add_member.php',
        this.form.value,
        httpOptions
      )
      .subscribe(
        (response) => {
          if (response && response.success) {
            // ตรวจสอบว่า response ไม่ใช่ null และมีคีย์ 'success'
            Swal.fire({
              icon: 'success',
              title: 'การลงทะเบียนสำเร็จ',
              text: 'ตอนนี้คุณสามารถเข้าสู่ระบบด้วยข้อมูลประจำตัวของคุณ',
              showConfirmButton: false,
              timer: 1500,
              // }).then(() => {
              //   this.router.navigate(['/admin']);
              // });
            }).then(() => {
              // ปิดหน้าต่าง popup
              this.onClose();
            });
          } else if (response && response.message) {
            // ตรวจสอบว่า response ไม่ใช่ null และมีคีย์ 'message'
            Swal.fire({
              icon: 'error',
              title: 'การลงทะเบียนไม่สำเร็จ',
              text: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'มีข้อมูลประจำตัวนี้อยู่แล้วกรุณาเปลี่ยน.',
              showConfirmButton: false,
              timer: 1500,
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

    // this.onClose();
    this.addMember.emit(newMember);
  }

  onClose() {
    this.closePopup.emit();
  }

  onDepartmentChange() {
    const selectedDepartment = this.form.get('department')?.value;

    if (selectedDepartment) {
      this.form.get('level')?.setValue('');
    }
  }

  getPositionsKeys(): string[] {
    return Object.keys(this.levels);
  }

  addTaskAndClose() {
    this.form.reset();
    this.closePopup.emit();
  }
}
