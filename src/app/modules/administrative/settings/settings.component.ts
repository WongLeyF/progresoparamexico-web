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

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public selectedTab: FormControl;
  institutes: Array<Institute>;
  careers: Array<Career>;
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(
    public dialog: MatDialog,
    private instituteService: InstituteService,
    private careerService: CareerService,
    private swalService: SwalAlertService,
    private toastService: ToastrService
  ) { 
    this.selectedTab = new FormControl(0);
  }

  ngOnInit(): void {
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


}
