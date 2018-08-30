var API_KEY = 'AIzaSyAZRDe_DuPP4BUS7hqkkdFeAVv_O2yQgIk';
var CAL_ID = '0fqfmmqnmb20kn6qibaqflsbo0@group.calendar.google.com';
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

/**
* Load Google Calendar client library. List upcoming events
* once client library is loaded.
*/
function loadCalendarApi() {
    window.gapi_onload = function() { gapi.auth.authorize(); };
    gapi.client.setApiKey(API_KEY);
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

function listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
        calendarId: CAL_ID,
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 4,
        orderBy: 'startTime'
    });

    var element = document.getElementById("events");

    element.innerHTML = "";

    request.execute(function(resp) {
        var events = resp.items;

        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if (event.start.dateTime) {
                // Event with explicit start/end times
                appendTimeEvent(event);
            } else {
                appendAllDayEvent(event);
            }
        }
        if (events.length === 0) {
            element.innerHTML = "<li class='empty'>No upcoming events; stay tuned!</li>";
        }
    });
}

function appendTimeEvent(event) {
    var startTime = new Date(event.start.dateTime);
    var endTime = new Date(event.end.dateTime);
    var element = document.getElementById("events");
    var str = "<div class='event-date'><p class='event-month'>" +
                startTime.toLocaleString("en-us", { month: "short" }) +
                "</p><p class='event-day'>"+ startTime.getDate() +
                "</p></div><p class='post-link'>" + event.summary + "</p>";
    var eventNode = document.createElement("li");
    eventNode.innerHTML = str;
    if (event.description != undefined){
        var des = document.createElement("p");
        des.appendChild(document.createTextNode(event.description));
        eventNode.appendChild(des);
    }
    if (event.location != undefined){
        var loc = document.createElement("p");
        loc.appendChild(document.createTextNode("Location: " + event.location));
        eventNode.appendChild(loc);
    }

    var time = document.createElement("p");
        time.appendChild(document.createTextNode("From " + startTime.toLocaleTimeString('en-US') +
                                                    " to " + endTime.toLocaleTimeString('en-US') ));
        eventNode.appendChild(time);
    element.appendChild(eventNode);
}

function appendAllDayEvent(event) {
    var start = new Date(event.start.date);
    var element = document.getElementById("events");
    var str = "<div class='event-date'><p class='event-month'>" +
                start.toLocaleString("en-us", { month: "short" }) +
                    "</p><p class='event-day'>"+ start.getDate() +
                    "</p></div><p class='post-link'>" + event.summary + "</p>";
    var eventNode = document.createElement("li");
    eventNode.innerHTML = str;
    if (event.description != undefined){
        var des = document.createElement("p");
        des.appendChild(document.createTextNode(event.description));
        eventNode.appendChild(des);
    }
    if (event.location != undefined){
        var loc = document.createElement("p");
        loc.appendChild(document.createTextNode("Location: " + event.location));
        eventNode.appendChild(loc);
    }
    element.appendChild(eventNode);
}
