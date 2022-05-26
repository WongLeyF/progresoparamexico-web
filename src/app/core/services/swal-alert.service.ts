import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalAlertService {

  primaryColor = '#e40a65';
  secondaryColor = '#9E9E9E';

  constructor() { }

  success(title: string = '', text: string = '', confirmButtonText: string = 'Aceptar'): void {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText,
      confirmButtonColor: this.primaryColor
    });
  }

  successHTML(title: string = '', html: string = '', confirmButtonText: string = 'Aceptar'): void {
    Swal.fire({
      title,
      html,
      icon: 'success',
      confirmButtonText,
      confirmButtonColor: this.primaryColor
    });
  }

  errorHTML(title: string = '', html: string = '', confirmButtonText: string = 'Aceptar'): void {
    Swal.fire({
      title,
      html,
      icon: 'error',
      confirmButtonText,
      confirmButtonColor: this.primaryColor
    });
  }

  warning(title: string = '', text: string = '', confirmButtonText: string = 'Aceptar'): void {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      confirmButtonText,
      confirmButtonColor: this.primaryColor
    });
  }

  error(title: string = '', text: string = '', confirmButtonText: string = 'Aceptar'): void {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText,
      confirmButtonColor: this.primaryColor
    });
  }

  async confirm(
    title: string = '',
    text: string = '',
    confirmButtonText: string = 'Aceptar',
    cancelButtonText: string = 'Cancelar'): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

      Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.primaryColor,
        cancelButtonColor: this.secondaryColor,
        confirmButtonText,
        cancelButtonText,
      }).then((result) => {
        if (result.value) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(error => reject(false));

    });
  }

  async inputEmail(
    title: string,
    inputPlaceholder: string = 'Capture su email',
    confirmButtonText: string = 'Aceptar',
    cancelButtonText: string = 'Cancelar'): Promise<any> {
    const { value: email } = await Swal.fire({
      title,
      input: 'email',
      inputPlaceholder,
      confirmButtonText,
      confirmButtonColor: this.primaryColor,
      cancelButtonColor: this.secondaryColor,
      cancelButtonText,
      showCancelButton: true,
      validationMessage: 'Debe capturar un email valido'
    });

    return email;
  }

  async inputText(
    inputValue: string,
    title: string,
    inputPlaceholder: string = '',
    confirmButtonText: string = 'Aceptar',
    cancelButtonText: string = 'Cancelar',
    message: string = ''): Promise<any> {
    const { value: text } = await Swal.fire({
      title,
      input: 'text',
      text: message,
      inputPlaceholder,
      confirmButtonText,
      confirmButtonColor: this.primaryColor,
      cancelButtonColor: this.secondaryColor,
      cancelButtonText,
      inputValue,
      customClass: {
        title: 'title-swal'
      },
      showCancelButton: true,
      // inputValidator: (value) => {
      //   if (!value) {
      //     return 'Este campo es requerido';
      //   }
      // }
      inputValidator: (value) => !value && 'Este campo es requerido'
    });

    return text;
  }

  async inputPhone(
    inputValue: string,
    title: string,
    inputPlaceholder: string = '',
    confirmButtonText: string = 'Aceptar',
    cancelButtonText: string = 'Cancelar',
    message: string = ''): Promise<any> {
    const { value: phone } = await Swal.fire({
      title,
      input: 'tel',
      text: message,
      inputPlaceholder,
      confirmButtonText,
      confirmButtonColor: this.primaryColor,
      cancelButtonColor: this.secondaryColor,
      cancelButtonText,
      inputValue,
      customClass: {
        title: 'title-swal'
      },
      showCancelButton: true,
      // inputValidator: (value) => {
      //   if (!value) {
      //     return 'Este campo es requerido';
      //   }else if(!value.match(/^[0-9]{10}$/)){
      //     return 'El numero de telefono no es valido';
      //   }
      // }
      inputValidator: (value) => !value && 'Este campo es requerido' || !value.match(/^[0-9]{10}$/) && 'El numero de telefono no es valido'
    });

    return phone;
  }

  // async inputTextWith3Btns(
  //   inputValue: string,
  //   title: string,
  //   inputPlaceholder: string = '',
  //   confirmButtonText: string = 'Aceptar',
  //   cancelButtonText: string = 'Cancelar',
  //   denyButtonText: string = 'Cancelar',
  //   message: string = ''): Promise<any> {
  //   const { value: text } = await Swal.fire({
  //     title,
  //     input: 'text',
  //     text: message,
  //     inputPlaceholder,
  //     confirmButtonText,
  //     confirmButtonColor: this.primaryColor,
  //     cancelButtonColor: this.secondaryColor,
  //     denyButtonText,
  //     cancelButtonText,
  //     inputValue,
  //     showCancelButton: true,
  //     showDenyButton: true,
  //     inputValidator: (value) => {
  //       if (!value) {
  //         return 'Este campo es requerido';
  //       }
  //     }
  //   } as any);
  //   return text;
  // }


  async catchError(error: any, warningTitle: string = 'Acción no completada', errorTitle: string = 'Upps', errorMessage: string = 'Ocurrio un detalle, intentelo más tarde...'): Promise<any> {
    if (error.status < 500) {
      this.warning(warningTitle, error.error.message);
    } else {
      this.error(errorTitle, errorMessage);
    }
  }

}
