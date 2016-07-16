import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Article } from '../model/article.model';


@Injectable()
export class ArticleService {

    private url = 'http://localhost:8081/backend/articles';

    constructor(private http: Http) {
    }

    getArticles() {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getArticlesSlice(first: Number, rows: Number, sortField: String, sortOrder: Number, searchStringParam: String) {
        var order = sortOrder == 1 ? 'asc' : 'desc';

        var searchString =  (searchStringParam == undefined || searchStringParam == '') ? '*' : searchStringParam;

        return this.http.get(this.url + '/' + first + '/' + rows + '/' + sortField + '/' + order + '/' + searchString)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}