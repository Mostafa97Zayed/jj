import { Component, OnInit } from '@angular/core';
import { phoneNumber } from './phoneNumber';
import { phoneService } from './phoneNumber.service'
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public phones: phoneNumber[] = [];
  public thisPhone: phoneNumber = null as any;
  public addedPhone: phoneNumber = null as any;
  

  constructor(private phoneService : phoneService){}


  ngOnInit(){
    this.getPhones();
  }

  public getPhones(): void {
    this.phoneService.getPhones().subscribe(
      (response: phoneNumber[]) => {
        this.phones = response;
        console.log(this.phones);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onAddPhone(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.phoneService.addPhone(addForm.value).subscribe(
      (response: phoneNumber) => {
        console.log(response);
        this.getPhones();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  
  public onUpdatePhone(phone: phoneNumber): void {
    this.phoneService.updatePhone(phone).subscribe(
      (response: phoneNumber) => {
        console.log(response);
        this.getPhones();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onOpenModal(phone: phoneNumber, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      this.addedPhone =phone;
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.thisPhone = phone;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
