import { Injectable } from '@angular/core';
import { Headers, RequestOptions ,Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SaveVehcile } from "../../model/vehcile/vehcile";


@Injectable()
export class vehcileService {
    private readonly vechilesEndPoint = '/api/vehciles';
    constructor(private http: Http) { }

    getMakes() {
        
        return this.http.get('/api/makes')
            .map(res => res.json());
    }


    getFeatures() {
        return this.http.get('/api/Featrues')
            .map(res => res.json());
    }

    create(vehcile:  any) {
        //debugger
       // let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        //headers.append('Accept', 'application/json');
        //let body = JSON.stringify(vehcile);
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });


        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        //let toAdd = JSON.stringify(vehcile);

        
        
        if (isNaN(parseFloat(vehcile.id)))
            delete vehcile.id;

        let body = {
            id: NaN,
            contact: {
                name: 'David johnn',
                phone: 'david@g.com',
                email: '04553'
            },
            features: [2, 3],
            isRegistered: true,
            modelId: "2",
            makeId :"2",
           
            
        };



      //  vehcile = body;

        return this.http.post('/api/vehciles', vehcile ).map(res => res.json());
    }

    getVehcile(id: any) {
        
        return this.http.get('/api/vehciles/' + id).map(res => res.json());
    }


    getVehciles(filter: any) {
        
        //filter = JSON.stringify(filter);
        //return this.http.get(this.vechilesEndPoint + '?filterresource=' + filterresource).map(res => res.json());
        return this.http.get(this.vechilesEndPoint + '?' + this.toQueryString(filter)).map(res => res.json());
    }

    toQueryString(obj : any) {
        var parts = [];

        for (var property in obj) {
            var value = obj[property];
            if (value != null && value != undefined)
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value) );
        }

        return parts.join('&');
    }



    update(vehcile: SaveVehcile) {
        return this.http.put('/api/vehciles/' + vehcile.id, vehcile)
            .map(res => res.json());
    }  

    delete(id:any) {        
        return this.http.delete('/api/vehciles' + id)
            .map(res => res.json());     
        
    }
}