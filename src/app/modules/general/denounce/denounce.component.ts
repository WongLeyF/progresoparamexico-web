import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DenounceService } from 'src/app/core/api/denounce.service';
import { ViolenceType } from 'src/app/core/enums/violence-type';
import { Career } from 'src/app/core/interfaces/career.interface';
import { Institute } from 'src/app/core/interfaces/institute.interface';
import { AggressorService } from 'src/app/core/services/aggressor.service';
import { CareerService } from 'src/app/core/services/career.service';
import { InstituteService } from 'src/app/core/services/institute.service';
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
  ) {
    this.denounceForm = new FormGroup({
      instituteId: new FormControl({value:"", disabled: true}, Validators.required),
      careerId: new FormControl({value:"", disabled: true}, Validators.required),
      violenceType: new FormControl('', Validators.required),
      incidentLocation: new FormControl('', Validators.required),
      actionTaken: new FormControl('', Validators.required),
      somenthingHappened: new FormControl('', Validators.required),
      timeSinceIncident: new FormControl('', Validators.required),
      interventionType: new FormControl('', Validators.required),
      interventionDescription: new FormControl('', Validators.required),
      informationReceived: new FormControl(false, Validators.required),
      mechanismsExist: new FormControl(false, Validators.required),
      schoolGrade: new FormControl('', Validators.required),
      genderVictim: new FormControl('', Validators.required),
      genderAggressor: new FormControl('', Validators.required),
      typeAggressor: new FormControl('', Validators.required),
    });
   }

  ngOnInit(): void {
    this.instituteService.getAll().subscribe({
      next: (institutes) => {
        this.institutes = institutes;
        console.log(institutes);
        
      }
    });
    
  }

  onSubmit() {
    this.aggressorService.create(this.getAgressor()).subscribe({
      next: (aggressor) => {
        console.log(aggressor);
        this.victimService.create(this.getVictim()).subscribe({
          next: (victim) => {
            console.log(victim);
            this.denounceService.create(this.getDenounce(victim, aggressor)).subscribe({
              next: (denounce) => {
                console.log(denounce);
              }
            });
          }
        });
      }
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
