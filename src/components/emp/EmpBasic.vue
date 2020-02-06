<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" id="aa">
      <el-form-item label="姓名:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别:">
        <el-select v-model="form.gender" placeholder="请选择...">
          <el-option label="男" value="man"></el-option>
          <el-option label="女" value="woman"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号:">
        <el-input v-model="form.jobnumber"></el-input>
      </el-form-item>
      <el-form-item label="办公室:">
        <el-input v-model="form.office"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="form.mailbox"></el-input>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input type="textarea" v-model="form.remark" style="width:225px"></el-input>
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
        form: {
          name: '',
          gender: '',
          jobnumber:'',
          office:'',
          phone:'',
          mailbox:'',
          remark: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style>
  #aa input{
    width:225px;
  }
</style>
