/**
 * Created by Armando Autuori on 28/08/2019.
 */
import {NgModule,EventEmitter,Directive,ViewContainerRef,Input,Output,ContentChildren,ContentChild,TemplateRef,OnInit,OnDestroy,AfterContentInit,QueryList,EmbeddedViewRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

@Component({
    selector: 'ay-header',
    template: '<ng-content></ng-content>'
})
export class Header {}

@Component({
    selector: 'ay-footer',
    template: '<ng-content></ng-content>'
})
export class Footer {}

@Directive({
    selector: '[pTemplate]',
    host: {
    }
})
export class PrimeTemplate {

    @Input() type: string;

    @Input('pTemplate') name: string;

    constructor(public template: TemplateRef<any>) {}

    getType(): string {
        if(this.type) {
            console.log('Defining a pTemplate with type property is deprecated use pTemplate="type" instead.');
            return this.type;
        }
        else {
            return this.name;
        }
    }
}

@Directive({
    selector: '[pTemplateWrapper]'
})
export class TemplateWrapper implements OnInit, OnDestroy {

    @Input() item: any;

    @Input() index: number;

    @Input('pTemplateWrapper') templateRef: TemplateRef<any>;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) {}

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.item,
            'index': this.index
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'ay-column',
    template: ``
})
export class Column implements AfterContentInit{
    @Input() field: string;
    @Input() sortField: string;
    @Input() header: string;
    @Input() footer: string;
    @Input() sortable: any;
    @Input() editable: boolean;
    @Input() filter: boolean;
    @Input() filterMatchMode: string;
    @Input() rowspan: number;
    @Input() colspan: number;
    @Input() style: any;
    @Input() styleClass: string;
    @Input() hidden: boolean;
    @Input() expander: boolean;
    @Input() selectionMode: string;
    @Input() filterPlaceholder: string;
    @Input() frozen: boolean;
    @Output() sortFunction: EventEmitter<any> = new EventEmitter();
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    @ContentChild(TemplateRef) template: TemplateRef<any>;

    public headerTemplate: TemplateRef<any>;
    public bodyTemplate: TemplateRef<any>;
    public footerTemplate: TemplateRef<any>;
    public filterTemplate: TemplateRef<any>;
    public editorTemplate: TemplateRef<any>;

    ngAfterContentInit():void {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'body':
                    this.bodyTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'filter':
                    this.filterTemplate = item.template;
                    break;

                case 'editor':
                    this.editorTemplate = item.template;
                    break;

                default:
                    this.bodyTemplate = item.template;
                    break;
            }
        });
    }
}

@Component({
    selector: 'ay-row',
    template: ``
})
export class Row {

    @ContentChildren(Column) columns: QueryList<Column>;

}

@Component({
    selector: 'ay-headerColumnGroup',
    template: ``
})
export class HeaderColumnGroup {

    @ContentChildren(Row) rows: QueryList<any>;
}

@Component({
    selector: 'ay-footerColumnGroup',
    template: ``
})
export class FooterColumnGroup {

    @ContentChildren(Row) rows: QueryList<any>;
}

@Component({
    selector: 'ay-columnBodyTemplateLoader',
    template: ``
})
export class ColumnBodyTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    @Input() rowData: any;

    @Input() rowIndex: number;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) {}

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.bodyTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'ay-columnHeaderTemplateLoader',
    template: ``
})
export class ColumnHeaderTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) {}

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.headerTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'ay-columnFooterTemplateLoader',
    template: ``
})
export class ColumnFooterTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) {}

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.footerTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'ay-columnFilterTemplateLoader',
    template: ``
})
export class ColumnFilterTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) {}

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.filterTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'ay-columnEditorTemplateLoader',
    template: ``
})
export class ColumnEditorTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    @Input() rowData: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) {}

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.editorTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'ay-templateLoader',
    template: ``
})
export class TemplateLoader implements OnInit, OnDestroy {

    @Input() template: TemplateRef<any>;

    @Input() data: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) {}

    ngOnInit() {
        if(this.template) {
            this.view = this.viewContainer.createEmbeddedView(this.template, {
                '\$implicit': this.data
            });
        }
    }

    ngOnDestroy() {
        if (this.view) this.view.destroy();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Header,Footer,Column,TemplateWrapper,ColumnHeaderTemplateLoader,ColumnBodyTemplateLoader,ColumnFooterTemplateLoader,ColumnFilterTemplateLoader,PrimeTemplate,TemplateLoader,Row,HeaderColumnGroup,FooterColumnGroup,ColumnEditorTemplateLoader],
    declarations: [Header,Footer,Column,TemplateWrapper,ColumnHeaderTemplateLoader,ColumnBodyTemplateLoader,ColumnFooterTemplateLoader,ColumnFilterTemplateLoader,PrimeTemplate,TemplateLoader,Row,HeaderColumnGroup,FooterColumnGroup,ColumnEditorTemplateLoader]
})
export class TreeSharedModule { }