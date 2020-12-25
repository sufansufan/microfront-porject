<template>
  <div class="custom">
    <add v-if="type === 'add'" />
    <edit v-else />
  </div>
</template>
<script>
import add from './add'
import edit from './edit'
export default {
  name: 'Custom',
  components: {
    edit,
    add
  },
  data() {
    return {

    }
  },
  computed: {
    type() {
      return this.$route.query.category
    }
  }

}
</script>
<style lang="less" scoped>
.custom {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
   .title {
      text-align: center;
      font-size:16px;
      font-weight: 700;
      color:#000;
      font-style: normal;
    }
    .btn {
      display: flex;
      justify-content: center;
      margin: 30px 0px;
    }
}
</style>
