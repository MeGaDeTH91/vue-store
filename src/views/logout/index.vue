<script>
import { store } from '../../store';
export default {
  beforeRouteEnter(to, from, next) {
    store.dispatch('alert/success', 'Logged out successfully!');

    setTimeout(() => {
      store.dispatch('authentication/logout');
      store.dispatch('alert/clear');
    }, 2000);

    next(false);
  },
};
</script>

<style scoped></style>
