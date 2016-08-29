﻿import { Component } from '@angular/core';

import { MotDetailsModalContent } from './motDetailsModalContent.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { ModalService } from '../../../../services/index';

@Component({
    selector: 'mot-details-modal',
    templateUrl: 'src/dev/app/components/modal/modal.component.html',
    directives: [MotDetailsModalContent]
})

export class MotDetailsModalComponent {
    constructor(private _modalservice: ModalService) {
        //super(_modalservice);

        //this.title = 'MOT details';
    }
}