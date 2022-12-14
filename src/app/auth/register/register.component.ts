import { PacienteService } from './../../services/paciente.service';
import { UserResponse } from './../../core/interfaces/UserResponse';
import { AuthService } from './../../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showPassword = false;
  showPassword2 = false;
  registerFrm: FormGroup;
  submited = false;
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
     private toastCtrl: ToastController,
     private apiServce: AuthService,
     private pacienteService: PacienteService) {
    this.registerFrm = this.fb.group(
      {
        names: ['',Validators.required],
        lastnames: ['',Validators.required],
        email: ['',Validators.required],
        sexo: ['',Validators.required],
        edad: ['',Validators.required],
        phone: ['',Validators.required],
        dni: ['',],
        password: ['',Validators.required],
        confirmPassword: ['',Validators.required]
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword')
      }
    );
  }

  ngOnInit() {}

  async onSubmit() {
    this.submited = true;
    //remover
    localStorage.removeItem('uid_indicador');
    localStorage.removeItem('uid_ficha');
    localStorage.removeItem('uid_paciente');
    localStorage.removeItem('token');
    localStorage.removeItem('uid_user');

    const loading = await this.loadingCtrl.create({message: 'Cargando ... un momento por favor'});
    if (this.registerFrm.invalid){
      return true;
    }
    await loading.present();
    const valueForm = this.registerFrm.value;
    const data ={
      email:valueForm.email,
      password: valueForm.password,
      img:'',
       // eslint-disable-next-line @typescript-eslint/naming-convention
      estado_usuario:'1'
    };
    this.apiServce.register(data).subscribe(async (response: UserResponse) => {
      console.log(response);
      const user = response.usuario;

      if(response.ok){
        localStorage.setItem('token', response.token);
        localStorage.setItem('uid_user', response.usuario.uid);
        this.registerPaciente(user,loading);
      }
    }, async (error) => {
      console.log(error);
      const er = error.error;
      const toastError = await this.toastCtrl.create({message: `El registro fallo`, duration: 2500});
      await toastError.present();
      await loading.dismiss();
    }, () => {
      loading.dismiss();
    });
  }

  registerPaciente(user,loading) {
    const valueForm = this.registerFrm.value;
    const data ={
      nombre:valueForm.names,
      apellidos:valueForm.lastnames,
      genero:valueForm.sexo,
      edad:valueForm.edad,
      celular:valueForm.phone,
      dociden:valueForm.dni,
      usuario:user.uid
    };
    console.log(data);
    this.pacienteService.registerPaciente(data).subscribe(async (response: any) => {
      console.log('register paciente: ',response);
     // eslint-disable-next-line no-underscore-dangle
      localStorage.setItem('uid_paciente', response.paciente._id);
      const toastSuccess = await this.toastCtrl.create({message: `Bienvenido ${user.email}`, duration: 2500});
      await toastSuccess.present();
     // this.router.navigate(['home/sky']);
      await this.router.navigate(['/home/sky']);

    }, async (error) => {
      console.log(error);
      const er = error.error;
      const toastError = await this.toastCtrl.create({message: `El registro fallo`, duration: 2500});
      await toastError.present();
      await loading.dismiss();
    }, () => {
      loading.dismiss();
    });
  }
}
