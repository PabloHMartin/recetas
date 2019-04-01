export interface User {
    uid: string;
    password?: string;
    email: string;
    permiteNotificaciones?: boolean;
    photoURL?: string;
    displayName?: string;
    deviceToken?: string;
    recetasHabituales?: string;
}
