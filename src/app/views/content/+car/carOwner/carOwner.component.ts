﻿import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CarService, ProfileService, FollowService } from '../../../../services';

@Component({
    selector: 'car-owner',
    styleUrls: ['./carOwner.component.scss'],
    templateUrl: './carOwner.component.html'
})

export class CarOwnerComponent implements OnInit, OnDestroy {
    public user;
    public car;
    public carLoading: boolean = true;
    public followers: number = 0;
    public isFollowing: boolean = false;
    private route$: Subscription;

    constructor(
        private carService: CarService,
        private profileService: ProfileService,
        private followService: FollowService,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.route$ = this.route.params.subscribe(params => {
            this.car = this.carService.getCarByRoute(params['id']);

            this.setCarInfos();

            // Set Follow info
            this.followService.getCarFollowers(this.car.id).subscribe(followers => this.followers = followers.length);
            this.followService.isUserFollowing(this.car.id).subscribe(isFollowing => this.isFollowing = isFollowing);
        });
    }

    ngOnDestroy() {
        this.route$.unsubscribe();
    }

    public clickFollow() {
        this.followService.followCar(this.car.id).subscribe(data => {
            this.isFollowing = true;
        });
    }

    public clickUnFollow() {
        this.followService.unFollowCar(this.car.id).subscribe(data => {
            this.isFollowing = false;
        });
    }

    public clickChangePhoto(file: any) {
        if (!this.car.isUserCar) {
            return;
        }

        if (!file) {
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.carService.uploadProfileImage(this.car.id, file).subscribe();

            this.car.info.image = e.target.result;

            this.changeDetector.detectChanges();
        }
        reader.readAsDataURL(file);
    }

    private setCarInfos() {
        if (this.car.isUserCar) {
            this.profileService.getProfile().subscribe(user => {
                this.user = user;

                this.carService.getCars().subscribe(cars => {
                    this.user.carsCount = cars.length;

                    this.carLoading = false;
                })
            });
        } else {
            this.profileService.getUser(this.car.id).subscribe(user => {
                this.user = user;

                this.carService.getUserCars(this.user.userId).subscribe(cars => {
                    this.user.carsCount = cars.length;

                    this.setCar(cars);
                })
            });
        }
    }

    private setCar(cars) {
        this.carLoading = false;
        this.car = cars.find(car => car.id == this.car.id);
    }
}