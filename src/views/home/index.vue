<template>
  <div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      // const response = await fetch("http://localhost:8000/api/movies/all");

      // this.movies = await response.json();
      console.log(this.movies);
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

.home ul.movies {
  display: flex;
  margin: 0 auto;
  width: 50%;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.home li.movie {
  display: grid;
}

.home img {
  margin: 0 auto;
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
