<!--
 * @Descripttion:
 * @version:
 * @Author: YanQi
 * @Date: 2020-07-02 16:43:38
 * @LastEditors: YanQi
 * @LastEditTime: 2020-07-02 18:25:04
-->
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Redirect'
})
export default class extends Vue {
  created() {
    const { params, query } = this.$route;
    const { path } = params;

    this.$router.replace({ path: '/' + path, query });
  }

  render() {
    // Avoid warning for missing template
  }
}
</script>
