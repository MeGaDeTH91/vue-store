<template>
  <div class="users-container">
    <h1 class="users-title">Manage users</h1>

    <div class="users-picture">
      <img class="img-fluid" src="@/assets/user.jpg" alt="Express" />
    </div>

    <table class="users-table">
      <thead class="users-table-head">
        <tr class="users-table-row">
          <th class="users-table-row-thead">#</th>
          <th class="users-table-row-thead">Email</th>
          <th class="users-table-row-thead">Full Name</th>
          <th class="users-table-row-thead">Phone</th>
          <th class="users-table-row-thead">Active</th>
          <th class="users-table-row-thead">Administrator</th>
          <th class="users-table-row-thead">Actions</th>
        </tr>
      </thead>
      <tbody class="users-table-body">
        <tr
          class="users-table-row"
          v-for="(user, index) in this.users"
          :key="index"
        >
          <td class="users-table-body-td">{{ index + 1 }}.</td>
          <td class="users-table-body-td">{{ user.email }}</td>
          <td class="users-table-body-td">{{ user.fullName }}</td>
          <td class="users-table-body-td">{{ getUserPhone(user) }}</td>
          <td class="users-table-body-td">
            <input
              v-if="user.isActive"
              class="users-table-body-td-ckeckbox"
              disabled
              checked
              type="checkbox"
            />
            <input
              v-else
              class="users-table-body-td-ckeckbox"
              disabled
              type="checkbox"
            />
          </td>
          <td class="users-table-body-td">
            <input
              v-if="user.isAdministrator"
              class="users-table-body-td-ckeckbox"
              disabled
              checked
              type="checkbox"
            />
            <input
              v-else
              class="users-table-body-td-ckeckbox"
              disabled
              type="checkbox"
            />
          </td>
          <td class="users-table-body-td">
            <button
              v-if="user.isActive"
              class="btn-primary"
              @click="toggleStatus(user._id)"
            >
              Ban
            </button>
            <button
              v-else
              class="go-back-btn unban-btn"
              @click="toggleStatus(user._id)"
            >
              Unban
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { userService } from '@/services/userService';

export default {
  data() {
    return {
      users: {},
    };
  },
  created() {
    this.loadData();
  },
  computed: {},
  methods: {
    async loadData() {
      const { dispatch } = this.$store;

      userService
        .getAllUsers()
        .then((response) => {
          this.users = response.data;
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
    toggleStatus(id) {
      const { dispatch } = this.$store;

      userService
        .changeUserStatus(id)
        .then((response) => {
          console.log(response);
          dispatch('alert/success', 'User status changed successfully!');

          setTimeout(() => {
            window.location.reload();
          }, 2000);
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
    getUserPhone(user) {
      return user.phone ? user.phone : 'Not provided';
    },
  },
};
</script>

<style scoped>
.users-table {
  border-radius: 8px;
  background-color: rgba(255, 249, 246, 0.75);
  width: 90%;
  border: 1px solid #858585;
  height: 20vh;
  margin: 50px auto;
  padding-top: 15px;
}

.img-fluid {
  opacity: 0.8;
}

.users-table-row-thead {
  padding-bottom: 25px;
  color: #ce5a1675;
  border: 3px black;
}

.users-table-row {
  color: #f3cf9f;
  border-bottom: solid;
}

.users-table-head {
  border: 3px black;
  color: orange;
}

.users-table-body {
  border: 3px black;
  color: grey;
}

.users-table-body-td {
  padding-bottom: 25px;
  color: black;
  border: 3px black;
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

.unban-btn {
  padding: 11px 24px 11px 24px;
  margin: 0;
}

.users-table-body-td-ckeckbox {
  background-color: #fafafa;
  border: 1px solid #cacece;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 1px;
  border-radius: 3px;
  opacity: 1;
}
</style>
