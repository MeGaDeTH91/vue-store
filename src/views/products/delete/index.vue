<template>
  <div class="form-container">
    <h1>Delete Product</h1>
    <div v-if="submitted" class="ispinner white large animating">
      <div class="ispinner-blade"></div>
      <div class="ispinner-blade"></div>
      <div class="ispinner-blade"></div>
      <div class="ispinner-blade"></div>
      <div class="ispinner-blade"></div>
      <div class="ispinner-blade"></div>
      <div class="ispinner-blade"></div>
      <div class="ispinner-blade"></div>
      <div class="ispinner-blade"></div>
      <div class="ispinner-blade"></div>
      <div class="ispinner-blade"></div>
      <div class="ispinner-blade"></div>
    </div>
    <img
      v-if="imageURL"
      :src="imageURL"
      width="30%"
      height="30%"
      alt="Product visual representation will appear here"
    />
    <form class="login-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title"
          >Title:
          <input
            disabled
            type="text"
            v-model="title"
            name="title"
            class="form-control"
          />
        </label>
      </div>
      <div class="form-group">
        <label for="description"
          >Description:
          <textarea
            disabled
            type="text"
            v-model="description"
            name="description"
            class="form-control"
          />
        </label>
      </div>
      <div class="form-group">
        <label for="imageURL"
          >Image URL:
          <input
            disabled
            type="text"
            v-model="imageURL"
            name="imageURL"
            class="form-control"
          />
        </label>
      </div>
      <div class="form-group">
        <label htmlFor="price"
          >Price:
          <input
            disabled
            type="number"
            step="any"
            v-model="price"
            name="price"
            class="form-control"
          />
        </label>
      </div>
      <div class="form-group">
        <label htmlFor="quantity"
          >Quantity:
          <input
            disabled
            type="number"
            v-model="quantity"
            name="quantity"
            class="form-control"
          />
        </label>
      </div>
      <div class="">
        <label htmlFor="category"
          >Category:
          <v-select
            disabled
            class="dropdown"
            placeholder="Please select an option"
            :options="categories"
            :reduce="(category) => category._id"
            v-model="category"
            label="title"
          ></v-select>
        </label>
      </div>
      <div class="form-button">
        <button class="btn-primary" type="submit">Delete</button>
        <button class="go-back-btn" @click="goBack">Go Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import { productService } from '@/services/productService';
import { categoryService } from '@/services/categoryService';
import router from '@/router';

export default {
  data() {
    return {
      productId: '',
      title: '',
      description: '',
      imageURL: '',
      price: '',
      quantity: '',
      category: '',
      categories: [],
      submitted: false,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { dispatch } = this.$store;
      let productResponse;
      let categoryResponse;
      this.productId = this.$route.params.id;
      
      try {
        productResponse = await productService.getProduct(this.productId);
        categoryResponse = await categoryService.getAllCategories();
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

      let product = productResponse.data;
      this.categories = categoryResponse.data;

      this.title = product.title;
      this.description = product.description;
      this.imageURL = product.imageURL;
      this.price = product.price;
      this.quantity = product.quantity;
      this.category = product.category;
    },
    handleSubmit(e) {
      e.preventDefault();
      const { productId } = this;
      const { dispatch } = this.$store;

      this.submitted = true;

      productService
        .deleteProduct(productId)
        .then(() => {
          dispatch('alert/success', 'Product removed successfully!');

          setTimeout(() => {
            router.push('/');
            router.go();
          }, 500);
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
    goBack(e) {
      e.preventDefault();

      this.$router.history.go(-1);
    },
    openWidget(e) {
      e.preventDefault();

      const widget = window.cloudinary.openUploadWidget(
        {
          cloudName: 'devpor11z',
          uploadPreset: 'react-course',
        },
        (error, result) => {
          if (result.event === 'success') {
            this.imageURL = result.info.url;
          }
        }
      );

      widget.open();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Home CSS  */
.form-container {
  display: flex;
  flex-direction: column;
  background-color: rgba(48, 28, 9, 0.534);
  max-width: 70%;
  margin: 80px auto;
  min-height: 650px;
  align-items: center;
  padding: 30px;
  border-radius: 10px;
}

label {
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  min-height: 30px;
  width: 100%;
  margin: 20px;
}

.form-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 60px;
}

textarea {
  resize: vertical;
}

.widget-btn {
  margin-top: 0;
}

.dropdown {
  color: white;
  right: 10px;
  background-color: white;
  padding: 3px;
  width: 65%;
  border-color: #17a2b8;
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

.form-control {
  width: 65%;
  text-align: left;
  font-size: 19px;
  border: 3px solid lightgray;
  padding: 7px 12px 7px 10px;
  margin: 10px;
}

.form-group label {
  font-size: 19px;
}

.form-group input,
.form-group textarea {
  color: white;
}

.ispinner {
  position: relative;
  width: 20px;
  height: 20px;
}
.ispinner .ispinner-blade {
  position: absolute;
  top: 6.5px;
  left: 8.5px;
  width: 2.5px;
  height: 6.5px;
  background-color: #8e8e93;
  border-radius: 1.25px;
  animation: iSpinnerBlade 1s linear infinite;
  will-change: opacity;
}
.ispinner .ispinner-blade:nth-child(1) {
  transform: rotate(45deg) translateY(-6.5px);
  animation-delay: -1.625s;
}
.ispinner .ispinner-blade:nth-child(2) {
  transform: rotate(90deg) translateY(-6.5px);
  animation-delay: -1.5s;
}
.ispinner .ispinner-blade:nth-child(3) {
  transform: rotate(135deg) translateY(-6.5px);
  animation-delay: -1.375s;
}
.ispinner .ispinner-blade:nth-child(4) {
  transform: rotate(180deg) translateY(-6.5px);
  animation-delay: -1.25s;
}
.ispinner .ispinner-blade:nth-child(5) {
  transform: rotate(225deg) translateY(-6.5px);
  animation-delay: -1.125s;
}
.ispinner .ispinner-blade:nth-child(6) {
  transform: rotate(270deg) translateY(-6.5px);
  animation-delay: -1s;
}
.ispinner .ispinner-blade:nth-child(7) {
  transform: rotate(315deg) translateY(-6.5px);
  animation-delay: -0.875s;
}
.ispinner .ispinner-blade:nth-child(8) {
  transform: rotate(360deg) translateY(-6.5px);
  animation-delay: -0.75s;
}
.ispinner.ispinner-large {
  width: 35px;
  height: 35px;
}
.ispinner.ispinner-large .ispinner-blade {
  top: 11.5px;
  left: 15px;
  width: 5px;
  height: 12px;
  border-radius: 2.5px;
}
.ispinner.ispinner-large .ispinner-blade:nth-child(1) {
  transform: rotate(45deg) translateY(-11.5px);
}
.ispinner.ispinner-large .ispinner-blade:nth-child(2) {
  transform: rotate(90deg) translateY(-11.5px);
}
.ispinner.ispinner-large .ispinner-blade:nth-child(3) {
  transform: rotate(135deg) translateY(-11.5px);
}
.ispinner.ispinner-large .ispinner-blade:nth-child(4) {
  transform: rotate(180deg) translateY(-11.5px);
}
.ispinner.ispinner-large .ispinner-blade:nth-child(5) {
  transform: rotate(225deg) translateY(-11.5px);
}
.ispinner.ispinner-large .ispinner-blade:nth-child(6) {
  transform: rotate(270deg) translateY(-11.5px);
}
.ispinner.ispinner-large .ispinner-blade:nth-child(7) {
  transform: rotate(315deg) translateY(-11.5px);
}
.ispinner.ispinner-large .ispinner-blade:nth-child(8) {
  transform: rotate(360deg) translateY(-11.5px);
}

@keyframes iSpinnerBlade {
  0% {
    opacity: 0.85;
  }
  50% {
    opacity: 0.25;
  }
  100% {
    opacity: 0.25;
  }
}
</style>
