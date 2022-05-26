import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Institute } from 'src/app/core/interfaces/institute.interface';
import { InstituteService } from 'src/app/core/services/institute.service';

@Component({
  selector: 'app-add-institute',
  templateUrl: './add-institute.component.html',
  styleUrls: ['./add-institute.component.css']
})
export class AddInstituteComponent implements OnInit {

  instituteForm: FormGroup;

  institute: Institute;

  constructor(
    public dialogRef: MatDialogRef<AddInstituteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private instituteService: InstituteService,
    private toastService: ToastrService
  ) { 
    this.instituteForm = new FormGroup({
      name: new FormControl(null,[Validators.required, Validators.minLength(1)]),
      // address: new FormControl(''),
      schoolGrade: new FormControl('', [Validators.required, Validators.minLength(1)]),
      phone: new FormControl(null,null),
      email: new FormControl(null, [Validators.email]),
    });
  }

  ngOnInit(): void {
    if (this.data.institute) {
      this.institute = this.data.institute;
      this.instituteForm.patchValue(this.institute);
    }
  }

  onSubmit() {
    if (this.instituteForm.invalid) {
      return;
    }
    console.log(this.castToInstitute(this.instituteForm.value));
    
    this.instituteService.create(this.castToInstitute(this.instituteForm.value)).subscribe({
      next: (data) => {
        this.toastService.success('Instituto creado con éxito');
        this.dialogRef.close(data);
      },
      error: (err) => {
        this.toastService.error(err.error.message);
      }
    });
  }

  onEdit() {
    if (this.instituteForm.invalid) {
      return;
    }
    
    this.instituteService.update(this.institute._id, this.castToInstitute(this.instituteForm.value)).subscribe({
      next: (data) => {
        this.toastService.success('Instituto actualizado con éxito');
        this.dialogRef.close(data);
      }
    });
  }

  castToInstitute(data: any): Institute {
    return {
      name: data.name,
      schoolGrade: data.schoolGrade,
      phone: data.phone,
      email: data.email,
      address: data.address,
    };
  }

}
