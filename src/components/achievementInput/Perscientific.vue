<template>
  <div>
    <el-row>
      <el-col :span="12" align="center">
        <h1>个人科研</h1>
      </el-col>
      <el-col :span="12" align="center">
        <h1>集体科研</h1>
      </el-col>
    </el-row>
    <el-row :gutter="8" >
      <el-col :span="11">
          <Personal></Personal>
      </el-col>
      <el-col :span="11" :offset="1">
        <Group></Group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import personal from "./Scientific/Perscientificpersonal";
import group from "./Scientific/Perscientificgroup";
export default {
  data() {
    return {
      form: {
        options: []
      },
      a: ""
    };
  },
  components: {
    Personal: personal,
    Group: group
  },
  created() {
    this.init();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    tf() {
      console.log(this.a);
      this.f = false;
    },
    init() {
      this.getRequest("/test/option", {
        option: "paper",
        title: "publication_type"
      }).then(res => {
        this.form.options = res.data.options;
      });
    }
  }
};
</script>