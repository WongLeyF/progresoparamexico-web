import { Component, OnInit } from '@angular/core';
import { DenounceService } from 'src/app/core/api/denounce.service';

@Component({
  selector: 'app-violence',
  templateUrl: './violence.component.html',
  styleUrls: ['./violence.component.css']
})
export class ViolenceComponent implements OnInit {

  denounces: any
  denouncesByInstitute: any;
  denouncesByCareer: any;
  denouncesByAggressor: any[];
  denouncesByViolenceType: any[];
  denouncesBySchoolGrade: any[];
  denouncesByVictimGender: any[];

  constructor(
    private denounceService: DenounceService
  ) { }

  ngOnInit(): void {
    this.getAllDenuncias();
    // this.byInstitute();
  }

  getAllDenuncias() {
    
    this.denounceService.getAll().subscribe(res => {
      this.denounces = res.map(this.castToDenounce);
      console.log(res);
      this.byInstitute();
      this.byCareer();
      this.byAggressor();
      this.byViolenceType();
      this.bySchoolGrade();
      this.byVictimGender();
    });
  }

  byInstitute() {
    //group by instituteId._id in array and count denounces
    const denouncesByInstitute = this.denounces.reduce((acc, cur) => {
      const key = cur.instituteId._id;
      if (!acc[key]) {
        acc[key] = {
          instituteId: cur.instituteId,
          count: 1
        };
      } else {
        acc[key].count++;
      }
      return acc;
    }, {});

    //cast to array
    this.denouncesByInstitute = Object.values(denouncesByInstitute);

    console.log(this.denouncesByInstitute);

  }

  byCareer() {
    //group by careerId._id in array and count denounces
    const denouncesByCareer = this.denounces.reduce((acc, cur) => {
      const key = cur.careerId._id;
      if (!acc[key]) {
        acc[key] = {
          careerId: cur.careerId,
          instituteId: cur.instituteId,
          count: 1
        };
      } else {
        acc[key].count++;
      }
      return acc;
    }, {});

    //cast to array
    this.denouncesByCareer = Object.values(denouncesByCareer);

  }

  byAggressor() {
    //group by aggressorId._id in array and count denounces
    const denouncesByAggressor = this.denounces.reduce((acc, cur) => {
      const key = cur.aggressorId._id;
      if (!acc[key]) {
        acc[key] = {
          aggressorId: cur.aggressorId,
          instituteId: cur.instituteId,
          count: 1
        };
      } else {
        acc[key].count++;
      }
      return acc;
    }, {});

    //cast to array
    this.denouncesByAggressor = Object.values(denouncesByAggressor);

  }

  byViolenceType() {
    //group by instituteId._id and ViolenceType in array and count denounces
    const denouncesByViolenceType = this.denounces.reduce((acc, cur) => {
      const key = cur.instituteId._id + cur.violenceType;
      if (!acc[key]) {
        acc[key] = {
          instituteId: cur.instituteId,
          violenceType: cur.violenceType,
          count: 1
        };
      } else {
        acc[key].count++;
      }
      return acc;
    }, {});

    //cast to array
    this.denouncesByViolenceType = Object.values(denouncesByViolenceType);
  }

  bySchoolGrade() {
    //group by SchoolGrade in array and count denounces
    const denouncesBySchoolGrade = this.denounces.reduce((acc, cur) => {
      const key = cur.instituteId.schoolGrade;
      if (!acc[key]) {
        acc[key] = {
          schoolGrade: cur.instituteId.schoolGrade,
          // instituteId: cur.instituteId,
          count: 1
        };
      } else {
        acc[key].count++;
      }
      return acc;
    }, {});

    //cast to array
    this.denouncesBySchoolGrade = Object.values(denouncesBySchoolGrade);

    console.log(this.denouncesBySchoolGrade);
    
  }

  byVictimGender() {
    //group by instituteId._id and victimId.gender in array and count denounces
    const denouncesByVictimGender = this.denounces.reduce((acc, cur) => {
      const key = cur.instituteId._id + cur.victimId.gender;
      if (!acc[key]) {
        acc[key] = {
          instituteId: cur.instituteId,
          victimId: cur.victimId,
          count: 1
        };
      } else {
        acc[key].count++;
      }
      return acc;
    }, {});

    //cast to array
    this.denouncesByVictimGender = Object.values(denouncesByVictimGender);

  }




  castToDenounce(denounce) {
    return {
      _id: denounce._id,
      instituteId: {
        _id: denounce.instituteId._id,
        name: denounce.instituteId.name,
        address: denounce.instituteId.address,
        phone: denounce.instituteId.phone,
        email: denounce.instituteId.email,
        schoolGrade: denounce.instituteId.schoolGrade == 'middle-upper' ? 'Media Superior' : denounce.instituteId.schoolGrade == 'superior' ? 'Superior' : denounce.instituteId.schoolGrade,
        careerId: denounce.instituteId.careerId,
      },
      careerId: denounce.careerId,
      victimId: {
        _id: denounce.victimId._id,
        age: denounce.victimId.age,
        gender: denounce.victimId.gender == 'M' ? 'Masculino' : denounce.victimId.gender == 'F' ? 'Femenino' : denounce.victimId.gender
      },
      aggressorId: denounce.aggressorId,
      // 'physical', 'sexual', 'verbal', 'patrimonial'
      violenceType: denounce.violenceType == 'physical' ? 'Física' : denounce.violenceType == 'sexual' ? 'Sexual' : denounce.violenceType == 'verbal' ? 'Verbal' : denounce.violenceType == 'patrimonial' ? 'Patrimonial' : '',
    // mas de 12 meses, entre 6 y 12 meses, entre 3 y 6 meses, entre 1 y 3 meses, en los ultimos 15 dias
      timeSinceIncident: denounce.timeSinceIncident == 'more than 12 months' ? 'Mas de 12 meses' : denounce.timeSinceIncident == 'between 6 and 12 months' ? 'Entre 6 y 12 meses' : denounce.timeSinceIncident == 'between 3 and 6 months' ? 'Entre 3 y 6 meses' : denounce.timeSinceIncident == 'between 1 and 3 months' ? 'Entre 1 y 3 meses' : 'En los ultimos 15 dias',
      createdAt: new Date(denounce.createdAt).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };
  }


}
