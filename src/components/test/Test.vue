<template>
  <div>
    <el-row type="flex" align="middle">
      <el-col :span="3">论文类型：</el-col>
      <el-col :span="21">
        <el-radio-group v-model="paper_type">
          <el-radio :label="1">期刊论文</el-radio>
          <el-radio :label="2">论文集</el-radio>
          <el-radio :label="3">学位论文</el-radio>
          <el-radio :label="4">会议论文</el-radio>
          <el-radio :label="5">其他(报刊文章、科普文章、评论等)</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" >
      <el-col :span="3">论文标题：</el-col>
      <el-col :span="11">
        <el-input placeholder="请输入内容" v-model="paper_title" clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">第一作者类型：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="first_auth_type">
          <el-radio :label="1">本校老师</el-radio>
          <el-radio :label="2">本校学生</el-radio>
          <el-radio :label="3">外校人员</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">第一作者：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="first_author" clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">通讯作者：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="correspondence_author" clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">发表/出版时间：</el-col>
      <el-col :span="7">
        <el-date-picker v-model="time" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
      <el-col :span="3" :offset="4">发表刊物/论文集：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="publication" clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">刊物类型：</el-col>
      <el-col :span="10">
        <el-checkbox-group v-model="publication_type">
          <el-checkbox label="SCI"></el-checkbox>
          <el-checkbox label="EI"></el-checkbox>
          <el-checkbox label="ISTP"></el-checkbox>
          <el-checkbox label="SSCI"></el-checkbox>
          <el-checkbox label="核心期刊(北大刊源)"></el-checkbox>
          <el-checkbox label="CSSCI(南大刊源)"></el-checkbox>
          <el-checkbox label="普通期刊"></el-checkbox>
          <el-checkbox label="理科一级期刊"></el-checkbox>
          <el-checkbox label="文科权威期刊"></el-checkbox>
          <el-checkbox label="文科一级期刊"></el-checkbox>
          <el-checkbox label="二级期刊"></el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">论文学科门类：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="paper_category">
          <el-radio :label="1">自然科学类</el-radio>
          <el-radio :label="2">人文社科类</el-radio>
        </el-radio-group>
      </el-col>
    <el-col :span="3" :offset="4">期刊等级：</el-col>
      <el-col :span="7">
        <el-select v-model="paper_grade" placeholder="请选择">
        <el-option
          v-for="item in paperGrades"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
        </el-option>
      </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">所属单位：</el-col>
      <el-col :span="7">
        <el-select v-model="paper_company" placeholder="请选择">
        <el-option
          v-for="item in paperCompanys"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="3" :offset="4">一级学科：</el-col>
      <el-col :span="7">
        <el-select v-model="paper_a" placeholder="请选择">
        <el-option
          v-for="item in subjects"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
        </el-option>
      </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">项目来源：</el-col>
      <el-col :span="7">
        <el-select v-model="project_source" placeholder="请选择">
        <el-option
          v-for="item in sources"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="3" :offset="4">发表范围：</el-col>
      <el-col :span="7">
        <el-select v-model="publication_scope" placeholder="请选择">
        <el-option
          v-for="item in scopes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
        </el-option>
      </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">卷号：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="paper_volume" clearable></el-input>
      </el-col>
      <el-col :span="3" :offset="4">期号：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="paper_issue" clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">页码范围：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="paper_page" clearable></el-input>
      </el-col>
      <el-col :span="3" :offset="4">字数：</el-col>
      <el-col :span="4">
        <el-input placeholder="请输入内容" v-model="paper_word" clearable></el-input>
      </el-col>
      <el-col :span="3"><span>万字</span></el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">学校署名：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="paper_school">
          <el-radio :label="1">第一单位</el-radio>
          <el-radio :label="2">单选按钮</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="3" :offset="4">版面：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="pape">
          <el-radio :label="1">正刊</el-radio>
          <el-radio :label="2">增刊</el-radio>
          <el-radio :label="3">年刊</el-radio>
          <el-radio :label="4">专刊</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">是否为译文：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="paper_translation">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="3" :offset="4">ISSN号：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="paper_issn" clearable></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <el-col>CN号：</el-col>
        <el-col>是否与地方联合发表：</el-col>
        <el-col>是否与企业联合发表：</el-col>
        <el-col>是否被高引用：</el-col>
        <el-col>自然科学研究类别：</el-col>
      </el-col>
      <el-col :span="7">
        <el-col >
          <el-input placeholder="请输入内容" v-model="paper_cn" clearable></el-input>
        </el-col>
        <el-col>
          <el-radio-group v-model="paper_local">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-col>
        <el-col>
          <el-radio-group v-model="paper_enterprise">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-col>
        <el-col>
          <el-radio-group v-model="paper_high">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-col>
        <el-col>
          <el-radio-group v-model="science">
            <el-radio :label="1">自然科学</el-radio>
            <el-radio :label="2">工程与技术</el-radio>
            <el-radio :label="3">医药科学</el-radio>
            <el-radio :label="4">农业科学</el-radio>
          </el-radio-group>
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
    <el-row type="flex" >
      
    </el-row>
    <el-row>
      <el-col :span="12" :offset="12">
        <el-button type="primary" @click="submit()">提交</el-button>
       
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Axios from 'axios';
  export default {
    data () {
      
      return {
        paper_type: 0,
        first_auth_type:0,
        paper_category:0,
        paper_translation:0,
        paper_local:0,
        paper_enterprise:0,
        science:0,
        paper_high:0,
        paper_grade:'',
        paper_cn:'',
        paper_issn:'',
        pape:'',
        paper_school:'',
        paper_word:'',
        paper_page:'',
        paper_issue:'',
        paper_volume:'',
        publication_scope:'',
        first_author:'',
        project_source:'',
        paper_a:'',
        paper_title: '',
        correspondence_author:'',
        time:'',
        publication:'',
        paper_company:'',
        publication_type: [],//刊物类型
        paperGrades:[],//期刊等级
        paperCompanys:[],//所属单位
        subjects:[],//一级学科
        sources:[],//项目来源
        scopes:[],//发表范围
      };
    },
    methods: {
      submit(){
        let data={
          paper_type:this.paper_type+'',
          first_author_type:this.first_auth_type,
          paper_category:this.paper_category,
          paper_translation:this.paper_translation,
          paper_local:this.paper_local,
          paper_enterprise:this.paper_enterprise,
          science:this.science,
          paper_high:this.paper_high,
          paper_grade:this.paper_grade,
          paper_cn:this.paper_cn,
          paper_issn:this.paper_issn,
          pape:this.pape,
          publication_type:this.publication_type,
          paper_school:this.paper_school,
          paper_word:this.paper_word,
          paper_page:this.paper_page,
          paper_issue:this.paper_issue,
          paper_volume:this.paper_volume,
          publication_scope:this.publication_scope,
          first_author:this.first_author,
          project_source:this.project_source,
          paper_a:this.paper_a,
          paper_title:this.paper_title,
          correspondence_author:this.correspondence_author,
          time:Date.parse(this.time),
          publication:this.publication,
          paper_company:this.paper_company,
        }
        this.postRequest("/test/data",data).then(res=>{
          if(res.data.msg=="success"){
            this.$message({message: '提交成功',type: 'success'});
          }
        });
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
