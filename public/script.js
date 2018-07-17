new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [
      {id: 1, title: 'Item One', price: 9.99},
      {id: 2, title: 'Item Two', price: 7.99},
      {id: 3, title: 'Item Three', price: 12.99},
    ],
    cart: [],
  },
  methods: {
    addItem(idx) {
      var item = this.items[idx];
      var found = false;
      for(var i = 0; i < this.cart.length; i++) {
        if(this.cart[i].id === item.id) {
          this.cart[i].qty++;
          found = true;
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
  }
});
