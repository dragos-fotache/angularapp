import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';

import { Article } from '../model/article.model';

import { Base64 } from "../util/base64";

@Injectable()
export class ArticleService {

    private path = 'http://192.168.35.107:8081/backend/articles';
    //private path = 'http://localhost:8081/backend/articles';

    private newurl = this.path + '/new';
    private updateurl = this.path + '/update';
    private deleteurl = this.path + '/delete';
    private testurl = this.path + '/test';
    private loginurl = this.path + '/login';
    private logouturl = this.path + '/logout';

    constructor(private http: Http) {
    }

    getArticles() {
        
        let options = new RequestOptions({ withCredentials: true });

        return this.http.get(this.path, options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getArticlesSlice(first: Number, rows: Number, sortField: String, sortOrder: Number, searchStringParam: String) {
        var order = sortOrder == 1 ? 'asc' : 'desc';
        var searchString =  (searchStringParam == undefined || searchStringParam == '') ? '*' : searchStringParam;

        let options = new RequestOptions({ withCredentials: true });

        return this.http.get(this.path + '/' + first + '/' + rows + '/' + sortField + '/' + order + '/' + searchString, options)
            .toPromise()
            .then(response => response)
            .catch(response => response);
    }

    newArticle(article: Article) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(this.newurl, article, options)
                        .toPromise()
                        .then(response => response)
                        .catch(response => response);

    }

    updateArticle(article: Article) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(this.updateurl, article, options)
                        .toPromise()
                        .then(response => response)
                        .catch(response => response);

    }

    deleteArticle(id: Number) {

        let options = new RequestOptions({ withCredentials: true });
        return this.http.post(this.deleteurl + '/' + id, "", options)
                        .toPromise()
                        .then(response => response)
                        .catch(response => response);
    }

    testLogin() {

        let options = new RequestOptions({ withCredentials: true });

        return this.http.get(this.testurl, options)
                        .toPromise()
                        .then(response => response.status)
                        .catch(response => response.status);
    }
    
    login(user, password) {
        let loginString: string = user + ":" + password;
        let authString = "Basic " + new Base64().encode(loginString);

        let headers = new Headers({ 'Authorization': authString });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.get(this.loginurl, options)
                        .toPromise()
                        .then(response => response)
                        .catch(response => response);
    }

    logout() {
        let options = new RequestOptions({ withCredentials: true });

        return this.http.get(this.logouturl, options)
                        .toPromise();
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}