import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FichaNutricionalService {

  constructor(private http: HttpClient) {
  }


  registroFicha(data) {
    //TODO
    return this.http.post(environment.api_url + 'ficha', data);
  }

  getFichaById(id) {
    return this.http.get(environment.api_url + `ficha/${id}`);
  }

  getFichaByPacienteId(uid) {
    return this.http.get(environment.api_url + `ficha/paciente/${uid}`);
  }

  actualizarFicha( data: any ) {
    return this.http.put( environment.api_url + `ficha/${ data._id }`, data);
  }

  // Antecedentes Salud

  registroAntecendete(data) {
    //TODO
    return this.http.post(environment.api_url + 'antecedente', data);
  }

  // Estilo Vida
  registrEstiloVida(data) {
    //TODO
    return this.http.post(environment.api_url + 'estilo', data);
  }

  // idicador dietetico

  registrIndicador(data) {
    //TODO
    return this.http.post(environment.api_url + 'idicador', data);
  }

  actualizarIndicador( data: any ) {
    return this.http.put( environment.api_url + `idicador/${ data._id }`, data);
  }

  getIndicadoreId(id) {
    return this.http.get(environment.api_url + `idicador/${id}`);
  }

  //Registro estado

  registroEstado(data) {
    //TODO
    return this.http.post(environment.api_url + 'estado', data);
  }

  //PLAN
  getPlanByPacienteId(uid) {
    return this.http.get(environment.api_url + `plan/${uid}`);
  }
  getHorarioByPlanId(uid) {
    return this.http.get(environment.api_url + `horario/${uid}`);
  }
  getHorarioFechaRegistroById(id: any, fecha: any){
    return this.http.get(environment.api_url + `horario/hf/${id}/${fecha}`);
  }
  getComidaByHorarioId(uid) {
    return this.http.get(environment.api_url + `comida/${uid}`);
  }
  getComidadetail(uid) {
    return this.http.get(environment.api_url + `comida/ch/${uid}`);
  }

  actualizarComidaEstado( data: any ) {
    return this.http.put( environment.api_url + `comida/${ data._id }`, data);
  }

  //SEGUIMIENTO
  registrarActivida(data: any){
    return this.http.post(environment.api_url + 'seguimiento', data);
  }

  getSeguimientoByHorarioId(id){
    return this.http.get(environment.api_url + `seguimiento/${id}`);
  }

}
