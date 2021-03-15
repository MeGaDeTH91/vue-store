<template>
  <div class="category-container">
    <h1>Categories</h1>
    <div class="category-row">
      <div class="category-deck">
        <div
          class="category-card"
          v-for="(category, index) in this.categories"
          :key="index"
        >
          <div class="thumbnail" @click="$router.push(`/categories/details/${category._id}`)">
            <img :src="category.imageURL" alt="Card image cap" />
            <div class="category-card-body">
              <h4 class="category-title" v-if="category.title.length > 21">
                {{ category.title }}
              </h4>
              <h4 class="category-title" v-else>
                <div>{{ category.title }}<br /><br /></div>
              </h4>
            </div>
          </div>
          <div v-if="isAdmin" class="category-card-footer">
            <button
              class="btn-edit"
              @click="$router.push(`/categories/edit/${category._id}`)"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import { categoryService } from '@/services/categoryService';
import formatPrice from '@/utils/priceFormatter';

export default {
  data() {
    const loggedIn = this.$store.getters['authentication/loggedIn'];
    const isAdmin = loggedIn
      ? this.$store.getters['authentication/user'].isAdministrator
      : false;
    return {
      categories: [],
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
        response = await categoryService.getAll();
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

      this.categories = response.data;
    },
    formatcategoryPrice(price) {
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

.category-container {
  margin: 20px auto 350px auto;
  width: 100%;
  padding: 10px;
}
.category-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
}

.category-title {
  margin: 15px 0 25px 0;
}

.category-deck {
  display: flex;
  flex-flow: row wrap;
}

.category-card {
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

.category-card-body {
  flex: 1 1 auto;
  padding: 5px;
  word-wrap: break-word;
}

.category-card-category {
  text-align: center;
  color: black;
  margin: 15px 0 25px 0;
}

.category-card-footer {
  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
  background-color: #dddddd;
  color: white;
  border-top: 1px solid #dddddd;
  margin: 0;
  padding: 0;
  font-size: medium;
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
