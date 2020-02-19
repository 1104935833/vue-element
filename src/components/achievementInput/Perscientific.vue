<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col>
            <h1 align="center">个人科研业绩</h1>
          </el-col>
        </el-row>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="荣誉类型">
            <el-select v-model="a" placeholder="请选择" @change="this.tf">
              <el-option
                v-for="item in form.options"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="荣誉类型">
            <el-select v-model="rongyuleixing" multiple placeholder="请选择" :disabled="f">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <Personal v-if="a==1"></Personal>
      </el-col>
      <el-col :span="12">
        <group></group>
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