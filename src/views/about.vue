<template>
  <div class="about">
   <div>
     <!-- {{$store.state.user.userName}} -->
     {{userName}}--{{age}}---{{sys}}
   </div>
   
   <el-button @click="handleChange">change</el-button>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
import TestCom from "@/components/TestCom";
// import Test2 from "@/components/Test2";
// import TestComVue from '../components/TestCom.vue';
export default {
  components: {
    // TestCom,
    // Test2,
  },
  computed: {
    ...mapGetters(['userName','age','sys']),  
  },
  data() {
    return {
      msg: "11111",
      value: "hello333",
      a: TestCom,
      firstName:"sam",
      lastName:"li"
    };
  },
  methods: {
    fatherClick(value) {
      console.log(value);
      this.msg = value;
    },
    handleChange() {
      this.$store.commit("user/SET_USERNAME","vue3333学习完了")
    },
  },
  watch: {
    firstName(newValue) {
      console.log(newValue)
    }
  },
};
</script>

