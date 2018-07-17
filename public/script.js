new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [
      {title: 'Item One'},
      {title: 'Item Two'},
      {title: 'Item Three'},
    ],
    cart: [],
  },
  methods: {
    addItem(idx) {
      this.cart.push(this.items[idx]);
      console.log("cart: " + this.cart);
      this.total += 10;
    }
  }
});
