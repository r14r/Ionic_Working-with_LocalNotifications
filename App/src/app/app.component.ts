import { Component, ViewChild }			from "@angular/core";
import { Nav, Platform }				from "ionic-angular";

import { StatusBar }					from "@ionic-native/status-bar";
import { SplashScreen }					from "@ionic-native/splash-screen";

@Component({
	templateUrl: "app.html"
})
export class MainApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = 'TabsPage';

	pages: Array<{ title: string; component: any }>;

	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen
	) {
		this.initializeApp();

		this.pages = [
			  { title: "Tabs", component: 'TabsPage' }
			, { title: "Home", component: 'HomePage' }
			, { title: "List", component: 'TimersPage' }
			, { title: "Notifications", component: 'NotificationsPage' }
			, { title: "Settings", component: 'SettingsPage' }
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		this.nav.setRoot(page.component);
	}
}
