import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/primeng';
import { DataGrid } from 'primeng/primeng';
import { InputText } from 'primeng/primeng';
import { Button } from 'primeng/primeng'
import { DataTable } from 'primeng/primeng';

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
                        <form (ngSubmit)="onClickSearch()">
                            <label for="searchField">Search:  </label>
                            <input type="text" pInputText id="searchField" [(ngModel)]="searchTextModel"/>
                            <button pButton type="submit" label="Search"></button>
                        </form>
                    </div>
                </div>
                <div class="ui-g-12 ui-md-2 ui-widget ui-widget-header ui-g-nopad">
                    <div style="margin-left:5px; margin-bottom:2em; margin-top:5px">Menu</div>
                    <div style="margin-left:5px">
                        <l-button [label]="'New'" [icon]="'fa-file-o'" (onClick)="onLButtonClicked1()"></l-button>
                        <l-button [inverted]="true" [icon]="'fa-edit'" [label]="'Edit'" (onClick)="onLButtonClicked2()" style="position: relative;left: 20%"></l-button>
                    </div>
                    <div style="margin-left:5px;position:relative;top:70px">
                        <l-button [label]="'Duplicate'" [icon]="'fa-copy'" [green]="true" (onClick)="onLButtonClicked1()"></l-button>
                        <l-button [label]="'Delete'" [icon]="'fa-eraser'" [inverted]="true" [green]="true" (onClick)="onLButtonClicked2()" style="position: relative;left: 20%"></l-button>
                    </div>
                </div>
            </div>
        </div>
              `,
    directives: [ArticleTableComponent, InputText, Button, LButtonComponent], 
    providers: [ArticleService]
})
export class AppComponent 
{ 
    @ViewChild('tab') tab: ArticleTableComponent;

    sliceAndCount = {
        articles: [],
        count: 0
    };

    searchTextModel: String;
    searchText: String;

    public onSearch: EventEmitter<any>;

    selectedArticle: Article;

    constructor(private articleService: ArticleService) { 
        this.onSearch = new EventEmitter();
    }

    lazyLoadArticles(event: LazyLoadEvent) {
        this.selectedArticle = undefined;
        this.articleService.getArticlesSlice(event.first, event.rows, event.sortField, event.sortOrder, this.searchText)
                        .then(sliceAndCount => this.sliceAndCount = sliceAndCount);
    }

    setSelectedArticle(article) {
        this.selectedArticle = article;
    }

    onClickSearch() {
        this.searchText = this.searchTextModel;
        this.tab.resetPaginator();
        return false;
    }

    onLButtonClicked1() {
        console.log("L-Button1 clicked!");
    }

    onLButtonClicked2() {
        console.log("L-Button2 clicked!");
    }

}
