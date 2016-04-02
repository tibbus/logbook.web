﻿import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Response}    from 'angular2/http';
import {ProfileService} from '../../../profile/profile.service';
import {Profile} from '../../../profile/profile';
import {LoadingComponent} from '../../../common/loading/loading.component';
import {AlertComponent} from '../../../common/alert/alert.component';

@Component({
    selector: 'profile',
    styleUrls: ['src/dist/app/views/content/profile/profile.component.css'],
    templateUrl: 'src/dev/app/views/content/profile/profile.component.html',
    providers: [HTTP_PROVIDERS, ProfileService],
    directives: [LoadingComponent, AlertComponent]
})

export class ProfileComponent {
    constructor(private _profileService: ProfileService) { }

    private profile: Profile;
    public message: string;
    private loading: boolean;
    private profileLoading: boolean;
    public requestState: boolean;

    getProfile() {
        this.message = null;
        this.profileLoading = true;

        this._profileService.getProfile()
            // TODO : testing delay, to be removed
            //.delay(3000)
            .subscribe(
            profile => {
                this.profileLoading = false;

                this.profile = profile;
            },
            error => this.handleError(error));
    }

    saveProfile() {
        this.message = null;
        this.loading = true;

        this._profileService.setProfile(this.profile)
            // TODO : testing delay, to be removed
            //.delay(2000)
            .subscribe(
            profile => {
                this.loading = false;

                this.message = 'Profile saved !';
                this.requestState = true;
            },
            error => this.handleError(error));
    }

    ngOnInit() {
        this.getProfile();
    }

    private handleError(error: Response) {
    // TODO : testing delay, to be removed
        setTimeout(() => {
            this.loading = false;
            this.profileLoading = false;
            this.requestState = false;

            this.message = error.text() || 'Server error, please try again !';
        }, 3);
    }
}