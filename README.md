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

Angular v0.9.2.1: Oct 12, 2024 -Added profile creation via user Registration page

Angular v0.9.3: 
-Login/out officially working.
-Basic Admin Page Template Generated
-Messaging updated so can send/recieve messages better
--Note: Still need to add auto refreshes to recieve exterior messages & Fix Chat Box Selections.

Angular v0.9.3.1:
-Transaction Registration functionality added
-Admin Page pulls users from DB
--Still needs to enable user deletion & promotion to admin
-Transaction object can be passed around website, implemented in user profile & navbar so far
-Find a babysitter partial template added.

Angular v0.9.3.2:
-Fixed Messaging so it displays everything correctly, as well as refreshes/updates chat.
--TODO: Start chat (Via another Transaction's Profile)
--TODO: Fix Subscription Overload causing Backend shutdown.

Angular v0.9.4:
-Added Transactions:
--Starting a transaction via visiting someone else's profile
--Filling out transaction data and successfully submitting
--Added your list of transactions in the settings page
--Able to accept/decline only [pending transactions, date set in the future, that you are working (sitting)]
---Need to be able to refresh page and see transaction updates.

Angular v0.9.5:
-Fixed Chat Connection issues! .stream caused connections to NOT unsubscribe, meaning every chat refresh
--added new connections until the DB was overloaded.
-Cleaned up the code. Removed most comments (BU in GitHub)
-Admin Delete & Promote functions are working (Still need to merge with Chris's)
-A couple quick GUI fixes

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
