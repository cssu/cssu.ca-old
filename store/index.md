---
layout: page
title: Store
permalink: /store/
---

Come by the CSSU office to check out our wide selection of drinks and snacks!

<!--
## Status

<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Available</th>
    </tr>
  </thead>
  <tbody>
    {% for item in site.data.status %}
    <tr>
      <td>{{ item.item }}</td>
      <td>{% if item.status %}✅{% else %}❌{% endif %}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>


## For sale
-->

<div id="store">
  <section class="store-left">
    <table>
      <thead>
        <tr>
          <th>Drink</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {% for drink in site.data.store-prices.drinks %}
        <tr>
          <td>{{ drink.name }}</td>
          <td>{{ drink.price }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </section>

  <section class="store-right">
    <table>
      <thead>
        <tr>
          <th>Snack</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {% for snack in site.data.store-prices.snacks %}
        <tr>
          <td>{{ snack.name }}</td>
          <td>{{ snack.price }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </section>
</div>
