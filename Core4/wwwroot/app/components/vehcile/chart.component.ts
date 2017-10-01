import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';



@Component({
    selector: "chart-view",
    templateUrl: "/home/Charts"

})


export class ChartsComponent implements OnInit {
    constructor() { }

    data1 = {
        labels: ['BMW', 'AUDI', 'Mazda'],
        datasets: {
            data: [5, 3, 1]
        }
    }

    type = 'line';
    data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };
    options = {
        responsive: true,
        maintainAspectRatio: false
    };

    ngOnInit() {
       // this.checkScreenWidth();
    }
}

