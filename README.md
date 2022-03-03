# Eve
An online solution for managing events and reminders developed with Angular framework. Dexie.js over IndexedDB is used as an in-browser database. SCSS is used to create stylesheets. Express.js is a minimalist web framework for Node.js used here to create the server backend. The user can create meetings and events, set reminders and birthday notifications with additional features to add guests. Checklists can be created for all events. Date, time, and venue are also available where necessary.
The project follows the guidelines of Progressive Web Apps. It is installable with full offline support.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Additional Node Module Required for App

IndexedDB is the low-level API for client-side storage (in-browser database)  
Dexie.js is the Minimalistic Wrapper for IndexedDB  
`npm install dexie`

## Additional Angular Module Required for App

Learn more about [Progressive Web Apps](https://web.dev/what-are-pwas/)  
`ng add @angular/pwa`

## Additional Node Module Required for Server

Express is the web framework used here for Node.js  
`npm install express --save`

## What next?

The project expects the developers to use a database on server or cloud for data storage and custom logic for authentication.
