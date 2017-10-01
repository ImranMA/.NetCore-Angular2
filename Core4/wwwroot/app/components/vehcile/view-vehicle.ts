import { ToastyService } from 'ng2-toasty';
import { vehcileService } from "../../services/vehcile/vehcile.service";
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from "../../services/vehcile/photo.service";
import { ProgressService, BrowserXhrWithProgress } from "../../services/vehcile/progress.service";
import { BrowserXhr } from "@angular/http";

@Component({
    templateUrl: '/home/ViewVehcile'
    ,
     
    providers: [
        vehcileService, ToastyService, { provide: BrowserXhr, useClass: BrowserXhrWithProgress }, ProgressService
    ]
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;
  
  vehicle: any;
  vehicleId: number; 
  photos: any[]
  progress:any

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private photoService: PhotoService,
    private progressService : ProgressService,
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


      this.photoService.getPhotos(this.vehicleId).
          subscribe(photos => this.photos = photos);


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


  uploadPhoto() {
      
   


      this.progressService.startTracking()
          .subscribe(progress => {
              console.log(progress);
              this.zone.run(() => {
                  this.progress = progress;
              });
             // this.progress = progress; //angular is not aware of this change so it wont show the progress bar, we need to run this in zone
          }, null, () => { this.progress = null });
      var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
      var file = nativeElement.files[0];
      nativeElement.value = '';

      this.photoService.upload(this.vehicleId, file)
          .subscribe(photo => {             
              this.photos.push(photo);
          }, err => {
              debugger
              this.toasty.error({ title: 'Error', msg: err.text(), theme: 'bootstrap', showClose: true, timeout: 5000 });            

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