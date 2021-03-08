 
<script>
import { store }  from '../../store'
export default {
  beforeRouteEnter(to, from, next) {
    store.dispatch("authentication/logout");
    next(false);
  },
};
</script>
  
<style scoped>
</style>
  