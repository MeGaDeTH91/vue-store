<template>
  <div v-if="this.products && this.products.length" class="product-container">
    <h1>Products</h1>
    <div class="product-row">
      <div class="product-deck">
        <div
          class="product-card"
          v-for="(product, index) in this.products"
          :key="index"
        >
          <div class="thumbnail" @click="$router.push(`/products/details/${product._id}`)">
            <img :src="product.imageURL" alt="Card image cap" />
            <div class="product-card-body">
              <h4 class="product-title" v-if="product.title.length > 30">
                {{ product.title }}
              </h4>
              <h4 class="product-title" v-else>
                <div>{{ product.title }}<br /><br /></div>
              </h4>
              <hr />
              <h3>{{ formatProductPrice(product.price) }} lv.</h3>
              <p>{{ product.quantity }} pieces left.</p>
            </div>
          </div>
          <p class="product-card-category">
            <router-link
              class="link"
              :to="`/categories/${product.category._id}/products`"
              >{{ product.category.title }}</router-link
            >
          </p>
          <div v-if="isAdmin" class="product-card-footer">
            <button
              class="btn-edit"
              @click="$router.push(`/products/edit/${product._id}`)"
            >
              Edit
            </button>
            <button class="btn-delete" @click="$router.push(`/products/delete/${product._id}`)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <br />
  </div>
  <div v-else class="product-container">
    <h1>Database is under maintenance, please try again later.</h1>
  </div>
</template>

<script>
import { productService } from '@/services/productService';
import formatPrice from '@/utils/priceFormatter';

export default {
  data() {
    const loggedIn = this.$store.getters['authentication/loggedIn'];
    const isAdmin = loggedIn
      ? this.$store.getters['authentication/user'].isAdministrator
      : false;
    return {
      products: [],
      isAdmin,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { dispatch } = this.$store;
      let response;

      try {
        response = await productService.getAllProducts();
      } catch (error) {
        dispatch(
          'alert/error',
          'There is a problem with database, please try again later.'
        );

        setTimeout(() => {
          dispatch('alert/clear');
        }, 10000);

        return;
      }

      this.products = response.data;
    },
    formatProductPrice(price) {
      return formatPrice(price);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Home CSS  */
.home {
  text-align: center;
}

hr {
  width: 80%;
  height: 1px;
  border: none;
  background-color: black;
  margin: 0 auto;
}

.product-container {
  margin: 20px auto 350px auto;
  width: 100%;
  padding: 10px;
}
.product-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
}

.product-title {
  margin: 11px 17px;
}

.product-deck {
  display: flex;
  flex-flow: row wrap;
}

.product-card {
  word-wrap: break-word;
  background-color: rgba(238, 238, 238, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  position: relative;
  min-width: 18rem;
  max-width: 19rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex: 1 0 0%;
  flex-direction: column;
  margin-right: 15px;
  margin-bottom: 35px;
  margin-left: 50px;
}

.product-card-body {
  flex: 1 1 auto;
  padding: 5px;
  word-wrap: break-word;
}

.product-card-body h3 {
  font-size: 26px;
}

.product-card-category {
  text-align: center;
  color: black;
  margin: 15px 0 25px 0;
}

.product-card-footer {
  display: flex;
  justify-content: flex-end;
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

.thumbnail {
  display: block;
}

.thumbnail:hover {
  background-color: rgba(218, 216, 216, 0.315);
  border: 1px solid lightgray;
  color: rgba(196, 105, 0, 0.411);
  cursor: pointer;
  font-style: italic;
}

img {
  width: 100%;
  height: 210px;
  object-fit: cover;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  border-style: none;
  background: white;
}

button {
  width: 60%;
  margin: 0 auto;
  border: 2px solid dodgerblue;
  text-align: center;
  font-size: 14px;
  background: dodgerblue;
  color: white;
  border-radius: 7px;
  margin-top: 20px;
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
}

.link {
  color: #135f6b;
  text-decoration: none;
  margin-bottom: 0;
}

.link:hover {
  border-top: none;
  font-weight: bold;
}

button:hover {
  color: dodgerblue;
  background: transparent;
}
</style>
