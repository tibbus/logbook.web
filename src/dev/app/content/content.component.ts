﻿import {Component} from 'angular2/core';

@Component({
    selector: 'top-bar',
    templateUrl: 'src/dev/app/topBar/topBar.component.html'
})

export class AppComponent {
    public sayHello: string = "Hello there !";
}