<template>
  <div class="product-container">
    <div class="product-data">
      <h2 class="product-name">
        {{ product.title }}
      </h2>
      <div class="product-picture">
        <img class="img-fluid" :src="product.imageURL" alt="Express" />
      </div>

      <h3 class="product-info">
        {{ product.description }}
      </h3>
      <h3 class="product-info">
        <span class="product-description-tag">Price: </span
        >{{ formatProductPrice(product.price) }} lv.
        <span class="product-description-tag">Pieces left: </span
        >{{ product.quantity }}
      </h3>
      <div class="product-buttons">
        <button v-if="userIsLogged" class="btn-edit" @click="addToCart">
          Add to cart
        </button>
        <button
          v-if="userIsAdministrator"
          class="btn-edit"
          @click="$router.push(`/products/edit/${product._id}`)"
        >
          Edit
        </button>
        <button
          v-if="userIsAdministrator"
          class="btn-delete"
          @click="$router.push(`/products/delete/${product._id}`)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { productService } from '@/services/productService';
import { orderService } from '@/services/orderService';
import { store } from '@/store';
import formatPrice from '@/utils/priceFormatter';
import router from '@/router';

export default {
  data() {
    return {
      productId: '',
      product: {},
      user: {},
      submitted: false,
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    userIsLogged() {
      return store.getters['authentication/loggedIn'];
    },
    userIsAdministrator() {
      return this.user && this.user.isAdministrator;
    },
  },
  methods: {
    async loadData() {
      const { dispatch } = this.$store;
      this.productId = this.$route.params.id;
      this.user = store.getters['authentication/user'];

      productService
        .getProduct(this.productId)
        .then((response) => {
          this.product = response.data;
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
    addToCart() {
      this.submitted = true;
      const { dispatch } = this.$store;

      orderService
        .addToCart(this.productId, this.user.id)
        .then(() => {
          dispatch(
            'alert/success',
            'Product added successfully in shopping cart.'
          );

          setTimeout(() => {
            router.push('/');
            router.go();
          }, 2500);
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
.product-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 50px auto;
  background: rgba(0, 0, 0, 0.30);
  border-radius: 7px;
}

.product-description-tag {
  font-size: 17px;
  font-style: italic;
  color: rgb(182, 182, 182);
}

.product-buttons {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.product-data {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-picture {
  max-width: 700px;
  margin-right: 30px;
  padding: 10px;
}

.img-fluid {
  width: 100%;
}
.product-name {
  font-size: 30px;
}

.product-info {
  font-size: 25px;
  color: rgb(228, 221, 211);
}

.btn-edit {
  background: rgb(189, 184, 184);
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 3px;
  border: none;
  padding: 7px 21px 7px 21px;
  margin: 7px;
}

.btn-edit:hover {
  cursor: pointer;
  background: grey;
  color: rgb(255, 104, 104);
  opacity: 50%;
  border-radius: 3px;
}

.btn-delete {
  background: rgb(194, 167, 166);
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 3px;
  border: none;
  padding: 7px 21px 7px 21px;
  margin: 7px;
}

.btn-delete:hover {
  cursor: pointer;
  background: grey;
  color: rgb(255, 104, 104);
  opacity: 50%;
  border-radius: 3px;
}
</style>
