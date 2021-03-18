<template>
  <div class="profile-container">
    <h1 class="profile-name">{{ user.fullName }}</h1>

    <div class="profile-picture">
      <img class="img-fluid" src="@/assets/user.jpg" alt="Express" />
    </div>

    <div class="profile-data">
      <h3 class="profile-info">Email: {{ user.email }}</h3>
      <h3 class="profile-info">Phone: {{ getUserPhone }}</h3>
      <div class="profile-buttons">
        <button class="btn-profile" @click="$router.push('/profile-edit')">
          Edit Profile
        </button>
        <button class="btn-profile" @click="$router.push('/my-orders')">
          My Orders
        </button>
        <button class="btn-profile" @click="goBack">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import { userService } from '@/services/userService';

export default {
  data() {
    return {
      user: {},
    };
  },
  computed: {
    getUserPhone() {
      return this.user.phone ? this.user.phone : 'Not provided';
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { dispatch } = this.$store;
      const user = this.$store.getters['authentication/user'];

      userService
        .getUser(user.id)
        .then((response) => {
          this.user = response.data;
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
    handleSubmit(e) {
      e.preventDefault();
    },
    goBack(e) {
      e.preventDefault();

      this.$router.history.go(-1);
    },
  },
};
</script>

<style scoped>
.profile-buttons {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.profile-info {
  font-size: 35px;
  color: rgb(228, 221, 211);
}

.btn-profile {
  background: rgb(187, 168, 139);
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 3px;
  border: none;
  padding: 7px 21px 7px 21px;
  margin: 7px;
}

.btn-profile:hover {
  cursor: pointer;
  background: grey;
  color: rgb(255, 104, 104);
  opacity: 50%;
  border-radius: 3px;
}
</style>
