<template>
  <div class="form-container">
    <h1>Update profile info</h1>
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
    <form class="login-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email"
          >Email:
          <input
            disabled
            type="email"
            v-model="email"
            name="email"
            class="form-control email-input"
          />
        </label>
      </div>
      <div class="form-group">
        <label for="fullName"
          >Full Name:
          <input
            type="text"
            v-model="fullName"
            name="fullName"
            class="form-control"
          />
        </label>
      </div>
      <div class="form-group">
        <label for="phone"
          >Phone:
          <input
            type="text"
            v-model="phone"
            name="phone"
            class="form-control"
          />
        </label>
      </div>
      <div class="form-button">
        <button class="btn-primary">Update info</button>
        <button class="go-back-btn" @click="goBack">Go Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import { userService } from '@/services/userService';
import router from '@/router';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      userId: '',
      email: '',
      fullName: '',
      phone: '',
      submitted: false,
    };
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
          let user = response.data;

          this.userId = user._id;
          this.email = user.email;
          this.fullName = user.fullName;
          this.phone = user.phone;
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
    goBack(e) {
      e.preventDefault();

      this.$router.history.go(-1);
    },

    handleSubmit(e) {
      e.preventDefault();
      const { userId, fullName, phone } = this;
      const { dispatch } = this.$store;

      this.$v.$touch();
      if (this.$v.$invalid) {
        dispatch('alert/error', 'Please fill all fields correctly.');

        setTimeout(() => {
          dispatch('alert/clear');
        }, 4000);

        return;
      }

      this.submitted = true;

      dispatch('alert/success', 'User registered successfully!');

      userService
        .editUser(userId, fullName, phone)
        .then(() => {
          dispatch('alert/success', 'User info updated successfully!');

          setTimeout(() => {
            router.push('/profile-details');
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
  },
  validations: {
    fullName: {
      required,
      minLength: minLength(3),
    },
    phone: {
      maxLength: maxLength(50),
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
  color: rgb(119, 153, 113);
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

.email-input {
  color: white;
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
