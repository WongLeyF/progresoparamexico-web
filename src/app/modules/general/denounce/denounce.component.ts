import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DenounceService } from 'src/app/core/api/denounce.service';
import { Career } from 'src/app/core/interfaces/career.interface';
import { Institute } from 'src/app/core/interfaces/institute.interface';
import { AggressorService } from 'src/app/core/services/aggressor.service';
import { CareerService } from 'src/app/core/services/career.service';
import { InstituteService } from 'src/app/core/services/institute.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';
import { VictimService } from 'src/app/core/services/victim.service';

@Component({
  selector: 'app-denounce',
  templateUrl: './denounce.component.html',
  styleUrls: ['./denounce.component.css']
})
export class DenounceComponent implements OnInit {

  institutes: Array<Institute>;

  denounceForm : FormGroup
  careers: Array<Career>;

  constructor(
    private denounceService: DenounceService,
    private instituteService: InstituteService,
    private careerService: CareerService,
    private victimService: VictimService,
    private aggressorService: AggressorService,
    private toastr: ToastrService,
    private swalAlertService: SwalAlertService,
    private router: Router
  ) {
    this.denounceForm = new FormGroup({
      instituteId: new FormControl({value:"", disabled: true}, [Validators.required, Validators.minLength(1)]),
      careerId: new FormControl({value:"", disabled: true}, [Validators.required, Validators.minLength(1)]),
      violenceType: new FormControl('', [Validators.required, Validators.minLength(1)]),
      incidentLocation: new FormControl('', [Validators.required, Validators.minLength(1)]),
      actionTaken: new FormControl('', [Validators.required, Validators.minLength(1)]),
      somenthingHappened: new FormControl('', [Validators.required, Validators.minLength(1)]),
      timeSinceIncident: new FormControl('', [Validators.required, Validators.minLength(1)]),
      interventionType: new FormControl('', [Validators.required, Validators.minLength(1)]),
      interventionDescription: new FormControl('', [Validators.required, Validators.minLength(1)]),
      informationReceived: new FormControl(false, [Validators.required, Validators.minLength(1)]),
      mechanismsExist: new FormControl(false, [Validators.required, Validators.minLength(1)]),
      schoolGrade: new FormControl('', [Validators.required, Validators.minLength(1)]),
      genderVictim: new FormControl('', [Validators.required, Validators.minLength(1)]),
      genderAggressor: new FormControl('', [Validators.required, Validators.minLength(1)]),
      typeAggressor: new FormControl('', [Validators.required, Validators.minLength(1)]),
      nameAggressor: new FormControl('', [Validators.required, Validators.minLength(1)]),
      lastNameAggressor: new FormControl('', [Validators.required, Validators.minLength(1)]),
      ageAggressor: new FormControl('', [Validators.required, Validators.min(10), Validators.max(100)]),
      // nameVictim: new FormControl('', [Validators.required, Validators.minLength(1)]),
      // lastNameVictim: new FormControl('', [Validators.required, Validators.minLength(1)]),
      ageVictim: new FormControl('', [Validators.required, Validators.min(10), Validators.max(100)]),

    });
   }

  ngOnInit(): void {
    // this.instituteService.getAll().subscribe({
    //   next: (institutes) => {
    //     this.institutes = institutes;
    //     console.log(institutes);
        
    //   }
    // });
    
  }

  onSubmit() {
    console.log(this.denounceForm.invalid);
    if (this.denounceForm.invalid) {
      this.denounceForm.markAllAsTouched();
      // this.swalAlertService.error('Por favor, llene todos los campos obligatorios');
      this.toastr.warning('Por favor, llene todos los campos obligatorios');
      return;
    }

    const rawVictim = this.getVictim();
    const rawAggressor = this.getAgressor();

    // search if aggressor exists
    //if type aggressor is diferent to 'non-school'
    if (rawAggressor.type !== 'non-school') {
      this.aggressorService.getByNameLastNameInstituteGender(
        rawAggressor.name,
        rawAggressor.lastName,
        // age: rawAggressor.age,
        // type: rawAggressor.type,
        rawAggressor.instituteId,
        rawAggressor.gender
      ).subscribe({
        next: (aggressors) => {
          if (aggressors.length > 0) {
            console.log('aggressor exists');
            
            this.victimService.create(rawVictim).subscribe({
              next: (victimResult) => {
                this.denounceService.create(this.getDenounce(victimResult, aggressors[0])).subscribe({
                  next: (denounce) => {
                    console.log(denounce);
                    this.toastr.success('Denuncia creada con éxito');
                    const answer = this.swalAlertService.confirm('Denuncia creada con éxito', '¿Desea crear otra denuncia?','Si', 'No');
                    answer.then((result) => {
                      if (result) {
                        this.resetForm();
                      } else {
                        this.resetForm();
                        this.router.navigate(['/']);
                      }
                    }
                    );
                  },
                  error: (err) => {
                    console.log(err);
                    this.toastr.error('Error al crear denuncia');
                    this.swalAlertService.error('Error al crear denuncia');
                    this.victimService.delete(victimResult._id).subscribe({
                      next: (victim) => {
                        console.log(victim);
                      }
                    });
                  }
                });
              }
            });
          } else {
           this.createDenounce(rawVictim, rawAggressor);
          }
        }
      });
    }else{
      rawAggressor.instituteId = null;
      this.createDenounce(rawVictim, rawAggressor);
    }

  }

  createDenounce(rawVictim: any, rawAggressor: any) {
    this.aggressorService.create(rawAggressor).subscribe({
      next: (aggressor) => {
        this.victimService.create(rawVictim).subscribe({
          next: (victim) => {
            this.denounceService.create(this.getDenounce(victim, aggressor)).subscribe({
              next: (denounce) => {
                console.log(denounce);
                this.toastr.success('Denuncia creada con éxito');
                const answer = this.swalAlertService.confirm('Denuncia creada con éxito', '¿Desea crear otra denuncia?','Si', 'No');
                answer.then((result) => {
                  if (result) {
                    this.resetForm();
                  } else {
                    this.resetForm();
                    this.router.navigate(['/']);
                  }
                }
                );
              },
              error: (err) => {
                console.log(err);
                this.toastr.error('Error al crear denuncia');
                this.swalAlertService.error('Error al crear denuncia');
                this.victimService.delete(victim._id).subscribe({
                  next: (victim) => {
                    console.log(victim);
                  }
                });
              }
            });
          },
          error: (err) => {
            this.swalAlertService.error('Error al crear la denuncia');
          }
        });
      },
      error: (err) => {
        console.log(err);
        this.swalAlertService.error('Error al crear la denuncia');
      }
    });
  }

  showSuccess() {
    console.log('success');
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.resetForm();
  }

  resetForm() {
    this.denounceForm.reset();
    this.denounceForm.setValue({
      instituteId: '',
      careerId: '',
      violenceType: '',
      incidentLocation: '',
      actionTaken: '',
      somenthingHappened: '',
      timeSinceIncident: '',
      interventionType: '',
      interventionDescription: '',
      informationReceived: false,
      mechanismsExist: false,
      schoolGrade: '',
      genderVictim: '',
      genderAggressor: '',
      typeAggressor: '',
      nameAggressor: '',
      lastNameAggressor: '',
      ageAggressor: '',
      // nameVictim: '',
      // lastNameVictim: '',
      ageVictim: ''
    });
  }

  getDenounce(victim, aggressor) {
    return {
      instituteId: this.denounceForm.get('instituteId').value,
      careerId: this.denounceForm.get('careerId').value,
      violenceType: this.denounceForm.get('violenceType').value,
      incidentLocation: this.denounceForm.get('incidentLocation').value,
      actionTaken: this.denounceForm.get('actionTaken').value,
      somenthingHappened: this.denounceForm.get('somenthingHappened').value,
      timeSinceIncident: this.denounceForm.get('timeSinceIncident').value,
      interventionType: this.denounceForm.get('interventionType').value,
      interventionDescription: this.denounceForm.get('interventionDescription').value,
      informationReceived: this.denounceForm.get('informationReceived').value,
      mechanismsExist: this.denounceForm.get('mechanismsExist').value,
      victimId: victim._id,
      aggressorId: aggressor._id,
    }
  }

  getAgressor() {
    return {
      name: this.denounceForm.get('nameAggressor').value,
      lastName: this.denounceForm.get('lastNameAggressor').value,
      age: this.denounceForm.get('ageAggressor').value,
      type: this.denounceForm.get('typeAggressor').value,
      gender: this.denounceForm.get('genderAggressor').value,
      instituteId: this.denounceForm.get('instituteId').value, 
    }
  }

  getVictim() {
    return {
      gender: this.denounceForm.get('genderVictim').value,
      careerId: this.denounceForm.get('careerId').value,
      instituteId: this.denounceForm.get('instituteId').value,
      age: this.denounceForm.get('ageVictim').value,
    }
  }

  onChangeSchoolGrade() {
    this.instituteService.getByGrade(this.denounceForm.get('schoolGrade').value).subscribe({
      next: (institute) => {
        console.log(institute);
        this.denounceForm.get('instituteId').setValue('');
        this.institutes = institute;
        this.denounceForm.get('instituteId').enable();
      }
    });
  }

  onChangeInstitute() {
    this.careerService.getByInstituteId(this.denounceForm.get('instituteId').value).subscribe({
      next: (career) => {
        console.log(career);
        this.denounceForm.get('careerId').setValue('');
        this.careers = career;
        this.denounceForm.get('careerId').enable();
      }
    });
  }

}
