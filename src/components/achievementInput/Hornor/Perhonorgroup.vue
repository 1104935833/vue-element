<template>
  <div>
    <el-row>
      <el-col>
        <h1 align="center">集体荣誉</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=8>
          <p>&nbsp;</p>
      </el-col>
      <el-col :span=12>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="荣誉类型">
            <el-select v-model="a" placeholder="请选择" @change="this.tf">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="荣誉名称">
            <el-select v-model="rongyuleixing" multiple placeholder="请选择" :disabled="f">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组织名称">
            <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
          </el-form-item>
          <el-form-item label="组织成员">
            <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
          </el-form-item>
          <el-form-item label="获得时间">
            <el-col :span="11">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- 调用后端接口的路径 -->
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">上传佐证材料</div>
          </el-upload>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span=6><p>&nbsp;</p></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      a: "", //页面选择传递数据的来源
      rongyuleixing: "",
      f: true,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        options: []
      }
    };
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
      this.form.options = [
        {
          value: "工会",
          label: "工会"
        },
        {
          value: "人事",
          label: "人事"
        },
        {
          value: "组织",
          label: "组织"
        },
        {
          value: "综保",
          label: "综保"
        },
        {
          value: "科研",
          label: "科研"
        },
        {
          value: "教务",
          label: "教务"
        }
      ];
    }
  }
};
</script>