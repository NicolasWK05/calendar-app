import { Route, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateCalendarComponent } from './create-calendar/create-calendar.component';

export const routes: Routes = [
    { path: '', component: CalendarComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'profile/:userId', component: ProfileComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'create-calendar', component: CreateCalendarComponent },
    { path: ':calendarId', component: CalendarComponent },
];
