import { Component }					from "@angular/core";
import { IonicPage, Platform }			from "ionic-angular";
import { NavController, NavParams }		from "ionic-angular";
import { AlertController }				from "ionic-angular";

import { Subscription }					from 'rxjs/Subscription';
import { LocalNotifications }			from "@ionic-native/local-notifications";

@IonicPage()
@Component({
	selector: "page-notification",
	templateUrl: "notification.html"
})
export class NotificationPage {
	public data = { title: "", description: "", date: "", time: "" };

	private timerSubscriptionTrigger: Subscription;
	private timerSubscriptionClick: Subscription;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public localNotifications: LocalNotifications,
		public platform: Platform,
		public alertCtrl: AlertController
	) {
		console.log("NotificationPage: constructor");
		this.timerSubscriptionTrigger =this.localNotifications.on('trigger').subscribe(this.subscriptionOnTrigger)
		this.timerSubscriptionClick =this.localNotifications.on('click').subscribe(this.subscriptionOnClick)
	}

	subscriptionOnTrigger() {
		console.log('subscriptionOnTrigger')
	}

	subscriptionOnClick() {
		console.log('subscriptionOnClick')
	}

	ionViewDidLoad() {
		console.log("NotificationPage: ionViewDidLoad");

		this.data = {	  title: "Beispielerinnerung"
						, description: "Palim Palim"
						, date:  "2018-05-13"
						, time: "11:24"
					};

		console.log("NotificationPage: ionViewDidLoad data=", this.data);
	}

	submit() {
		console.log("NotificationPage: submit date=", this.data.date, " time=", this.data.time);

		var date = new Date(this.data.date + " " + this.data.time);
		console.log("NotificationPage: submit date=", date );

		this.localNotifications.schedule({
			id: 10,
			text: "Delayed ILocalNotification",
			trigger: { at: new Date(this.data.date) },
			led: "FF0000",
			sound: this.setSound()
		});
		
		let alert = this.alertCtrl.create({
			title: "Congratulation!",
			subTitle: "Notification setup successfully at " + date,
			buttons: ["OK"]
		});
		alert.present();
		this.data = { title: "", description: "", date: "", time: "" };

		this.displayLocalNotificationsStatus()
	}

	setSound() {
		if (this.platform.is("android")) {
			return "file://assets/sounds/Rooster.mp3";
		} else {
			return "file://assets/sounds/Rooster.caf";
		}
	}

	displayLocalNotificationsStatus() {

	}
}
