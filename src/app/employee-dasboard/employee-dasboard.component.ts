import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-employee-dasboard',
  templateUrl: './employee-dasboard.component.html',
  styleUrls: ['./employee-dasboard.component.scss'],
})
export class EmployeeDasboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  loading = false;

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.formValue = this.formbuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      salary: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
    });
    this.getAllEmployee();
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res: any) => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (err: any) => {}
    );
  }
  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.loading = false;
      this.employeeData = res.data.users;
    });
  }

  public searchEmployees(key: string): void {
    let results = [];
    for (const employee of this.employeeData) {
      if (
        employee.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    this.employeeData = results;
    if (results.length === 0 || !key) {
      this.getAllEmployee();
    }
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row._id).subscribe((res) => {
      this.getAllEmployee();
    });
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row._id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(
        (res) => {
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        },
        (error) => {}
      );
  }
}
