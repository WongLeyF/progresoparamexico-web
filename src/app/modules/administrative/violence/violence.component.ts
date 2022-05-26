import { Component, OnInit } from '@angular/core';
import { DenounceService } from 'src/app/core/api/denounce.service';

@Component({
  selector: 'app-violence',
  templateUrl: './violence.component.html',
  styleUrls: ['./violence.component.css']
})
export class ViolenceComponent implements OnInit {

  denounces: any

  constructor(
    private denounceService: DenounceService
  ) { }

  ngOnInit(): void {
    this.getAllDenuncias();
  }

  getAllDenuncias() {
    
    this.denounceService.getAll().subscribe(res => {
      this.denounces = res.map(this.castToDenounce);
      console.log(res);
    });
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
