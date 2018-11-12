---
layout: page
title: Podcast
permalink: /podcast/
---

The CSSU is proud to announce their very own podcast: Room 2250!

This podcast is for all UofT students discussing topics relating to UofT and Toronto with a lens of a computer science student.

Room 2250 is back for Season 2 this year. New hosts Anam and __ are here to bring you great new episodes with brand new guests, current news and great discussions.

Season 1 of the podcast was hosted by CSSU treasurer Haider Nadeem and his co-host Christopher Mckerracher. We brought on alumni, students and faculty for questions and their thoughts on the important subject matter like the best places to study, eat and make friends on campus and in Toronto. Big thanks goes out to Haider and Christopher for their fantastic work on the podcast in Season 1. 

We encourage all students, graduate or undergraduate, CS or non-CS, or anyone else who would listen in to tune in!

All of the episodes are linked below if you want to listen.

Made possible by Vic Records.

You can listen and subscribe on your favourite podcast platform:

[SoundCloud](https://soundcloud.com/room-2250) | 
[Google Play](https://play.google.com/music/m/Ilg4usk2dsp65rngd2dz4ehaax4?t=Room_2250) |
[iTunes](https://itunes.apple.com/ca/podcast/room-2250/id1278776873) |
[YouTube](https://www.youtube.com/channel/UCcI8gmjCQkeRU3ts3fa5ejw/videos)

{% for season in site.data.podcast.Seasons %}
  <h2> {{ season.name }}</h2>
  {% for track in season.Episodes %}
  <iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/{{ track }}&amp;color=0d1117&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
  {% endfor %}
{% endfor %}