import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: any = null;

  constructor() {
    // ทำการตรวจสอบว่ามีค่าสถานะการล็อกอินอยู่ใน sessionStorage หรือไม่
    const userPosition = sessionStorage.getItem('userPosition');
    if (userPosition) {
      this.loggedInUser = { position: userPosition };
    }
  }

  setUserPosition(position: string) {
    this.loggedInUser = { position };
    // บันทึกค่าสถานะการล็อกอินลงใน sessionStorage เมื่อมีการเปลี่ยนค่า
    sessionStorage.setItem('userPosition', position);
  }

  login(userData: any) {
    // ในกรณีที่มีการตรวจสอบผู้ใช้จากฐานข้อมูล คุณสามารถเพิ่มข้อมูลผู้ใช้ในตัวแปร loggedInUser ตามต้องการ
    // ตัวอย่างเพิ่มสิทธิ์ผู้ใช้งาน
    this.loggedInUser = {
      username: userData.username,
      position: 'admin', // ให้แก้ค่าสิทธิ์ตามที่คุณต้องการ
    };
    // บันทึกค่าสถานะการล็อกอินลงใน sessionStorage เมื่อมีการล็อกอิน
    sessionStorage.setItem('userPosition', this.loggedInUser.position);
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  hasPermission(requiredPosition: string): boolean {
    if (this.loggedInUser && this.loggedInUser.position === requiredPosition) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    // ทำการเคลียร์ค่าสถานะการล็อกอินออกจาก sessionStorage และทำการตั้งค่าให้ loggedInUser เป็น null
    sessionStorage.removeItem('userPosition');
    this.loggedInUser = null;
  }

  getUserPosition(): string {
    if (this.isLoggedIn()) {
      return this.loggedInUser.position;
    } else {
      return '';
    }
  }
}
