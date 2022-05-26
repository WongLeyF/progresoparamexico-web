import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Career } from 'src/app/core/interfaces/career.interface';
import { Institute } from 'src/app/core/interfaces/institute.interface';
import { CareerService } from 'src/app/core/services/career.service';
import { InstituteService } from 'src/app/core/services/institute.service';
import { AddInstituteComponent } from './modals/add-institute/add-institute.component';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';
import { AddCareerComponent } from './modals/add-career/add-career.component';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/core/models/user.model';
import { PaginationData } from 'src/app/core/interfaces/pagination-data.interface';
import { SessionService } from 'src/app/core/services/session.service';
import { UserSession } from 'src/app/core/interfaces/user-session.interface';
import { AddUserComponent } from './modals/add-user/add-user.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public selectedTab: FormControl;
  institutes: Array<Institute>;
  careers: Array<Career>;
  users: any;
  faTrash = faTrash;
  faEdit = faEdit;

  filters = {
    name: '',
    role: null,
    status: 'todos',
    page: 1,
    limit: 15
  };
  userSession: UserSession;

  constructor(
    public dialog: MatDialog,
    private instituteService: InstituteService,
    private careerService: CareerService,
    private swalService: SwalAlertService,
    private toastService: ToastrService,
    private userService: UsersService,
    private sessionService: SessionService,
  ) { 
    this.selectedTab = new FormControl(0);
  }

  ngOnInit(): void {
    this.sessionService.userSessionAsObservable.subscribe(res => {
      this.userSession = res;
    });
    this.getAllInstitutes();
  }

  public changeTab(event) {
    console.log(event);
    
    this.selectedTab.setValue(event);
    switch (event) {
      case 0:
        this.getAllInstitutes();
        break;
      case 1:
        this.getAllCareers();
        break;
      case 2:
        this.getAllUsers();
        break;
    }
  }

  getAllInstitutes() {
    this.instituteService.getAll().subscribe({
      next: (data) => {
        this.institutes = data.map(this.castToInstitute);
        console.log(this.institutes);
        
      }
    });
  }

  getAllCareers() {
    this.careerService.getAll().subscribe({
      next: (data) => {
        this.careers = data;
      }
    });
  }

  getAllUsers() {
    this.userService.getAll(this.filters).subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users);
        
      }
    });
  }


  castToInstitute(data: any) {
    return {
      _id: data._id,
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      schoolGrade: data.schoolGrade == 'superior' ? 'Superior' : data.schoolGrade == 'upper-middle' ? 'Medio Superior' : 'No asignado',
      careerId: data.careerId
    }
  }

  showAddInstitutes() {
    const dialogRef = this.dialog.open(AddInstituteComponent, {
      width: '500px',
      data: {
        title: 'Agregar instituto',
        buttonText: 'Agregar',
        edit: false,
        institute: {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllInstitutes();
      }
    });
  }

  showAddCareer() {
    const dialogRef = this.dialog.open(AddCareerComponent, {
      width: '500px',
      data: {
        title: 'Agregar carrera',
        buttonText: 'Agregar',
        edit: false,
        institute: {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllCareers();
      }
    });
  }

  showEditInstitute(institute: Institute) {
    const dialogRef = this.dialog.open(AddInstituteComponent, {
      width: '500px',
      data: {
        title: 'Editar instituto',
        buttonText: 'Editar',
        edit: true,
        institute: institute
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllInstitutes();
      }
    });
  }

  showEditCareer(career: Career) {
    const dialogRef = this.dialog.open(AddCareerComponent, {
      width: '500px',
      data: {
        title: 'Editar carrera',
        buttonText: 'Editar',
        edit: true,
        career: career
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllCareers();
      }
    }
    );
  }

  deleteInstitute(institute: Institute) {
    this.instituteService.delete(institute._id).subscribe({
      next: (data) => {
        this.getAllInstitutes();
      }
    });
  }

  deleteCareer(career: Career) {
    const answer = this.swalService.confirm(`¿Está seguro de eliminar la carrera de ${career.name}?`);
    answer.then((result) => {
      if (result) {
        console.log(career);
        
        this.careerService.delete(career._id).subscribe({
          next: (data) => {
            this.instituteService.getById(career.instituteId._id).subscribe({
              next: async (insti) => {
                insti.careerId = await insti.careerId.filter(c => c != career._id);
                
                this.instituteService.update(career.instituteId._id,insti).subscribe({
                  next: (data) => {
                    this.getAllCareers();
                    this.toastService.success('Se eliminó la carrera correctamente');
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  showAddUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
      data: {
        title: 'Agregar usuario',
        buttonText: 'Agregar',
        edit: false,
        user: {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllUsers();
      }
    });   
  }

  showEditUser(user: User) {
  }

  deleteUser(user: User) {
    const answer = this.swalService.confirm(`¿Está seguro de eliminar al usuario ${user.name}?`);
    answer.then((result) => {
      if (result) {
        //update isActive to false
        this.userService.update(user._id, {isActive: false}).subscribe({
          next: (data) => {
            this.getAllUsers();
            this.toastService.success('Se eliminó el usuario correctamente');
          },
          error: (err) => {
            this.toastService.error('No se pudo eliminar el usuario');
          }
        });
      }
    });
  }



}
