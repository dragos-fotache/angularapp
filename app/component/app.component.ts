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

import { ArticleService } from '../service/article.service';
import { Article } from '../model/article.model';



@Component({
    selector: 'app',
    template: `
        <div class="container">
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
                <label for="searchField">Search:  </label>
                <input type="text" pInputText id="searchField" [(ngModel)]="searchTextModel"/>
                <button pButton type="button" (click)="onClickSearch()" label="Search"></button>
            </div>
        </div>
              `,
    directives: [ArticleTableComponent, InputText, Button], 
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

}
