var LOAD_NUM = 10;

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
    appendItems() {
      if(this.items.length < this.results.length) { // more items to load...
          var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
          this.items = this.items.concat(append);
      }
      console.log('appending...');
    },
    onSubmit() {
      if(this.search) { // if the search term is an empty string, do nothing!
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
      }
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
    getItemTotal(item) {
      var total = 0;
      for(var i = 0; i < this.cart.length; i++) {
        if(this.cart[i].id === item.id) {
          total = this.cart[i].qty * item.price;
          break;
        }
      }
      return total;
    },
    getItemNumber(item) {
      var num = 0;
      for(var i = 0; i < this.cart.length; i++) {
        if(this.cart[i].id === item.id) {
          num = this.cart[i].qty
          break;
        }
      }
      return num;
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
    var vueInstance = this;
    var elem = document.getElementById('product-list-bottom');
    var watcher = scrollMonitor.create(elem);
    watcher.enterViewport(function() {
      vueInstance.appendItems();
    })
  }
});
