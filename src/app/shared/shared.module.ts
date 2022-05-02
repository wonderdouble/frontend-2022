import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ChartsModule, ModalModule,TableModule, NavbarModule, CarouselModule, WavesModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md'
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { JwPaginationModule } from 'jw-angular-pagination';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { LightboxModule } from 'ngx-lightbox';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwPaginationModule,
    NgxSkeletonLoaderModule,
    AngularEditorModule, ModalModule,
    LightboxModule,
    NgxCurrencyModule,

    ChartsModule, TableModule, CarouselModule, WavesModule,WavesModule, InputsModule, ButtonsModule, NavbarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwPaginationModule,
    NgxSkeletonLoaderModule,
    AngularEditorModule,
    ModalModule,
    LightboxModule,
    NgxCurrencyModule,
    ChartsModule, TableModule, CarouselModule, WavesModule, WavesModule, InputsModule, ButtonsModule, NavbarModule
  ]
})
export class SharedModule { }
