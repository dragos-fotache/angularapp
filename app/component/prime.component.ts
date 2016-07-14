import {Component} from '@angular/core';

import {Accordion} from 'primeng/primeng';
import {AccordionTab} from 'primeng/primeng';

@Component({
	selector: 'prime-component',
	template: `
        <p-dataTable [value]="cars">
            <header>List of Cars</header>
            <footer>There are 10 cars</footer>
            <p-column field="vin" header="Vin"></p-column>
            <p-column field="year" header="Year"></p-column>
            <p-column field="brand" header="Brand"></p-column>
            <p-column field="color" header="Color"></p-column>
        </p-dataTable>
    `,
    directives: [Accordion, AccordionTab]
})
export class PrimeComponent {

}