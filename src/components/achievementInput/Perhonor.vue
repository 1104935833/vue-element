<template>
  <div>
    <div>
      <!-- 第一行 -->
      <el-row>
        <el-col :span="12">
          <h1 align="center">个人荣誉</h1>
        </el-col>
        <el-col :span="12">
          <h1 align="center">集体荣誉</h1>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <!--<el-row>
        <el-col :span="12">
          <el-row>
            <el-col>
              <h5 align="center">工会</h5>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-checkbox v-model="checked">巾帼文明示范岗先进个人</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">事业家庭兼顾型先进个人</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">师德标兵</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">三育人先进个人</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">“杭州教育工匠”暨“最美思政教师</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">最美班主任</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">优秀共产党员</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">工会活动积极分子</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">优秀工会工作者</el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <h5 align="center">人事</h5>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-checkbox v-model="checked">年度考核优秀</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">优秀教师</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked">优秀教育工作者</el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <h5 align="center">组织</h5>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col>
              <el-checkbox v-model="checked">巾帼文明示范岗先进集体</el-checkbox>
            </el-col>
          </el-row>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col>
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="荣誉类型">
                   <el-select v-model="a" placeholder="请选择" @change="this.tf">
                      <el-option 
                        
                        v-for="item in form.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                      </el-option>
                   </el-select>
                </el-form-item>
                  <el-form-item label="荣誉类型">
                  <el-select v-model="rongyuleixing" multiple placeholder="请选择" :disabled="f" >
                      <el-option
                      v-for="item in form.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                
                <el-form-item label="活动时间">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.date1"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                  <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质">
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        a:'',//页面选择传递数据的来源
        rongyuleixing:'',
        f:true,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          options: [],
        }
      }
    },
      created(){
        this.init()
      },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      tf(){
        console.log(this.a);
        this.f=false;
      },
      init(){
        this.form.options=[{
          value: '工会',
          label: '工会'
        }, {
          value: '人事',
          label: '人事'
        }, {
          value: '组织',
          label: '组织'
        }, {
          value: '综保',
          label: '综保'
        }, {
          value: '科研',
          label: '科研'
        }, {
          value: '教务',
          label: '教务'
        }]
      }
    }
  }
</script>