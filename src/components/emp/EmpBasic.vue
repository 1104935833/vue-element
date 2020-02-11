<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" id="aa">
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工号:" prop="workID">
        <el-input v-model="form.workID" disabled></el-input>
      </el-form-item>
      <el-form-item label="办公室:" prop="office_id">
        <el-select v-model="form.office_id" placeholder="请选择">
          <el-option
            v-for="item in office"
            :key="item.id"
            :label="item.office"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话:" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="note">
        <el-input type="textarea" v-model="form.note" style="width:225px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1:5,
      
      office: [],

      form: {
        name: "",
        gender: "",
        workID: "",
        office_id: '',
        phone: "",
        email: "",
        note: ""
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getRequest("/base/userInfo").then(res => {
        this.form = res.data.details;
        this.form.office_id=this.form.office_id.toString();
        this.office =res.data.office;
      });
    },

    onSubmit() {
      console.log(this.form);
      this.post("/base/changeInfo", { info: this.form }).then(res => {
        if (res.data.msg == "修改成功") {
          let info = JSON.stringify(res.data.obj);
          window.localStorage.setItem("user", info);
        }
        this.init();
      });
    }
  }
};
</script>
<style>
#aa input {
  width: 225px;
}
</style>
