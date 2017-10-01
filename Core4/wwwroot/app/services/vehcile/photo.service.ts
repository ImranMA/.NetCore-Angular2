import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';


@Injectable()
export class PhotoService {
    
    constructor(private http: Http) { }

    upload(vehcileId: any, file: any) {
        
        var formData = new FormData();
        formData.append('file', file);
        return this.http.post(`/api/vehciles/${vehcileId}/photos`, formData)
            .map(res => res.json());
       
    }


    getPhotos(vehcileId: any) {
        
        return this.http.get(`/api/vehciles/${vehcileId}/photos`)
            .map(res => res.json());
        
    }
   
}