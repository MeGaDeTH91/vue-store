<template>
  <div class="orders-container" v-if="this.orders">
    <article
      class="order-item"
      v-for="(order, index) in this.orders"
      :key="index"
    >
      <img src="@/assets/order-logo.png" class="orders-image" alt="order" />
      <p class="orders-description">
        {{ index + 1 }} - #Order: {{ order._id }}
      </p>
      <div class="order-products">
        <span class="order-products-label">
          Products: 
        </span>
        <span v-if="order.products && order.products.length > 0">
          <router-link
            class="product-link"
            v-for="(product, productIndex) in order.products"
            :key="productIndex"
            :to="{ name: 'product-details', params: { id: product._id } }"
          >
            <span v-if="productIndex != Object.keys(order.products).length - 1"
              >{{ product.title }},
            </span>
            <span v-else>{{ product.title }}</span></router-link
          >
        </span>
      </div>
      <div>
        <span>
          <small class="order-product-label">Made: </small>
          {{ formatDate(order) }}
        </span>
      </div>
    </article>
  </div>
  <div v-else>
    <p class="orders-description">Database is down.</p>
  </div>
</template>

<script>
import { orderService } from '@/services/orderService';

export default {
  data() {
    return {
      orders: {},
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    totalPrice() {
      return 0;
    },
  },
  methods: {
    async loadData() {
      const { dispatch } = this.$store;
      const user = this.$store.getters['authentication/user'];

      orderService
        .getUserOrders(user.id)
        .then((response) => {
          let ordersResponse = response.data;

          if (ordersResponse && ordersResponse.length) {
            this.orders = ordersResponse.sort((a, b) =>
              ('' + b.created_at).localeCompare('' + a.created_at)
            );
          }
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
    formatDate(order) {
      return order.created_at.slice(0, 10);
    },
  },
};
</script>

<style scoped>
.orders-container {
  width: 100%;
  height: auto;
}

.order-item {
  margin: 30px auto;
  border-radius: 4px;
  width: 91%;
  color: lightgray;
  background: rgba(0, 0, 0, 0.3);
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding-bottom: 5px;
}

.orders-description {
  word-wrap: break-word;
  padding: 0.5%;
  font-style: italic;
  font-size: large;
  /* border:1px solid blue; */
  margin-bottom: 0.5%;
  width: 95%;
  display: inline-block;
  vertical-align: top;
}

.orders-container div {
  /* border:1px solid red; */
  height: auto;
  text-align: right;
  padding-right: 2%;
  margin-bottom: 0.5%;
}

.orders-image {
  width: 32px;
  height: 32px;
  vertical-align: bottom;
}

.order-products {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-left: auto;
  width: 35%;
}

.order-products-label {
    flex-basis: 100%;
    font-size: 14.5px;
}

.product-link {
  color: rgb(253, 181, 171);
  text-decoration: none;
  margin-bottom: 0;
  font-style: italic;
}

.product-link:hover {
  border-top: none;
  font-weight: bold;
}
</style>
