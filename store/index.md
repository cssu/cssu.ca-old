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
  
  
  <p>GET​ ​UP TO​ ​98%​ ​OFF​ ​ON​ ​.TECH​ ​DOMAINS!<br>
  .tech is offering a Special Promo Offer on standard .tech domains for the members of the CSSU community! Cool, eh?<br>
  Get your .tech​ domain -<br>
  1. Go to - www.get.tech - and select a standard domain<br>
  2. Use coupon code - cssu17​ - at the checkout<br>
  3. Get a domain for 1 year at $0.99 or for 5 years at $24.99 only<br>
  <br>
  If you have any questions, you can drop an email - techsquad@get.tech</p>

</div>
