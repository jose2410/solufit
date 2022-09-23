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
     private apiServce: AuthService) {
    this.registerFrm = this.fb.group(
      {
        email: ["",Validators.required],
        password: ["",Validators.required],
        confirmPassword: ["",Validators.required]
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
  }

  ngOnInit() {}

  async onSubmit() {
    this.submited = true;
    console.log(this.registerFrm.value);
    const loading = await this.loadingCtrl.create({message: 'Cargando ... un momento por favor'});
    if ( this.registerFrm.invalid){
      return true;
    }
    await loading.present();
    const valueForm = this.registerFrm.value;
    const data ={
      email:valueForm.email,
      password: valueForm.password,
      img:'',
       // eslint-disable-next-line @typescript-eslint/naming-convention
      fecha_creacion: '',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      fecha_modificacion: '',
       // eslint-disable-next-line @typescript-eslint/naming-convention
      estado_usuario:'1'
    };
    this.apiServce.register(data).subscribe(async (response: UserResponse) => {
      const user = response.usuario;

      localStorage.setItem('token', response.token);

      const toastSuccess = await this.toastCtrl.create({message: `Bienvenido ${user.email}`, duration: 2500});
      await toastSuccess.present();
     // this.router.navigate(['home/sky']);
      await this.router.navigate(['/home/sky'], {replaceUrl: true, queryParams: {auth: true}});

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
