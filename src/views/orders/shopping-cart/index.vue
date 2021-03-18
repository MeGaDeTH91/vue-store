<template>
  <div class="products-container">
    <h1 class="products-title">Your shopping cart</h1>

    <table class="products-table">
      <thead class="products-table-head">
        <tr class="products-table-row">
          <th class="products-table-row-thead">#</th>
          <th class="products-table-row-thead">Product</th>
          <th class="products-table-row-thead">Actions</th>
          <th class="products-table-row-thead">Price</th>
        </tr>
      </thead>
      <tbody class="products-table-body">
        <tr
          class="products-table-row"
          v-for="(product, index) in this.products"
          :key="index"
        >
          <td class="products-table-body-td">{{ index + 1 }}.</td>
          <td class="products-table-body-td">{{ product.title }}</td>
          <td class="products-table-body-td">
            <button class="btn-primary" @click="removeProduct(product._id)">
              Remove
            </button>
          </td>
          <td class="products-table-body-td">
            {{ formatProductPrice(product.price) }} lv.
          </td>
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td>
            <h3 class="total-price">
              Total price: <i>{{ totalPrice }} lv.</i>
            </h3>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="btn-checkout-container">
      <button
        v-if="totalPrice > 0"
        class="btn-checkout"
        @click="sumbitOrder"
      >
        Place Order
      </button>
    </div>
  </div>
</template>

<script>
import { userService } from '@/services/userService';
import { orderService } from '@/services/orderService';
import router from '@/router';
import formatPrice from '@/utils/priceFormatter';

export default {
  data() {
    return {
      user: {},
      products: {},
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    totalPrice() {
      if (this.products && this.products.length > 0) {
        return this.formatProductPrice(this.products.reduce((a, b) => a + (b['price'] || 0), 0));
      }
      return '0';
    },
  },
  methods: {
    async loadData() {
      const { dispatch } = this.$store;
      const user = this.$store.getters['authentication/user'];

      userService
        .getUser(user.id)
        .then((response) => {
          this.user = response.data;
          this.products = this.user.cart;
        })
        .catch((err) => {
          console.log(err.response.data);
          dispatch(
            'alert/error',
            'There is a problem with database, please try again later.'
          );

          setTimeout(() => {
            dispatch('alert/clear');
            this.submitted = false;
          }, 10000);
          return;
        });
    },
    removeProduct(id) {
      const { dispatch } = this.$store;

      orderService
        .removeFromCart(id, this.user._id)
        .then((response) => {
          console.log(response);
          dispatch('alert/success', 'Product removed from cart successfully!');

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          dispatch('alert/error', err.response.data);

          setTimeout(() => {
            dispatch('alert/clear');
            this.submitted = false;
          }, 4000);
          return;
        });
    },
    sumbitOrder() {
      const { dispatch } = this.$store;

      orderService
        .createOrder(this.user._id)
        .then((response) => {
          console.log(response);
          dispatch('alert/success', 'Order placed successfully!');

          setTimeout(() => {
            router.push('/');
            router.go();
          }, 2000);
        })
        .catch((err) => {
          dispatch('alert/error', err.response.data);

          setTimeout(() => {
            dispatch('alert/clear');
            this.submitted = false;
          }, 4000);
          return;
        });
    },
    formatProductPrice(price) {
      return formatPrice(price);
    },
  },
};
</script>

<style scoped>
.products-container {
  padding: 50px;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.8) 80%
    ),
    url('../../../assets/cart.jpg') no-repeat center center;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center bottom;
  background-attachment: fixed;
  min-height: 800px;
}

.products-table {
  border-radius: 8px;
  background-color: rgba(255, 249, 246, 0.60);
  width: 90%;
  border: 1px solid #858585;
  height: 20vh;
  margin: 50px auto;
  padding-top: 15px;
}

.img-fluid {
  opacity: 0.8;
  border-radius: 5px;
  max-width: 280px;
}

.products-table-row-thead {
  padding-bottom: 25px;
  color: #ce5a1675;
  border-bottom: 2px solid lightgray;
}

.products-table-row {
  color: #f3cf9f;
  border-bottom: 2px solid black;
}

.products-table-head {
  border-bottom: 5px white;
  color: orange;
}

.products-table-body {
  border: 3px black;
  color: grey;
}

.products-table-body-td {
  padding: 25px 0;
  color: black;
  border-bottom: 2px solid lightgray;
}

.btn-primary {
  background: rgb(194, 167, 166);
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 3px;
  border: none;
  padding: 11px 35px 11px 35px;
}

.btn-primary:hover {
  cursor: pointer;
  background: grey;
  color: rgb(255, 104, 104);
  opacity: 50%;
  border-radius: 3px;
}

.btn-checkout-container {
  display: flex;
  justify-content: flex-end;
}

.btn-checkout {
  background: rgb(126, 126, 126);
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 3px;
  border: none;
  padding: 11px 35px 11px 35px;
  margin-right: 260px;
}

.btn-checkout:hover {
  cursor: pointer;
  background: grey;
  color: rgb(255, 104, 104);
  opacity: 50%;
  border-radius: 3px;
}

.unban-btn {
  padding: 11px 24px 11px 24px;
  margin: 0;
}

.products-table-body-td-ckeckbox {
  background-color: #fafafa;
  border: 1px solid #cacece;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 1px;
  border-radius: 3px;
  opacity: 1;
}

.total-price {
  font-size: 20px;
  margin: 20px 0;
  padding: 5px 0;
  color: rgb(22, 11, 11);
}
</style>
