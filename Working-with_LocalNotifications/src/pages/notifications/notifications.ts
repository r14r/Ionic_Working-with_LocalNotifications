import { Component }					from "@angular/core";
import { Platform }						from "ionic-angular";
import { IonicPage }					from "ionic-angular";
import { NavController, NavParams }		from "ionic-angular";

import { AlertController }				from "ionic-angular";
import { ToastController }				from "ionic-angular";

import { LocalNotifications }			from "@ionic-native/local-notifications";
import { ELocalNotificationTriggerUnit as TriggerUnit } from "@ionic-native/local-notifications";
import { Subscription }					from "rxjs/Subscription";



export interface CountdownTimer {
	seconds: number;
	secondsRemaining: number;
	runTimer: boolean;
	hasStarted: boolean;
	hasFinished: boolean;
	displayTime: string;
}


@IonicPage()
@Component({
	selector: "page-notifications",
	templateUrl: "notifications.html"
})
export class NotificationsPage {
	private isAndroid: boolean = false;

	private timerSubscriptionTrigger: Subscription;
	private timerSubscriptionClick: Subscription;
	private timerSubscriptionSchedule: Subscription;
	
	public repeatevery_intervall: any;

	public fromnow_enabled: boolean = false;
	public fromnow_intervall: any = 5;

	public basic_enabled: boolean = false;
	public repeatevery_enabled: boolean = false;

	public timeInSeconds: number;
	timer: CountdownTimer;


	ngOnInit() {
		console.log('NotificationsPage:ngOnInit');

		this.initTimer();
	}

	//
	//
	//
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public platform: Platform,
		private localNotifications: LocalNotifications, 
		private toastCtrl: ToastController,
		public alertCtrl: AlertController
	) {
		console.log('NotificationsPage:constructor');
	}

	ionViewDidLoad() {
		console.log("NotificationsPage:ionViewDidLoad");

		console.log(this.localNotifications.getDefaults());

		this.timerSubscriptionSchedule=this.localNotifications.on('schedule').subscribe(notification => { 
			this.subscriptionOnSchedule(notification); 
		})

		this.timerSubscriptionTrigger=this.localNotifications.on('trigger').subscribe(notification => { 
			this.subscriptionOnTrigger(notification); 
		})

		this.timerSubscriptionClick=this.localNotifications.on('click').subscribe(notification => { 
			this.subscriptionOnClick(notification);
		})
	}

	subscriptionOnSchedule(notification: Notification) {
		console.log('NotificationsPage:subscriptionOnSchedule:')
		this.getNotificationInfo(notification)
	}

	subscriptionOnTrigger(notification: Notification) {
		console.log('NotificationsPage:subscriptionOnTrigger: ')
		this.getNotificationInfo(notification)
	}

	subscriptionOnClick(notification: Notification) {
		console.log('NotificationsPage:subscriptionOnClick:')
		this.getNotificationInfo(notification)
	}

	private getNotificationInfo(notification) {
		console.log('id: ', notification.id);
		console.log('title: ', notification.title);
		console.log('text: ', notification.text);
		console.log('data: ', notification.data);
		console.log('attachments: ', notification.attachments);
	}

	scheduleSample02() {
		this.localNotifications.schedule([
			{
				id: 2,
				text: "Multi ILocalNotification 1",
				sound: this.isAndroid ? "file://sound.mp3" : "file://beep.caf",
				data: { secret: "Secret Data" }
			},
			{
				id: 3,
				title: "Local ILocalNotification Example",
				text: "Multi ILocalNotification 2",
				icon: "http://example.com/icon.png"
			}
		]);
	}
	scheduleSample03() {
		this.localNotifications.schedule({
			text: "Delayed ILocalNotification",
			trigger: { at: new Date(new Date().getTime() + 3600) },
			led: "FF0000",
			sound: null
		});
	}
	scheduleBasic() {
		this.localNotifications.schedule({
			id: 40,
			title: 'My first notification',
			text: 'Thats pretty easy...',
			data: 'This is a basic notification'
		});
	}
	scheduleMultiple() {
		this.localNotifications.schedule([
			{ id: 1, title: 'My first notification' },
			{ id: 2, title: 'My first notification' }
		]
		);
	}
	scheduleWithAction() {
		this.localNotifications.schedule({
			title: 'The big survey',
			text: 'Are you a fan of RB Leipzig?',
			attachments: ['file://assets/imgs/logo.png'],
			actions: [
				{ id: 'yes', title: 'Yes' },
				{ id: 'no', title: 'No' }
			]
		});
	}

	scheduleWithInput() {
		this.localNotifications.schedule({
			title: 'The big survey',
			text: 'Are you a fan of RB Leipzig?',
			attachments: ['file://img/rb-leipzig.jpg'],
			actions: [
			]
		});
	}

	scheduleWithTrigger() {
		console.log('NotificationsPage:scheduleWithTrigger');

		this.localNotifications.schedule({
			id: 40,
			title: "Design team meeting",
			text: "09:00 PM",
			trigger: { at: new Date(2018, 5, 11, 17, 50) }
		});
	}

	scheduleFromNow() {
		console.log('NotificationsPage:scheduleFromNow: fromnow=', this.fromnow_enabled, " interval=", this.fromnow_intervall);

		if (this.fromnow_enabled) {
			this.localNotifications.schedule({
				id: 30,
				title: "From Now",
				text: "in " + this.fromnow_intervall + " seconds",
				trigger: { in: this.fromnow_intervall, unit: TriggerUnit.SECOND }
			});
		} else {
			this.showToastWithCloseButton('From Now NOT enabled')
		}
	}

	scheduleRepeating1() {
		console.log('scheduleRepeating1');

		this.localNotifications.schedule({
			id: 10,
			title: "scheduleRepeating1",
			text: "every " +  this.repeatevery_intervall + " minute",
			trigger: { every: TriggerUnit.MINUTE }
		});
	}

	scheduleProgress1() {
		console.log('schedulscheduleProgress1eRepeating');

		this.localNotifications.schedule({
			id: 20,
			title: "scheduleProgress1",
			text: "Copied 2 of 10 files",
			progressBar: { value: 20 }
		});
	}

	scheduleSummarizing1() {
		console.log('scheduleSummarizing1');

		this.localNotifications.schedule({
			id: 15,
			title: 'Schedule Summarizing1 Notification',
			icon: 'http://climberindonesia.com/assets/icon/ionicons-2.0.1/png/512/android-chat.png',
			text: "test"
			
			/*
			[
				{ message: 'I miss you' },
				{ person: 'Irish', message: 'I miss you more!' },
				{ message: 'I always miss you more by 10%' }
			]
			*/
		});
	}

	scheduleGrouping1() {
		console.log('scheduleGrouping1');

		this.localNotifications.schedule({
			id: 15,
			title: 'Schedule Grouping Notification',
			icon: 'http://climberindonesia.com/assets/icon/ionicons-2.0.1/png/512/android-chat.png',
			text: "test"
			
			/*
			[
				{ message: 'I miss you' },
				{ person: 'Irish', message: 'I miss you more!' },
				{ message: 'I always miss you more by 10%' }
			]
			*/
		});
	}

	toggleChanged(toggle) {
		console.log('toggleChanges: ' + toggle);
	}

	showToastWithCloseButton(message) {
		const toast = this.toastCtrl.create({
		  message: message,
		  showCloseButton: true,
		  closeButtonText: 'Ok'
		});
		toast.present();
	  }

	hasFinished() {
		return this.timer.hasFinished;
	}

	initTimer(timeInSeconds = 0) {
		this.timeInSeconds = timeInSeconds;

		this.timer = <CountdownTimer>{
			seconds: this.timeInSeconds,
			runTimer: false,
			hasStarted: false,
			hasFinished: false,
			secondsRemaining: this.timeInSeconds
		};

		this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
	}

	startTimer() {
		console.log('startTimer');

		this.timer.hasStarted = true;
		this.timer.hasFinished = false;
		this.timer.runTimer = true;
		this.timerTick();
	}

	stopTimer() {
		console.log('stopTimer');

		this.timer.hasStarted = false;		
		this.timer.hasFinished = true;
		this.timer.runTimer = false;
		this.timeInSeconds = 0;
		this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
	}

	timerTick() {
		setTimeout(() => {
			if (!this.timer.runTimer) { return; }
			this.timer.secondsRemaining++;
			this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
			if (this.timer.secondsRemaining > 0) {
				this.timerTick();
			} else {
				console.log('end timer');
				this.timer.hasFinished = true;
			}
		}, 1000);
	}

	getSecondsAsDigitalClock(inputSeconds: number) {
		const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
		const hours = Math.floor(secNum / 3600);
		const minutes = Math.floor((secNum - (hours * 3600)) / 60);
		const seconds = secNum - (hours * 3600) - (minutes * 60);
		let hoursString = '';
		let minutesString = '';
		let secondsString = '';
		hoursString = (hours < 10) ? '0' + hours : hours.toString();
		minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
		secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
		return hoursString + ':' + minutesString + ':' + secondsString;
	}
}