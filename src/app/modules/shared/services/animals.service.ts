import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { url } from "../constants/urls.constants";
import { Breed } from "../models/breed.model";
import { Species } from "../models/species.model";

@Injectable({
    providedIn: 'root'
})
export class AnimalsService {
    constructor(private http: HttpClient) { }

    getSpecies(): Observable<Species[]> {
        return this.http.get<Species[]>(`${url}/animal/get_species`);
    }

    getBreeds(): Observable<Breed[]> {
        return this.http.get<Breed[]>(`${url}/animal/get_breeds`);
    }
}