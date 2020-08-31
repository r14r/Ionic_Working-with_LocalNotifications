import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@IonicPage()
@Component({
	selector: "page-tabs",
	templateUrl: "tabs.html"
})
export class TabsPage {
	tabHome = "HomePage";
	tabTimerList = "TimersPage";
	tabNotification = "NotificationPage";
	tabNotifications = "NotificationsPage";
	tabSettings = "SettingsPage";

	constructor(public navCtrl: NavController) {}
}
