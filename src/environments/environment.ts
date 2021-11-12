// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebase: {
    projectId: 'to-do-list-9ebfe',
    appId: '1:910680274483:web:c2e114ab06c462cbba5546',
    storageBucket: 'to-do-list-9ebfe.appspot.com',
    apiKey: 'AIzaSyBS5JDpPwra6Ggg4grBsyd9RmHIdOi97UY',
    authDomain: 'to-do-list-9ebfe.firebaseapp.com',
    messagingSenderId: '910680274483',
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
