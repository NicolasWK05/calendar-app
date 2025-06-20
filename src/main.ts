import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import axios from 'axios';
import { environment } from './environments/environment.development';

axios.defaults.baseURL = environment.apiUrl;

axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  config.headers['Allow-Origin'] = '*'; // Allow CORS for all origins
  config.headers['Access-Control-Allow-Origin'] = '*'; // Allow CORS for all origins
  return config;
})

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
