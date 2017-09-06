import { ToastyService } from 'ng2-toasty';
import { vehcileService } from "../../services/vehcile/vehcile.service";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: '/home/ViewVehcile'
    ,
     
    providers: [
        vehcileService, ToastyService
    ]
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number; 

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private vehicleService: vehcileService) { 

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return; 
      }
    });
  }

  ngOnInit() {
      this.vehicleService.getVehcile(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return; 
          }
        });
  }

  
  delete() {
      if (confirm("are you sure?")) {

          this.vehicleService.delete(this.vehicle.id).subscribe(x => {
              this.router.navigate(['/vehciles']);
          });
      }
  }
}