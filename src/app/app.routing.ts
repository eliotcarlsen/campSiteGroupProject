import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CampgroundDataComponent } from './campground-data/campground-data.component';
import { MapComponent } from './map/map.component';
import { WeatherComponent } from './weather/weather.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AuthenticationComponent
  },
  {
    path: 'results/:id',
    component: MapComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
