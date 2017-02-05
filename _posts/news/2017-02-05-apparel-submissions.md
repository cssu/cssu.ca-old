---
layout: post
title: "CS apparel design submissions"
author: "Eugene Cheung"
date: 2017-02-05 00:00:00
categories: news
---

The [apparel contest]({% post_url /news/2016-12-24-apparel-contest %}) has entered the voting stage!

**Vote here for your favourite designs:**
- Hoodie: *coming soon*
- T-shirt: *coming soon*

Some important things to keep in mind:
- Illustrations shown here may not represent the final product. Keep in mind that these may be rough ideas, and will be polished prior to printing.
- Single colour designs will be cheaper.
- Single-sided designs will be cheaper.
- "Large" designs might not be possible to print.
- Names were made up for the purpose of easier identification when voting.

You can see all of the designs below. You can see the full-sized image by clicking on it.


## Generic designs

{% for design in site.data.apparel2017.generic %}
  {% include apparel_design.html %}
{% endfor %}

## Other designs

{% for design in site.data.apparel2017.others %}
  {% include apparel_design.html %}
{% endfor %}
