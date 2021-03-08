<template>
  <div class="form-container">
    <h1>Login</h1>
    <form class="login-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username"
          >Username:
          <input
            type="text"
            v-model="username"
            name="username"
            class="form-control"
          />
        </label>
      </div>
      <div class="form-group">
        <label htmlFor="password"
          >Password:
          <input
            type="password"
            v-model="password"
            name="password"
            class="form-control"
          />
        </label>
      </div>
      <div class="form-button">
        <button class="btn-primary">Login</button>
      </div>
    </form>
  </div>
</template>
  
  <script>
import router from "../../router";

export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
    };
  },
  created() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.submitted = true;
      const { username, password } = this;
      const { dispatch } = this.$store;
      if (username && password) {
        dispatch("authentication/login", { username, password });
        router.push('/')
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
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
  background-color: rgba(0, 0, 0, 0.75);
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
  align-items: center;
  min-height: 30px;
  width: 100%;
  margin: 40px;
}

.form-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 80px;
}

.btn-primary {
  background: rgb(194, 167, 166);
  font-size: 18px;
  font-weight: bold;
  color: black;
  border-radius: 3px;
  border: none;
  padding: 11px 35px 11px 35px;
}

.btn-primary:hover {
  cursor: pointer;
}

.form-control {
  width: 65%;
  text-align: center;
  font-size: 19px;
  border: 3px solid lightgray;
  padding: 8px 12px 8px 0;
  margin: 10px;
}

.form-group label {
  font-size: 21px;
}
</style>
  