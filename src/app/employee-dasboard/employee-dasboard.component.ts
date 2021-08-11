import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  salary: number;
}

@Component({
  selector: 'app-employee-dasboard',
  templateUrl: './employee-dasboard.component.html',
  styleUrls: ['./employee-dasboard.component.scss'],
})
export class EmployeeDasboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeObj?: Employee;
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  loading = false;
  currentId?: string;
  searchText = '';

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    public auth: AuthService,
    private router: Router,
    private titleChange: Title
  ) {}

  private changeTitle(title: string) {
    this.titleChange.setTitle(title);
  }

  ngOnInit(): void {
    this.changeTitle('Dashboard');

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
    const { firstName, lastName, email, phoneNumber, salary } =
      this.formValue.value;

    this.employeeObj = {
      firstName,
      lastName,
      email,
      phoneNumber,
      salary,
    };
    if (this.formValue.valid) {
      this.api.postEmployee(this.employeeObj).subscribe(
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
  }
  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.loading = false;
      this.employeeData = res.data.users;
    });
  }

  public searchEmployees(key: string): void {
    this.searchText = key;
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row._id).subscribe((res) => {
      this.getAllEmployee();
    });
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.currentId = row._id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails() {
    const { firstName, lastName, email, phoneNumber, salary } =
      this.formValue.value;

    this.employeeObj = {
      firstName,
      lastName,
      email,
      phoneNumber,
      salary,
    };

    if (this.formValue.valid) {
      this.api.updateEmployee(this.employeeObj, this.currentId).subscribe(
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

  detail(data: any) {
    this.router.navigate([`dashboard/detail/${data._id}`]);
  }
}
