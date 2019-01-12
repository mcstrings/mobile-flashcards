import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const NOTIFICATION_KEY = 'Flashcards:notifications'

export function getDailyReminderValue() {
    return {
        today: "👋 Don't forget to log your data today!"
    }
}

export function timeToString(time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
    return todayUTC.toISOString().split('T')[0]
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    )
}

function createNotification() {
    return {
        title: `It's quiz time!`,
        body: "👋 Get your daily dose of flashcards!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                    ({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(8)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(
                                NOTIFICATION_KEY,
                                JSON.stringify(true)
                            )
                        }
                    }
                )
            }
        })
}
