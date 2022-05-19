import * as Notifications from "expo-notifications";
import * as Permissions from 'expo-permissions';
import { Constants } from "expo-constants";
import { Platform } from "react-native";


// the function that registers your device for push notifications
const registerForPushNotifications = async () => {
    try {
        //create a 'permission' object that asks user for permission
        const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        //if no permission, exit
        if (!permission.granted) {
            alert('Failed to get a push token');
            return;
        } 

        //get the push token; need it to be asynchronous because we don't know how long it will take
        const token = await getExpoPushTokenAsync();
        return token;
    } catch (error) {
        console.log('Error getting a noti token', error);
    }
};

//inside this function, generates a send push notification and returns it
const createSender = async () => {
    // get token
    const token = await registerForPushNotifications();

    // function for sending push notifications
    const sendPushNotification = async (message) => {
        scheduleNotificationAsync({
            content: {
                title: "Event: ",
                body: message,
            },
            trigger: {
                seconds: 5,
            },
        });
    };

    return sendPushNotification;
}

async function registerForPushNotificationsAsync() {
    //If on an emulator, alert and break out of function
    if (!Constants.isDevice) {
        alert("Must use a physical device. No emulators!");
        return null;
    }

    //ask user for permission to send notifications to them
    const {status} = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
        alert('Failed to get push token for push notification');
        return null;
    }

    //Android has channels to assign particular behavior to notifications 
    // (ie. custom ringtone)
    // set this 'AndroidImportance' to max -> sometimes, Android OS might
    //decide a notification isn't important and won't display on device -> prevent this
    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
        });
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
}

export default createSender;