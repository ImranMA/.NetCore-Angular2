import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';



@Component({
    selector: "aboutSelect",
    templateUrl: "/home/about"
    
})


export class AboutComponent implements OnInit {
    constructor(       
        private ToastyService: ToastyService) {       
    }

    ngOnInit() {
        this.checkScreenWidth();        
    }



    

    checkScreenWidth() {
        this.ToastyService.error({ title: 'Error', msg: 'An unexpacte', theme: 'bootstrap', showClose: true, timeout: 5000 });
    }

}

