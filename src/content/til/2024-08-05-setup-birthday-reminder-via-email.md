---
publishedAt: 2024-07-24
title: Remind yourself of Birthdays Using Google Calendar and Apps Script
summary: How to automate birthday email reminders using Google Calendar and Apps Script by leveraging Google Contacts to create a birthday calendar and setting up a script to send notifications on each birthday.
tags:
  - Automation
  - Google Calendar
  - Google Contacts
  - Google Apps Script
  - Javascript
---

If you keep track of friends' and family members' birthdays using Google Contacts, you can receive automatic email notifications on the day of their birthdays by integrating Google Calendar and Google Apps Script. Here’s how you can set it up:

The first thing to do is to enable the Birthday Calendar. This can be done by enabling the calendar "Birthday" in Google Calendar, and you should see a calendar named "Contacts" inside "Other Calendars".

Once turned on you should see the name of your contact along with a cake emojii (🎂), and they should be automatically repeated every year. This is the integration between Google Calendar and Google Contacts.

The last thing we need before making the automation is to obtain the Calendar ID. For that click the three dots next to the "Birthdays" calendar, go to Settings and sharing, and find the Calendar ID. It might look like `#contacts@group.v.calendar.google.com`.

With that we can create our small script, so let's open Google Apps Script through [script.google.com](https://script.google.com) or from any Google Sheet by navigating to Extensions > Apps Script. Use the following script to check for birthdays and send email reminders:

```javascript
var CALENDAR_ID = "#contacts@group.v.calendar.google.com"; // Use your Birthday calendar ID
var EMAIL = "your.email@example.com"; // Change this to your email

function sendBirthdayReminders() {
  var today = new Date();
  var events = CalendarApp.getCalendarById(CALENDAR_ID).getEventsForDay(today);

  events.forEach(function (event) {
    var title = event.getTitle();

    Logger.log("Sending email for event: " + title);
    MailApp.sendEmail({
      to: EMAIL,
      subject: "Birthday Reminder: " + title,
      body:
        "Today is " + title + "'s birthday! Don't forget to wish them well.",
    });
  });
}
```

You can run the script manually to ensure it’s working as expected. Make sure to authorize any permissions for the script to access your Calendar and Gmail.

Lastly, we need to set up an automatic trigger to run the script every day. In the Apps Script editor, click on the clock icon to set up a trigger. Add a new time-driven trigger to run `sendBirthdayReminders` daily at a specific time (e.g., 7:00 AM).

**Bonus Tip**: You can potentially customize the script to include special messages or even send reminders to multiple people if needed!

Thanks for reading.
