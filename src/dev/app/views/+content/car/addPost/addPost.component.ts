﻿import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, CarService, StatusService, TimelineService, MediaService } from '../../../../services/index';
import { LoadingComponent } from '../../../../common/loading/loading.component';
import { RegNumberPipe } from './regNumber.pipe'

@Component({
    selector: 'add-post',
    styleUrls: ['src/dist/app/views/+content/car/addPost/addPost.component.css'],
    templateUrl: 'src/dev/app/views/+content/car/addPost/addPost.component.html',
    directives: [
        LoadingComponent
    ],
    pipes: [RegNumberPipe]
})

export class AddPostComponent {
    
    currentStatus: string;
    loading: boolean = false;
    carInfo: any;
    carRegNumber: string;

    constructor(
        private _carService: CarService,
        private statusService: StatusService,
        private timelineService: TimelineService,
        private mediaService: MediaService
    ) {}

    ngOnInit() {
        this.carInfo = this._carService.selectedCar.car;
        this.carRegNumber = this._carService.selectedCar.registrationNumber.toUpperCase();
    }

    test(e: any) {
        console.log(e.target.files[0]);
        this.mediaService.addStatus(e.target.files).subscribe(
            res => {
                console.log(res);
                this.timelineService.getPosts(true);
            })
    }

    clickAddStatus() {
        this.loading = true;
        console.log(this.currentStatus)

        this.statusService.addStatus(this.currentStatus).delay(1000).subscribe(
            res => {
                // clear the textarea
                this.currentStatus = null;

                console.log(res);
                this.loading = false;

                // update the status list (make a new server request in the service)
                this.timelineService.getPosts(true);
            },
            error => this.handleError(error)
        );
    }

    handleError(error: Error) {
        this.loading = false;

        console.log(error);
    }
}