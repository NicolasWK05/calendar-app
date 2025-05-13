import { Route, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: CalendarComponent },
    { path: 'login', component: LoginComponent},
    { path: ':calendarId', component: CalendarComponent },
    
];
