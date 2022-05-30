import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Career } from 'src/app/core/interfaces/career.interface';
import { CareerService } from 'src/app/core/services/career.service';
import { InstituteService } from 'src/app/core/services/institute.service';

@Component({
  selector: 'app-add-career',
  templateUrl: './add-career.component.html',
  styleUrls: ['./add-career.component.css']
})
export class AddCareerComponent implements OnInit {

  careerForm: FormGroup;

  career: Career;

  institutes: Array<any>;

  constructor(
    public dialogRef: MatDialogRef<AddCareerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private instituteService: InstituteService,
    private careerService: CareerService,
    private toastService: ToastrService
  ) {
    this.careerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      // address: new FormControl(''),  
      instituteId: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      description: new FormControl(null),
    });
   }

  ngOnInit(): void {
    if (this.data.career) {
      this.career = this.data.career;
      this.careerForm.patchValue(this.career);
    }
    this.getAllInstitutes();

  }

  onSubmit() {
    if (this.careerForm.invalid) {
      return;
    }
    console.log(this.castToCareer(this.careerForm.value));
    this.careerService.create(this.castToCareer(this.careerForm.value)).subscribe({
      next: (data) => {
        this.instituteService.getById(data.instituteId).subscribe({
          next: (insti) => {
            insti.careerId.push(data._id);
            this.instituteService.update(data.instituteId, {careerId: insti.careerId}).subscribe({
              next: (data) => {
                this.toastService.success('Carrera creada con éxito');
                this.dialogRef.close(data);
              }
            });
          }
        });
      }
    });
  }

  onEdit() {
    if (this.careerForm.invalid) {
      return;
    }
    console.log(this.castToCareer(this.careerForm.value));
    this.careerService.update(this.career._id, this.castToCareer(this.careerForm.value)).subscribe({
      next: (data) => {
        this.instituteService.getById(data.instituteId).subscribe({
          next: (insti) => {
            insti.careerId.push(data._id);
            this.instituteService.update(data.instituteId, {careerId: insti.careerId}).subscribe({
              next: (data) => {
                this.toastService.success('Carrera actualizada con éxito');
                this.dialogRef.close(data);
              }
            });
          }
        });
      }
    });
  }

  castToCareer(career: any): Career {
    return {
      name: career.name,
      instituteId: career.instituteId,
      description: career.description
    };
  }

  getAllInstitutes() {
    this.instituteService.getAll().subscribe({
      next: (data) => {
        this.institutes = data;
      }
    });
  }


}
