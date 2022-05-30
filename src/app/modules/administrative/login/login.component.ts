import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/core/enums/user-role';
import { LoginResponse } from 'src/app/core/interfaces/login-response.interface';
import { Role } from 'src/app/core/models/role.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoleService } from 'src/app/core/services/role.service';
import { SessionService } from 'src/app/core/services/session.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;

  isRegistered = false;
  showForm = false;
  hide = true;
  createUser = false;

  adminId: string;


  constructor(
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
    });
  }

  ngOnInit(): void {
    this.roleService.getByName(UserRole.SUPER_ADMINISTRADOR).subscribe({
      next: (role: Role) => {
        this.adminId = role._id;
      }
    });
  }

  // private register(): void {
  //   const roleId = this.adminId;
  //   this.userService.register({ ...this.registerForm.value, roleId}).subscribe(res => {
  //     console.log(res);
      
  //     this.login();
  //   }, error => {
  //     console.log(error);
      
  //     this.isRegistered = false;
  //   });
  // }

  private login(): void {
    this.authService.login({
      username: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
    }).subscribe(res => {

      const loginResponse: LoginResponse = res;
      this.sessionService.userSession = loginResponse.user;
      this.sessionService.token = loginResponse.access_token;

      console.log('inicio');
      

      this.showForm = false;
      this.registerForm.reset();
      this.isRegistered = false;

      this.router.navigateByUrl('/');

    }, error => {
      this.isRegistered = false;
      this.swalAlertService.error('Error', error.error.message);
    });
  }

  onSubmit(): void {
    console.log('test');

    if(!this.createUser) {
      this.login();
      return;
    }
    
    if (this.registerForm.valid) {
      // this.isSaving = true;
      this.isRegistered = true;
      // this.register();
      console.log('test2');
      
    } else {
      this.registerForm.markAllAsTouched();
      console.log('test3');
      
    }
  }

}
