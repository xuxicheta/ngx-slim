// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeRu, 'ru');

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting([
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    }
  ])
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
