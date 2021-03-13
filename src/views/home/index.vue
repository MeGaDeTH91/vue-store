<template>
  <div class="product-container">
    <h1>Products</h1>
    <div class="product-row">
      <div class="product-deck">
        <div
          class="product-card"
          v-for="(product, index) in this.products"
          :key="index"
        >
          <div class="thumbnail" onClick="{onDetails}">
            <img :src="product.imageURL" alt="Card image cap" />
            <div class="product-card-body">
              <h4 class="product-title" v-if="product.title.length > 21">
                {{ product.title }}
              </h4>
              <h4 class="product-title" v-else>
                <div>{{ product.title }}<br /><br /></div>
              </h4>
              <hr />
              <h3>{{ product.price }}lv.</h3>
              <p>{{ product.quantity }} pieces left.</p>
            </div>
          </div>
          <p class="product-card-category">
            <router-link
              class="link"
              :to="`/categories/category/${product.category}`"
              >{{ product.category }}</router-link
            >
          </p>
          <div v-if="isAdmin" class="product-card-footer"></div>
        </div>
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import { HTTP } from "@/services/httpService";

export default {
  data() {
    const loggedIn = this.$store.getters["authentication/loggedIn"];
    const isAdmin = loggedIn
      ? this.$store.getters["authentication/user"].isAdministrator
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
      const response = await HTTP.get("products/all");

      this.products = response.data;
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
  margin-right: 15px;
  margin-left: 115px;
}

.product-title {
  margin: 15px 0 25px 0;
}

.product-deck {
  display: flex;
  flex-flow: row wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.product-card {
  word-wrap: break-word;
  background-color: rgba(238, 238, 238, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  position: relative;
  min-width: 18rem;
  max-width: 18rem;
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

.product-card-category {
  text-align: center;
  color: black;
  margin: 15px 0 25px 0;
}

.product-card-footer {
  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
  background-color: #dddddd;
  color: white;
  border-top: 1px solid #dddddd;
  margin: 0;
  padding: 0;
  font-size: medium;
}

.thumbnail {
  display: block;
}

.thumbnail:hover {
  background-color: rgba(218, 216, 216, 0.315);
  border: 1px solid lightgray;
  color: rgb(196, 104, 0);
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
