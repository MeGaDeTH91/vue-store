<script>
import { store } from '../../store';
export default {
  beforeRouteEnter(to, from, next) {
    store.dispatch('alert/success', 'Logged out successfully!');

    setTimeout(() => {
      store.dispatch('authentication/logout');
      store.dispatch('alert/clear');
    }, 2500);

    next(false);
  },
};
</script>

<style scoped></style>
