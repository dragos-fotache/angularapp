import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { Article } from '../model/article.model';


@Injectable()
export class ArticleService {

    private url = 'http://192.168.35.90:8081/backend/articles';
    private newurl = 'http://192.168.35.90:8081/backend/articles/new';
    private updateurl = 'http://192.168.35.90:8081/backend/articles/update';
    private deleteurl = 'http://192.168.35.90:8081/backend/articles/delete';

    extractData;

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

    newArticle(article: Article) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.newurl, article, options)
                        .toPromise()
                        .catch(this.handleError);

    }

    updateArticle(article: Article) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.updateurl, article, options)
                        .toPromise()
                        .catch(this.handleError);

    }

    deleteArticle(id: Number) {

        return this.http.post(this.deleteurl + '/' + id, "")
                        .toPromise()
                        .catch(this.handleError);

    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}