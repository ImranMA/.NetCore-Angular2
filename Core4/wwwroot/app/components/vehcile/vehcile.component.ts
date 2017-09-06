import * as _ from 'underscore';
import * as Raven from 'raven-js';
import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/Observable/forkJoin';
import { vehcileService } from "../../services/vehcile/vehcile.service";
import { SaveVehcile, Vehcile } from "../../model/vehcile/vehcile";


//Raven.config('https://55c283ba3ad640a785d33b0aac706954@sentry.io/208882').install();



@Component({
    selector: "mvc",
    templateUrl: '/home/vehcile'
    ,
    providers: [
        vehcileService, ToastyService
    ]
})


export class VehcileFormComponent implements OnInit {

    makes: any[];
    models: any[]
    features: any[]

    myvehcile: SaveVehcile = {    
        id:0,
        makeId: 0,
        modelId: 0,
        isRegistered: false,
        features: [],
        contact: {
            name: '',
            phone: '',
            email:''
        }
    };
    

    constructor(
        private route: ActivatedRoute, 
        private router: Router,
        private vechileService: vehcileService,
        private ToastyService: ToastyService) {
        route.params.subscribe(p => {
            this.myvehcile.id = +p['id'];
        });
    }

    ngOnInit() {


        var sources = [

            this.vechileService.getMakes(),
            this.vechileService.getFeatures() 
        ]

        if (this.myvehcile.id) {
            sources.push(this.vechileService.getVehcile(this.myvehcile.id));
        }

        Observable.forkJoin(sources).subscribe(data => {
            this.makes = data[0];
            this.features = data[1];
            if (this.myvehcile.id)
                this.setVehcile(data[2]);
            this.populdateModels();


            }, err => {
                if (err.status == 404)
                    this.router.navigate(['/home/index']);
            })
            /*
        
            .subscribe(v => {
                this.myvehcile = v
            }, err => {
                if (err.status == 404)
                    this.router.navigate(['/home/index'])
            });
        
       .subscribe(makes => {
            this.makes = makes;           
        })


        .subscribe(feature => {            
            this.features = feature ;
        })*/
    }

    private populdateModels() {
        var SelectedMake = this.makes.find(m => m.id == this.myvehcile.makeId)
        this.models = SelectedMake ? SelectedMake.models : [];
    }
   
    private setVehcile(v: Vehcile) {
        this.myvehcile.id = v.id;
        this.myvehcile.makeId = v.make.id;
        this.myvehcile.modelId = v.model.id;
        this.myvehcile.isRegistered = v.isRegistered;
        this.myvehcile.contact = v.contact;
        this.myvehcile.features = _.pluck(v.features,'id');
    }

 
    onMakeChange() {
        this.populdateModels();
        delete this.myvehcile.modelId;
       // this.vehcile.Name = SelectedMake.name;
    }




    onFeatureToggle(featureId: any, $event: any) {
        
        if ($event.target.checked)
            this.myvehcile.features.push(featureId);
        else {
            var index = this.myvehcile.features.indexOf(featureId);
            this.myvehcile.features.splice(index, 1);
        }

    }

    submit() {
        
        //Raven.captureException(new Error(""));
        //this.ToastyService.error({ title: 'Error', msg: 'An unexpacte', theme: 'bootstrap', showClose: true, timeout: 5000 });
        //this.ToastyService.error({ title: 'Error', msg: 'An unexpacte', theme: 'bootstrap', showClose: true, timeout: 5000 });
        if (this.myvehcile.id) {
            this.vechileService.update(this.myvehcile).subscribe(x => {
                this.ToastyService.success({ title: 'Success', msg: 'Vehcile Updated Successfully', theme: 'bootstrap', showClose: true, timeout: 5000 });
            });
        }
        else {

            this.vechileService.create(this.myvehcile).subscribe(x => {
                this.ToastyService.success({ title: 'Success', msg: 'Vehcile created Successfully', theme: 'bootstrap', showClose: true, timeout: 5000 });

            }, err => {
                this.ToastyService.error({ title: 'Error', msg: 'error somehitng', theme: 'bootstrap', showClose: true, timeout: 5000 });
            });
         //   this.vechileService.create(this.myvehcile).subscribe(
           //     this.ToastyService.success({ title: 'Success', msg: 'Vehcile Added Successfully', theme: 'bootstrap', showClose: true, timeout: 5000 });
                
       // );
            
        } 
    }


    delete()
    {
        if (confirm("are you sure?")) {
            
            this.vechileService.delete(this.myvehcile.id).subscribe(x => {
                this.router.navigate(['home/index']);
            });
        }
    }

}

