import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Article } from '../model/article.model';

import { DataTable } from 'primeng/primeng';
import { Column } from 'primeng/primeng';
import { Header } from 'primeng/primeng';
import { Footer } from 'primeng/primeng';
import { LazyLoadEvent } from 'primeng/primeng';

@Component({
    selector: 'article-table',
    inputs: ['articles', 'totalRecords'],
    outputs: ['onLazyLoadArticles'],
    template: `
        <p-dataTable [value]="articles" 
                     selectionMode="single" 
                     [(selection)]="selectedArticle" 
                     resizableColumns="true" 
                     [lazy]="true"
                     [totalRecords]="totalRecords"
                     (onLazyLoad)="loadCarsLazy($event)"
                     [rows]="10" 
                     [paginator]="true" 
                     [pageLinks]="3" 
                     [rowsPerPageOptions]="[5,10,20]">
            <header>Article table</header>
            <p-column field="id" header="id" [sortable]="true"></p-column>
            <p-column field="pzn" header="PZN" [sortable]="true"></p-column>
            <p-column field="name" header="Name" [sortable]="true"></p-column>
            <p-column field="supplier" header="Supplier"></p-column>
            <p-column field="packing" header="Packing"></p-column>
            <footer> 
                <div style="text-align: left">{{selectedArticle ? selectedArticle.id + ' ' + selectedArticle.name: 'none'}}</div>
            </footer>
        </p-dataTable>
    `,
    directives: [DataTable, Column, Header, Footer]
})
export class ArticleTableComponent {

    onLazyLoadArticles: EventEmitter<LazyLoadEvent>;

    totalRecords;

    articles: Article[];

    selectedArticle: Article;

    cols = [
        {field: 'id', header: '#'},
        {field: 'pzn', header: 'PZN'},
        {field: 'name', header: 'Name'},
        {field: 'supplier', header: 'Supplier'},
        {field: 'packing', header: 'Packing'}
    ];

    constructor() {
        this.onLazyLoadArticles = new EventEmitter();
    }

    loadCarsLazy(event: LazyLoadEvent) {
        this.selectedArticle = undefined;
        this.onLazyLoadArticles.emit(event);
    }

}