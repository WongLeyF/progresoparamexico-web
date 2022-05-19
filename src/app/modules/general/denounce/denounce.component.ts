import { Component, OnInit } from '@angular/core';
import { DenounceService } from 'src/app/core/api/denounce.service';

@Component({
  selector: 'app-denounce',
  templateUrl: './denounce.component.html',
  styleUrls: ['./denounce.component.css']
})
export class DenounceComponent implements OnInit {

  constructor(
    private denounceService: DenounceService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.denounceService.getAll().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
    // console.log('test',a);
  }

}
