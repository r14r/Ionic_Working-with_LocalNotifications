import { BrowserModule }				from "@angular/platform-browser";
import { ErrorHandler, NgModule }		from "@angular/core";

import { IonicApp }						from "ionic-angular";
import { IonicErrorHandler, IonicModule } from "ionic-angular";

import { StatusBar }					from "@ionic-native/status-bar";
import { SplashScreen }					from "@ionic-native/splash-screen";

import { LocalNotifications }			from "@ionic-native/local-notifications";

import { MainApp }						from "./app.component";

import { NotificationProvider }			from '../providers/notification/notification';

@NgModule({
	declarations: [MainApp],
	imports: [BrowserModule, IonicModule.forRoot(MainApp)],
	bootstrap: [IonicApp],
	entryComponents: [MainApp],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
    	NotificationProvider, LocalNotifications
	]
})

export class AppModule {}
