import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/core/models/role.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoleService } from 'src/app/core/services/role.service';
import { SessionService } from 'src/app/core/services/session.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  registerForm: FormGroup;
  roles: any;
  user: User;


  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService: ToastrService,
    private authService: AuthService,
    private userService: UsersService,
    private sessionService: SessionService,
    private roleService: RoleService,
    private router: Router,
    private swalAlertService: SwalAlertService
  ) { 
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      // name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, Validators.required),
      roleId: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.roleService.getAll().subscribe({
      next: (role: any) => {
        this.roles = role
      }
    });
  }

  public register(): void {
    this.userService.register({ ...this.registerForm.value}).subscribe(res => {
      
      this.toastService.success('Usuario creado correctamente');
      this.dialogRef.close();
      
    }, error => {
      console.log(error);
      
      this.toastService.error('Error al crear usuario');
      this.dialogRef.close();
    });
  }

}
