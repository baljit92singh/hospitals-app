import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, Sort } from '@angular/material';

export interface ShortTable {
  name: string;
  gender: string;
  age: number;
  date: any;
  doctors: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  desserts = [];
  recentList: ShortTable[] = [];
  patientForm: FormGroup;
  // recentList = [];
  doctorList = [
    "Dr. Gopal Singh Dhanik",
    "Dr. Vivek Saxena",
    "Dr. Nadeem Faruqui",
    "Dr. Pravina Patel",
    "Dr. Alok Bajpai",
    "Dr. Sanjai Rastogi",
    "Dr. Rakesh Chandra",
    "Dr. Rajan Bhargava",
    "Dr. Shubha Agarwal",
    "Dr. Shekhar Rastogi",
    "Dr. D. K. Jaipuria",
    "Dr. S. S. Singhal",
    "Dr. Ashish Agrawal",
    "Dr. Bhupendra Kumar",
    "Dr. K. K. Dokania"
  ]
  mode: string = 'new';
  constructor(private fb: FormBuilder,
    public snackBar: MatSnackBar) {
    this.loadForm();
  }
  loadForm() {
    this.patientForm = this.fb.group({
      name: '',
      age: '',
      date: '',
      doctors: '',
      gender: ''
    })
  }

  savePatient() {
    let item = {
      name: this.patientForm.controls['name'].value,
      age: this.patientForm.controls['age'].value,
      date: this.patientForm.controls['date'].value,
      doctors: this.patientForm.controls['doctors'].value,
      gender: this.patientForm.controls['gender'].value,
    }
    this.recentList.push(item);
    this.resetForm();
    var message = "Patient created successfully"
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
  }

  updatePatient() {
    this.recentList.splice(this.indexUpdate, 1);
    let item = {
      name: this.patientForm.controls['name'].value,
      age: this.patientForm.controls['age'].value,
      date: this.patientForm.controls['date'].value,
      doctors: this.patientForm.controls['doctors'].value,
      gender: this.patientForm.controls['gender'].value,
    }
    this.recentList.push(item);
    this.resetForm();
    var message = "Patient update successfully"
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
    this.mode = 'new';
  }
  resetForm() {
    this.patientForm.reset();
  }

  indexUpdate: number;
  editPatient(item) {
    this.mode = 'edit';
    this.indexUpdate = this.recentList.indexOf(item)
    // console.log(item);
    this.patientForm.controls['name'].setValue(item.name);
    this.patientForm.controls['age'].setValue(item.age);
    this.patientForm.controls['date'].setValue(item.date);
    this.patientForm.controls['doctors'].setValue(item.doctors);
    this.patientForm.controls['gender'].setValue(item.gender);
  }

  deletePatient(item) {
    // console.log(item);
    this.recentList.splice(this.recentList.indexOf(item), 1);
    var message = "Patient delete successfully"
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
  }


  ngOnInit() {
    // this.desserts.push(this.recentList);
    this.desserts = this.recentList
    // this.recentList = this.desserts.slice();
    console.log(this.desserts);
    console.log(this.recentList);
  }
  sortData(sort: Sort) {
    console.log(sort)
    const data = this.desserts.slice();
    console.log(this.desserts);
    console.log(this.recentList);
    if (!sort.active || sort.direction === '') {
      this.recentList = data;
      return;
    }

    this.recentList = data.sort((a, b) => {
      console.log(this.desserts);
      console.log(this.recentList);
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'gender': return compare(a.gender, b.gender, isAsc);
        case 'age': return compare(a.age, b.age, isAsc);
        case 'date': return compare(a.date, b.date, isAsc);
        case 'doctors': return compare(a.doctors, b.doctors, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}