---
layout: post
title: "CS apparel design submissions"
author: "Eugene Cheung"
date: 2017-02-06 00:00:00
categories: news
---

The [apparel contest](/news/2016/12/24/apparel-contest.html) has entered the voting stage!

**Vote here for your favourite designs: (TODO)**

You can see all of the designs below.


## Notes

- Illustrations shown here may not represent the final product. Keep in mind that these may be rough ideas, and will be polished prior to printing.
- Designs that use a single colour will be cheaper to manufacture.
- Names were made up for the purpose of easier identification when voting.
- Click an image to see a larger version.


## Generic designs

{% for design in site.data.apparel2017.generic %}
  {% include apparel_design.html %}
{% endfor %}

## Other designs

{% for design in site.data.apparel2017.others %}
  {% include apparel_design.html %}
{% endfor %}
