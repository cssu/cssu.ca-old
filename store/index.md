---
layout: page
title: Store
permalink: /store/
---

Come by the CSSU office to check out our wide selection of drinks and snacks! Click on the bold items for a list of flavors that we sell. If you have suggestions let us know.

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
          <th>Snack</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {% for snack in site.data.store-prices.snacks %}
        {% if snack.flavor == true %}
        <tr>
          <td>
            <p class="collapse" style="font-weight: bold">&#8627; {{ snack.name }}</p>
              <div class="panel">
                <ul>
                {% for flavor in snack.flavors %}
                <li>{{flavor.name}}</li>
                {% endfor %}
                </ul>
              </div>
          </td>
          <td>{{snack.price}}</td>
        </tr>
        {% endif %}
        {% if snack.flavor == false %}
        <tr>
          <td>{{ snack.name }}</td>
          <td>{{ snack.price }}</td>
        </tr>
        {% endif %}
        {% endfor %}
      </tbody>
    </table>
  </section>
  <section class="store-right">
    <table>
      <thead>
        <tr>
          <th>Drink</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {% for drink in site.data.store-prices.drinks %}
        {% if drink.flavor == true %}
        <tr>
          <td>
            <p class="collapse" style="font-weight: bold">&#8627;{{ drink.name }}</p>
              <div class="panel">
                <ul>
                {% for flavor in drink.flavors %}
                <li>{{flavor.name}}</li>
                {% endfor %}
                </ul>
              </div>
          </td>
          <td>{{drink.price}}</td>
        </tr>
        {% endif %}
        {% if drink.flavor == false %}
        <tr>
          <td>{{ drink.name }}</td>
          <td>{{ drink.price }}</td>
        </tr>
        {% endif %}
        {% endfor %}
      </tbody>
    </table>
  </section>
</div>

<script>
  /** Store Collapse Feature by Borna*/
  var coll = document.getElementsByClassName("collapse");
  var i;
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  };
</script>