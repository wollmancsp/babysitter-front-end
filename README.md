This is a repository to hold our capstone project - a babysitter finder application.

Patch Notes: Angular

-0.9: Phil -Created the base Angular setup. This currently can read JSON from the back end and repost it to the front end. --Does not yet work front-end to back-end -This is still boilerplate code. This is meant to get things running, not yet actively representing our babysitter app.

Angular v0.9.1: Oct 7, 2024
-Did mostly GUI work. Planning on connecting users to JSON test in DB tomorrow
-Added proper navigation, including nav bar, signin & register pages, and profile page
--Note that I'm having an issue getting images to load via the assets folder. Check the forms tomorrow
-Still have some organizing to do with the scss files.
-Planning 1.0.0 Angular Release to include all base pages. Until then, staying on 0.9.*

Angular v0.9.2: Oct 12, 2024
-Did more GUI work, added Home, Settings, Become/Add A Babysitter pages
--Added inner components to Settins: Messages, Profile, Settings
---Settings, Become/Add A Babysitter are blank pages right now
-Added Messaging:
--Currently only loads from the DB/Backend works. Will add sends next
--Users are not logged in yet, but IDs are pulled. Need to finish that to pull proper data


Angular v0.9.2.1: Oct 12, 2024
-Added profile creation via user Registration page


# TestAngApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
