<template>
  <div class="product-container">
    <h1>Products</h1>
    <div class="product-row">
      <div class="product-deck">
        <div class="product-card" v-for="(product, index) in this.products" :key="index">
          <div class="thumbnail" onClick="{onDetails}">
            <img :src="product.imageURL" alt="Card image cap"/>
          </div>
        </div>
      </div>
    </div>

    <br>
  </div>
</template>

<script>
import { HTTP } from "@/services/httpService";

export default {
  data() {
    return {
      products: [],
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

.product-deck {
  display: flex;
  flex-flow: row wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.product-card {
  box-sizing: border-box;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  position: relative;
  min-width: 18rem;
  max-width: 18rem;
  margin-bottom: 1.5rem !important;
  display: flex;
  flex: 1 0 0%;
  flex-direction: column;
  margin-right: 15px;
  margin-bottom: 0;
  margin-left: 50px;
}

.thumbnail {
    border-radius: 6px;
    display: block;
    border: 2px solid white;
}

.thumbnail:hover {
    background-color: #faf8f6;
    border: 2px solid #234465;
    color: #b82c17;
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

button:hover {
  color: dodgerblue;
  background: transparent;
}
</style>
