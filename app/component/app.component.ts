import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Response } from '@angular/http';

import { LazyLoadEvent } from 'primeng/primeng';
import { DataGrid } from 'primeng/primeng';
import { InputText } from 'primeng/primeng';
import { Button } from 'primeng/primeng'
import { DataTable } from 'primeng/primeng';
import { Dialog } from 'primeng/primeng';

import { ArticleTableComponent } from './article-table.component';
import { LButtonComponent } from './l-button.component';

import { ArticleService } from '../service/article.service';
import { Article } from '../model/article.model';



@Component({
    selector: 'app',
    template: `
        <div class="container">
            <div class="ui-g">
                <div class="ui-g-12 ui-md-10 ui-g-nopad">
                    <div class="ui-widget ui-widget-content">
                        <div class="ui-g">
                            <div class="ui-g-1">Name:</div>
                            <div class="ui-g-3">{{selectedArticle ? selectedArticle.name : ""}}</div>
                            <div class="ui-g-1">Provider:</div>
                            <div class="ui-g-2">{{selectedArticle ? selectedArticle.provider : ""}}</div>
                        </div>
                        <div class="ui-g">
                            <div class="ui-g-1">PZN:</div>
                            <div class="ui-g-3">{{selectedArticle ? selectedArticle.pzn : ""}}</div>
                            <div class="ui-g-1">Packaging:</div>
                            <div class="ui-g-2">{{selectedArticle ? selectedArticle.packaging : ""}}</div>
                        </div>
                    </div>
                    <article-table 
                        #tab
                        [articles]="sliceAndCount.articles"
                        [totalRecords]="sliceAndCount.count"
                        (onLazyLoadArticles)="lazyLoadArticles($event)"
                        (onRowSelectEmitter)="setSelectedArticle($event)">
                    </article-table>
                    <div class="ui-widget ui-widget-header" style="padding: 10px 10px">
                        <div class="ui-g">
                            <div class="ui-g-9">
                                <form (ngSubmit)="onClickSearch()" style="margin-bottom: 0em;">
                                    <label for="searchField">Search:  </label>
                                    <input type="text" pInputText id="searchField" [(ngModel)]="searchTextModel"/>
                                    <button pButton type="submit" label="Search"></button>
                                </form>
                            </div>
                            <div class="ui-g-3">
                                <button pButton type="button" label="Logout" (click)="logout()" style="float:right"></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui-g-12 ui-md-2 ui-widget ui-widget-header ui-g-nopad">
                    <div style="margin-left:5px; margin-bottom:2em; margin-top:5px">Menu</div>
                    <div style="margin-bottom: 0.5em">
                        <button type="button" pButton label="New" icon="fa-file-o" (click)="showNewDialog()"></button>
                    </div>
                    <div style="margin-bottom: 0.5em">
                        <button type="button" pButton label="Edit" icon="fa-edit" (click)="showEditDialog()"></button>
                    </div>
                    <div style="margin-bottom: 0.5em"> 
                        <button type="button" pButton label="Delete" icon="fa-eraser" (click)="delete()"></button>
                    </div>
                </div>
            </div>
            <p-dialog header="Article details" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true">
                <div class="ui-grid ui-grid-responsive ui-fluid" *ngIf="article">
                    <div class="ui-grid-row">
                        <div class="ui-grid-col-5"><label for="PZN">PZN</label></div>
                        <div class="ui-grid-col-8"><input pInputText id="PZN" [(ngModel)]="article.pzn" /></div>
                    </div>
                    <br />
                    <div class="ui-grid-row">
                        <div class="ui-grid-col-5"><label for="name">Name</label></div>
                        <div class="ui-grid-col-8"><input pInputText id="name" [(ngModel)]="article.name" /></div>
                    </div>
                    <br />
                    <div class="ui-grid-row">
                        <div class="ui-grid-col-5"><label for="provider">Supplier</label></div>
                        <div class="ui-grid-col-8"><input pInputText id="provider" [(ngModel)]="article.provider" /></div>
                    </div>
                    <br />
                    <div class="ui-grid-row">
                        <div class="ui-grid-col-5"><label for="dosage">Dosage</label></div>
                        <div class="ui-grid-col-8"><input pInputText id="dosage" [(ngModel)]="article.dosage" /></div>
                    </div>
                    <br />
                    <div class="ui-grid-row">
                        <div class="ui-grid-col-5"><label for="packaging">Packaging</label></div>
                        <div class="ui-grid-col-8"><input pInputText id="packaging" [(ngModel)]="article.packaging" /></div>
                    </div>
                </div>
                <footer>
                    <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
                        <button type="button" pButton icon="fa-check" (click)="save()" label="Save"></button>
                    </div>
                </footer>
            </p-dialog>
            <p-dialog [header]="wasBadLogin ? 'Bad login!' : 'Login'" showEffect="fade" [responsive]="true" [modal]="true" [(visible)]="!loggedIn" >
                <form (ngSubmit)="login()" style="margin-bottom: 0em;">
                    <div class="ui-grid ui-grid-responsive ui-fluid">
                        <div class="ui-grid-row">
                            <div class="ui-grid-col-5">
                                <label for="user">User</label>
                            </div>
                            <div class="ui-grid-col-7">
                                <input pInputText id="user" [(ngModel)]="user" />
                            </div>
                        </div>
                        <br />
                        <div class="ui-grid-row">
                            <div class="ui-grid-col-5">
                                <label for="password">Password</label>
                            </div>
                            <div class="ui-grid-col-7">
                                <input pInputText id="password" type="password" [(ngModel)]="password" />
                            </div>
                        </div>
                    </div>
                    <footer>
                        <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
                            <button type="submit" pButton icon="fa-check" label="OK"></button>
                        </div>
                    </footer>
                </form>
            </p-dialog>
        </div>
              `,
    directives: [ArticleTableComponent, InputText, Button, Dialog], 
    providers: [ArticleService]
})
export class AppComponent implements OnInit { 
    @ViewChild('tab') tab: ArticleTableComponent;

    sliceAndCount = {
        articles: [],
        count: 0
    };

    displayDialog: Boolean = false;
    article: Article;
    isNewArticle: Boolean = false;

    loggedIn: Boolean = true;
    user: String;
    password: String;
    loginHeader = "Login";
    wasBadLogin: Boolean = false;

    searchTextModel: String;
    searchText: String;

    public onSearch: EventEmitter<any>;

    selectedArticle: Article;

    constructor(private articleService: ArticleService) { 
        this.onSearch = new EventEmitter();
    }

    setSelectedArticle(article) {
        this.selectedArticle = article;
    }

    onClickSearch() {
        this.searchText = this.searchTextModel;
        this.tab.resetPaginator();
        return false;
    }

    showNewDialog() {
        this.isNewArticle = true;
        this.article = new Article();
        this.displayDialog = true;
    }

    showEditDialog() {
        if (this.selectedArticle) {
            this.article = this.cloneArticle(this.selectedArticle);
            this.displayDialog = true;
        }
    }

    cloneArticle(a: Article): Article {
        let article = new Article();
        for(let prop in a) {
            article[prop] = a[prop];
        }
        return article;
    }

    lazyLoadArticles(event: LazyLoadEvent) {
        this.selectedArticle = undefined;
        this.articleService.getArticlesSlice(event.first, event.rows, event.sortField, event.sortOrder, this.searchText)
                        .then(response => {
                                    if (response.status == 200) {
                                        this.sliceAndCount = response.json()
                                    } else if (response.status == 401) {
                                        this.loggedIn = false;
                                    }
                                });
    }

    save() {
        if (this.isNewArticle) {
            this.articleService.newArticle(this.article).then(handleResponse(this));
        } else {
            this.articleService.updateArticle(this.article).then(handleResponse(this));
        }
        this.article = null;
        this.isNewArticle = false;
        this.displayDialog = false;
        return false;
    }

    delete() {
        if (this.selectedArticle) {
            this.articleService.deleteArticle(this.selectedArticle.id).
                            then(handleResponse(this));
        }
    }

    ngOnInit() {
    }

    testLogin() {
        this.articleService.testLogin().then(status => this.loggedIn = status == 200 ? true : false);
    }

    login() {
        this.articleService.login(this.user, this.password).then(handleLoginResponse(this));
        this.user = null;
        this.password = null;
    }

    logout() {
        this.articleService.logout().then(response => this.loggedIn = response.status == 200 ? false : this.loggedIn);
    }

    

}

function handleResponse(comp: AppComponent) {
    return function(response) {
        if (response.status == 200) {
            comp.tab.reloadPaginator();
        } else if (response.status == 401) {
            comp.loggedIn = false;
        }
    }
}

function handleLoginResponse(comp: AppComponent) {
    return function(response) {
        if (response.status == 200) {
            comp.loggedIn = true;
            comp.wasBadLogin = false;
            comp.tab.resetPaginator();
        } else {
            comp.loggedIn = false;
            comp.wasBadLogin = true;
        }
    }
}
