﻿import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ProfileService, SearchService, FollowService, AuthService, StreamService, CarService } from '../../services/index';
import { Profile } from '../../services/profile/profile.model';
import { Router } from '@angular/router';

@Component({
    selector: 'header',
    styleUrls: ['./header.component.scss'],
    templateUrl: '././header.component.html',
    providers: [SearchService],
    host: {
        '(document:click)': 'clickOutside($event)',
    },
})

export class HeaderComponent implements OnInit {
    public profile: Profile;
    public name: string;
    public errorMessage: string;
    private searchTermStream = new Subject();
    hideSearchResults: boolean = true;
    followState: boolean;
    public isFollowEnabled: boolean = false;
    public items$: Observable<string[]>;
    public cars: any[] = [];

    constructor(
        private profileService: ProfileService,
        private searchService: SearchService,
        private followService: FollowService,
        private router: Router,
        private authService: AuthService,
        private streamService: StreamService,
        private carService: CarService
    ) { }

    ngOnInit() {
        this.getProfile();

        this.followService.requestUserFollowing().subscribe();
        this.followService.isUserFollowing$().subscribe((state: boolean) => {
            this.followState = state;
        })
        this.followService.getFollowState$().subscribe((state: boolean) => {
            this.isFollowEnabled = state;
        })

        this.items$ = this.searchService.getSearchResult();

        this.carService.getCars().subscribe(cars => {
            this.cars = cars;
        }, error => console.log(error))
    }

    public search(term: string) {
        this.hideSearchResults = false;

        // Send the new search word to the service, will do a .next on the Observable
        this.searchService.searchFor(term);
    }

    public clickFollow() {
        this.followService.followCar().subscribe(data => {
            this.followState = true;
        });
    }

    public clickUnFollow() {
        this.followService.unFollowCar().subscribe(data => {
            this.followState = false;
        });
    }

    public clickOutside($event: EventListener) {
        this.hideSearchResults = true;
    }

    public clickSearchResult(car) {
        const routeFromCar = `${car.make}-${car.model}-${car.carInfoId}`;
        const parsedRouteFromCar = routeFromCar.replace(/ /g, '-');

        this.router.navigateByUrl(`/cars/${parsedRouteFromCar}/timeline`);
    }

    public clickSignOut() {
        this.authService.signOut();
    }

    public clickLogin() {
        this.authService.signIn();
    }

    private getProfile() {
        this.profileService.getProfile()
            .subscribe(
            (profile: Profile) => {
                this.profile = profile;
                this.name = this.profile.name;
            },
            error => this.errorMessage = <any>error);
    }
}