﻿import { NgModule } from '@angular/core';

import { routing }  from './car.routing';
import { SharedModule } from '../../../shared/shared.module';

import { CarComponent } from './car.component';
import { CarNavigationComponent } from './carNavigation/carNavigation.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { TechSpecComponent } from './techSpec/techSpec.component';
import { CarOwnerComponent } from './carOwner/carOwner.component';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [
        CarComponent,
        CarNavigationComponent,
        ShowcaseComponent,
        TechSpecComponent,
        CarOwnerComponent
    ]
})

export class CarModule {}

