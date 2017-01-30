---
layout: post
title: "CS apparel design submissions"
author: "Eugene Cheung"
date: 2017-02-06 00:00:00
categories: news
---

The [apparel contest](/news/2016/12/24/apparel-contest.html) has entered the voting stage!

## Voting instructions

Lorem ipsum...


## Generic designs

{% for design in site.data.apparel2017.generic %}
  {% include apparel_design.html %}
{% endfor %}

## Other designs

{% for design in site.data.apparel2017.others %}
  {% include apparel_design.html %}
{% endfor %}
