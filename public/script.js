new Vue({
  el: '#app',
  data: {
    total: 0,
    results: [],
    items: [],
    cart: [],
    search: 'code',
    lastSearch: '',
    loading: false,
    hasSearched: false,
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.hasSearched = true;
      this.$http.get('/search/'.concat(this.search))
        .then(function(res) {
          this.lastSearch = this.search;
          var items = res.body;
          for(var i = 0; i < items.length; i++) {
            var price = 3 + Math.floor(Math.random() * 12);
            var change = parseFloat(Math.random().toFixed(2));
            items[i].price = price + change;
          }
          this.results = items;
          this.items = items.slice(0, 10);
          this.loading = false;
        });
    },
    addItem(idx) {
      var item = this.items[idx];
      var found = false;
      for(var i = 0; i < this.cart.length; i++) {
        if(this.cart[i].id === item.id) {
          this.cart[i].qty++;
          found = true;
          break;
        }
      }
      if(!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          price: item.price,
          qty: 1,
        });
      }
      this.total += 10;
    },
    getTotal() {
      var total = 0;
      for(var j = 0; j < this.cart.length; j++) {
        var item = this.cart[j];
        total += item.price * item.qty;
      }
      return total;
    },
    inc(item) {
      item.qty++;
    },
    dec(item) {
      if(item.qty > 0) {
        item.qty--;
      }
      if(item.qty === 0) {
        for(var k = 0; k < this.cart.length; k++) {
          if(this.cart[k].id === item.id) {
            this.cart.splice(k, 1);
            break;
          }
        }
      }
    }
  },
  filters: {
    currency: function(price) {
      return `$${price.toFixed(2)}`;
    }
  },
  mounted() {
    this.onSubmit();
  }
});
