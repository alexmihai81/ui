import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { url } from "../constants/urls.constants";
import { Breed } from "../models/breed.model";
import { ProfileRequest } from "../models/profile-request.model";
import { Profile } from "../models/profile.model";
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

    getSelectedAnimal(userId: number): Observable<any> {
        return this.http.get<any>(`${url}/animal/${userId}`);
    }

    getAllAnimalsForUser(userId: number): Observable<any> {
        return this.http.get<any>(`${url}/animals/${userId}`);
    }

    saveAnimal(request: ProfileRequest): Observable<any> {
        return this.http.post(`${url}/save_animal`, request);
    }

    updateAnimal(request: ProfileRequest): Observable<any> {
        return this.http.put(`${url}/edit_animal/${request.id}`, request);
    }

    selectAnimal(userId: number, id: number): Observable<any> {
        return this.http.get(`${url}/select_animal/${userId}/${id}`);
    }

    deleteProfile(id: number, userId: number): Observable<any> {
        return this.http.delete(`${url}/delete_animal/${userId}/${id}`);
    }

    getPossibleMatches(id: number): Observable<Profile[]> {
        return this.http.get<Profile[]>(`${url}/get_matching/${id}`);
    }

    setLike(id1: number, id2: number, like: boolean): Observable<any> {
        return this.http.post(`${url}/like/animals`, { idAnimal1: id1, idAnimal2: id2, like });
    }

    getMatches(id: number): Observable<Profile[]> {
        return this.http.get<Profile[]>(`${url}/get_matches/${id}`);
    }

    deleteMatch(id: number, profileId: number): Observable<void> {
        return this.http.get<void>(`${url}/delete_match/${id}/${profileId}`);
    }

    getChats(id: number): Observable<any> {
        return this.http.get<any>(`${url}/getChats/${id}`);
    }

    createChat(id: number): Observable<number> {
        return this.http.get<number>(`${url}/create_chat/${id}`);
    }
}
