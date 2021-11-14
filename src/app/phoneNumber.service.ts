import { HttpClient } from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { phoneNumber } from './phoneNumber';

@Injectable({
    providedIn:'root'
})

export class phoneService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getPhones(): Observable<phoneNumber[]>
    {
        return this.http.get<phoneNumber[]>(`${this.apiServerUrl}/phone/findAll`);
    }


    public addPhone(phoneNumber: string): Observable<void>{
        return this.http.get<void>(`${this.apiServerUrl}/phone/find/${phoneNumber}`);
    }
    public updatePhone(phone: phoneNumber): Observable<phoneNumber>{
        return this.http.put<phoneNumber>(`${this.apiServerUrl}/phone/update`,phone);
    }

}