'use strict';

var API_KEY = 'AIzaSyC76S4FpNgutMZmF5q_EGwo-JEEJUARlHw';
var CAL_ID = '0fqfmmqnmb20kn6qibaqflsbo0@group.calendar.google.com';
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

var eventsListEl = document.getElementById('events');

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
  window.gapi_onload = gapi.auth.authorize;
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

  request.execute(function(resp) {
    document.getElementById('events--loading').classList.add('hidden');

    var events = resp.items;

    if (events.length !== 0) {
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.start.dateTime) {
          appendTimeEvent(event);
        } else {
          appendAllDayEvent(event);
        }
      }
    } else {
      document.getElementById('events--loading').classList.add('hidden');
      document.getElementById('events--empty').classList.remove('hidden');
    }
  });
}

/**
 * Add an event that has explicit start/end times defined.
 */
function appendTimeEvent(event) {
  var startTime = new Date(event.start.dateTime);
  var endTime = new Date(event.end.dateTime);
  var eventEl = _createEventEl(startTime, event.summary, event.description, event.location);
  eventEl.appendChild(_createElement('p', null,
      'From ' + startTime.toLocaleTimeString('en-US') +
      ' to ' + endTime.toLocaleTimeString('en-US')));
  eventsListEl.appendChild(eventEl);
}

/**
 * Add an all-day event.
 */
function appendAllDayEvent(event) {
  var start = new Date(event.start.date);
  var eventEl = _createEventEl(start, event.summary, event.description, event.location);
  eventsListEl.appendChild(eventEl);
}

/**
 * Helper function to create an event list item.
 */
function _createEventEl(date, summary, description, location) {
  var eventEl = _createElement('li');

  var eventDateEl = _createElement('div', {'class': 'event-date'});
  eventDateEl.appendChild(_createElement('p', {'class': 'event-month'}, date.toLocaleString('en-US', {month: 'short'})));
  eventDateEl.appendChild(_createElement('p', {'class': 'event-day'}, date.getUTCDate()));
  eventEl.appendChild(eventDateEl);

  eventEl.appendChild(_createElement('p', {'class': 'post-link'}, summary));

  if (description != null) {
    eventEl.appendChild(_createElement('p', null, description));
  }

  if (location != null) {
    eventEl.appendChild(_createElement('p', null, 'Location: ' + location));
  }

  return eventEl;
}

/**
 * Helper function to create a DOM element.
 */
function _createElement(type, attrs, text) {
  var el = document.createElement(type);

  if (attrs != null) {
    Object.keys(attrs).forEach(function(key) {
      var value = attrs[key];
      el.setAttribute(key, value);
    });
  }

  if (text != null) {
    el.appendChild(document.createTextNode(text));
  }

  return el;
}
