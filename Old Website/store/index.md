---
layout: page
title: Store
permalink: /store/
---

Come by the CSSU office to check out our wide selection of drinks and snacks! Click on the bold items for a list of flavours that we sell. If you have suggestions let us know.

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
        <tr>
          <td>
            {% if snack.flavours %}
            <p class="store-item-collapsable">{{ snack.name }}</p>
            <div class="store-item-collapsable-panel">
              <ul>
                {% for flavour in snack.flavours %}
                <li>{{ flavour.name }}</li>
                {% endfor %}
              </ul>
            </div>
            {% else %}
            {{ snack.name }}
            {% endif %}
          </td>
          <td>{{ snack.price }}</td>
        </tr>
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
        <tr>
          <td>
            {% if drink.flavours %}
            <p class="store-item-collapsable">{{ drink.name }}</p>
            <div class="store-item-collapsable-panel">
              <ul>
                {% for flavour in drink.flavours %}
                <li>{{ flavour.name }}</li>
                {% endfor %}
              </ul>
            </div>
            {% else %}
            {{ drink.name }}
            {% endif %}
          </td>
          <td>{{ drink.price }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </section>
</div>

<script>
  /** Store Collapse Feature by Borna*/
  var coll = document.getElementsByClassName("store-item-collapsable");
  for (var i = 0; i < coll.length; i++) {
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
