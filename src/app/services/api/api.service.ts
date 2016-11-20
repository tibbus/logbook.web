import { Injectable } from '@angular/core';

import { API } from './api';

@Injectable()
export class ApiService {
    // Hardcoded user :
    private userId: string = '1';
    private streamClient: any;

    private get user(): string {
        return `${API.user}${this.userId}`;
    } 

    public getUserId(): string {
        return this.userId;
    } 

    public setUser(userId: string) {
       this.userId = userId;
    }

    public getCarTimelineUrl(carId: string): string {
        return `${API.root}${API.timeline}${carId}`;
    }

    public getUserCarsUrl(): string {
        return `${API.root}${this.user}${API.userCars}`;
    }

    public getProfileUrl(): string {
        return `${API.root}${this.user}`;;
    }

    public getRegisterCarUrl(regNumber: string): string {
        return `${API.root}${this.user}${API.userRegisterCar}${regNumber}`;
    }

    public getRemoveCarUrl(id: string): string {
        return `${API.root}${this.user}${API.userRemoveCar}${id}`;
    }

    public getAddPostUrl(userCarId: string, postType: string): string {
        return `${API.root}${API.post}${userCarId}/${postType}`;
    }

    public getUpdatePostUrl(userCarId: string, postType: string, postId: string): string {
        return `${API.root}${API.post}${userCarId}/${postType}/${postId}`;
    }

    public getSearchUrl(term: string) {
        return `${API.search}${term}*`;
    }

    public getTokenUrl() {
        return `${API.root}${API.token}`;
    }

    public getFollowUrl(carId: string) {
        return `${API.root}${this.user}${API.follow}${carId}`;
    }

    public getUnFollowUrl(carId: string) {
        return `${API.root}${this.user}${API.unFollow}${carId}`;
    }

    public getCommentsUrl(postId: string) {
        return `${API.root}${API.timeline}${postId}${API.comment}`;
    }

    public getChangeCommentsUrl(postId: string, commentId: string) {
        return `${API.root}${API.timeline}${postId}${API.comment}/${commentId}`;
    }

    public getCarImageUploadUrl(carId: string) {
        const carUrl: string = `${API.root}${API.carImage}`

        return carUrl.replace('{id}', carId);
    }

    public getCarInfoUrl(carInfoId: string) {
        const url = `${API.root}${API.carInfo}`;

        return url.replace('{id}', carInfoId);
    }

    public setStreamClient(streamClient: any) {
        this.streamClient = streamClient;
    }

    public getStreamClient() {
        return this.streamClient;
    }
}