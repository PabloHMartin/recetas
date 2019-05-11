import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  signalAppId = 'bce9b9d3-799e-4e0a-8e4c-35bf8ceb49b3';
  firebaseId = '228635509158';


  configuracionInicial(){

    this.oneSignal.startInit(this.signalAppId, this.firebaseId );

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
    this.oneSignal.handleNotificationReceived().subscribe((notificacion) => {
      console.log('notificación recibida' + notificacion);
    });
    
    this.oneSignal.handleNotificationOpened().subscribe((notificacion) => {
      console.log('notificación abierta recibida' + notificacion);
    });
    
    this.oneSignal.endInit();
 }


}
