import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class ClientIndividualServiceService {

  constructor(private readonly httpClient:HttpClient){}

}

