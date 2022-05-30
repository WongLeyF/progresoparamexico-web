import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from 'src/app/core/enums/user-role';
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
      name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      // name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, Validators.required),
      roleId: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.roleService.getByName(UserRole.ADMINISTRADOR).subscribe({
      next: (role: Role) => {
        this.registerForm.get('roleId').setValue(role._id);
      }
    });
    if (this.data.edit) {
      this.user = this.data.user;
      this.registerForm.patchValue(this.user);
      this.registerForm.get('email').disable();
    }
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

  onEdit() {
    if (this.registerForm.invalid) {
      // faltan datos
      this.toastService.error('Ingrese todos los datos');
      this.registerForm.markAllAsTouched();
      return;
    }

    
    
    this.userService.update(this.user._id, this.castToUser(this.registerForm.value)).subscribe({
      next: (data) => {
        this.toastService.success('Usuario actualizado con éxito');
        this.dialogRef.close(data);
      }
    });
  }

  castToUser(formValue: any): User {
    return {
      name: formValue.name,
      lastName: formValue.lastName,
      roleId: this.user.roleId,
      password: formValue.password,
    };
  }

}
