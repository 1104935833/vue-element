<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-row type="flex" align="middle">
        <el-col :span="24">
          <el-form-item label="论文类型：">
            <el-radio-group v-model="form.paper_type">
              <el-radio :label="1">期刊论文</el-radio>
              <el-radio :label="2">论文集</el-radio>
              <el-radio :label="3">学位论文</el-radio>
              <el-radio :label="4">会议论文</el-radio>
              <el-radio :label="5">其他(报刊文章、科普文章、评论等)</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle" >
        <el-col :span="11">
          <el-form-item label="论文标题：">
            <el-input placeholder="请输入内容" v-model="form.paper_title" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="7">
          <el-form-item label="第一作者类型：">
            <el-radio-group v-model="form.first_auth_type">
              <el-radio :label="1">本校老师</el-radio>
              <el-radio :label="2">本校学生</el-radio>
              <el-radio :label="3">外校人员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="7">
          <el-form-item label="第一作者：">
            <el-input placeholder="请输入内容" v-model="form.first_author" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="7">
          <el-form-item label="发表/出版时间：">
            <el-date-picker v-model="form.time" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="发表刊物/论文集：">
            <el-input placeholder="请输入内容" v-model="form.publication" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="7">
          <el-form-item label="期刊等级：">
          <el-select v-model="form.paper_grade" placeholder="请选择">
          <el-option
            v-for="item in form.paperGrades"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
          </el-option>
        </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="7">
          <el-form-item label="所属单位：">
            <el-select v-model="form.paper_company" placeholder="请选择">
              <el-option
                v-for="item in form.paperCompanys"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="一级学科：">
          <el-select v-model="form.paper_a" placeholder="请选择">
          <el-option
            v-for="item in form.subjects"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
          </el-option>
        </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="7">
          <el-form-item label="项目来源：">
            <el-select v-model="form.project_source" placeholder="请选择">
              <el-option
                v-for="item in form.sources"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="发表范围：">
          <el-select v-model="form.publication_scope" placeholder="请选择">
            <el-option
              v-for="item in form.scopes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
      
        <el-col :span="7">
          <el-form-item label="期号：">
            <el-input placeholder="请输入内容" v-model="form.paper_issue" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="7">
          <el-form-item label="页码范围：">
            <el-input placeholder="请输入内容" v-model="form.paper_page" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="字数：">
            <el-input placeholder="请输入内容" v-model="form.paper_word" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3"><span>万字</span></el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="7">
          <el-form-item label="学校署名：">
            <el-radio-group v-model="form.paper_school">
              <el-radio :label="1">第一单位</el-radio>
              <el-radio :label="2">单选按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="版面：">
            <el-radio-group v-model="form.pape">
              <el-radio :label="1">正刊</el-radio>
              <el-radio :label="2">增刊</el-radio>
              <el-radio :label="3">年刊</el-radio>
              <el-radio :label="4">专刊</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="7">
          <el-form-item label="ISSN号：">
            <el-input placeholder="请输入内容" v-model="form.paper_issn" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="7">
          <el-col>
            <el-form-item label="CN号：">
              <el-input placeholder="请输入内容" v-model="form.paper_cn" clearable></el-input>
            </el-form-item>
          </el-col>
          
        
        </el-col>
        <el-col :span="10" :offset="4">
          <el-upload
            ref="file"
            class="upload-demo"
            drag
            acceept="application/pdf"
            action="/test/file"
            :on-success="handleSuccess"
            accept=".jpg,.jpeg,.png,.pdf,.JPG,.JPEG,.PDF"
            :on-remove="handleRemove"
            :on-error="handleError"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/pdf文件</div>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="12">
          <el-form-item>
            <el-button type="primary" @click="submit('form')">提交</el-button>
            <el-button type="primary" @click="update()">修改</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Axios from 'axios';
  export default {
    data () {
      
      return {
        form:{
          teacher_id:JSON.parse(sessionStorage.getItem('login')).user.id,
          paper_type: 0,
          first_auth_type:0,
          paper_grade:'',
          paper_cn:'',
          paper_issn:'',
          pape:'',
          paper_school:'',
          paper_word:'',
          paper_page:'',
          paper_issue:'',
          publication_scope:'',
          first_author:'',
          project_source:'',
          paper_a:'',
          paper_title: '',
          time:'',
          publication:'',
          paper_company:'',
          paperGrades:[],//期刊等级
          paperCompanys:[],//所属单位
          subjects:[],//一级学科
          sources:[],//项目来源
          scopes:[],//发表范围
        }
      };
    },
    methods: {
      submit(form){
        let data=this.$refs[form].model;
        console.log(data);
        this.postRequest("/test/data",data).then(res=>{
          if(res.data.msg=="success"){
            this.$message({message: '提交成功',type: 'success'});
          }
        });
      },
      update(){

        console.log();
        this.getRequest("/update",data).then(res=>{
          
        })
      },
      getlist(){
        this.getRequest("/test/dataList").then(res=>{
          this.paperGrades=res.data.paperGrades;
          this.paperCompanys=res.data.paperCompanys;
          this.subjects=res.data.subjects;
          this.sources=res.data.sources;
          this.scopes=res.data.scopes;
          // console.log(this.paperGrades);
        })
      },
      handleSuccess(response, file, fileList){
        if(file.status=="success"){
          this.$message({message: '文件上传成功',type: 'success'});
        }
        
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {//文件移除钩子
        this.getRequest("/test/delFile",{fileName:file.response}).then(res=>{
        if(res.data=='success'){
          this.$message({message: '文件移除成功',type: 'success'});
        }
        else{
          this.$message.error('文件删除失败');
        }
      })
        
      },
      handleError(err, file, fileList){//上传失败钩子
        this.$message.error('文件上传失败');
      },
      handlePreview(file) {//点击文件列表中已上传的文件时的钩子
        // console.log(file);
      }
    },
    created(){
      this.getlist();
    }
  }
</script>
<style lang="scss">
.el-upload-dragger{
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 660px;
    height: 180px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
  .el-col{
    margin-bottom: 20px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
