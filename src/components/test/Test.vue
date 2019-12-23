<template>
  <div>
    <el-row type="flex" align="middle">
      <el-col :span="3">论文类型：</el-col>
      <el-col :span="21">
        <el-radio-group v-model="paperType">
          <el-radio :label="1">期刊论文</el-radio>
          <el-radio :label="2">论文集</el-radio>
          <el-radio :label="3">学位论文</el-radio>
          <el-radio :label="4">会议论文</el-radio>
          <el-radio :label="5">其他(报刊文章、科普文章、评论等)</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="3">论文标题：</el-col>
      <el-col :span="11">
        <el-input placeholder="请输入内容" v-model="paperTitle" clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">第一作者类型：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="firstAuthorType">
          <el-radio :label="1">本校老师</el-radio>
          <el-radio :label="2">本校学生</el-radio>
          <el-radio :label="3">外校人员</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">第一作者：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="firstAuthor" clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">通讯作者：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="reportAuthor" clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">发表/出版时间：</el-col>
      <el-col :span="7">
        <el-date-picker v-model="publishTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
      <el-col :span="3" :offset="4">发表刊物/论文集：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="Publications" clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">刊物类型：</el-col>
      <el-col :span="10">
        <el-checkbox-group v-model="PublicationType">
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
        <el-radio-group v-model="paperSubType">
          <el-radio :label="1">自然科学类</el-radio>
          <el-radio :label="2">人文社科类</el-radio>
        </el-radio-group>
      </el-col>
    <el-col :span="3" :offset="4">期刊等级：</el-col>
      <el-col :span="7">
        <el-select v-model="PeriodicalLevel" placeholder="请选择">
        <el-option
          v-for="item in Periodicals"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">所属单位：</el-col>
      <el-col :span="7">
        <el-select v-model="company" placeholder="请选择">
        <el-option
          v-for="item in companys"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="3" :offset="4">一级学科：</el-col>
      <el-col :span="7">
        <el-select v-model="firstSubject" placeholder="请选择">
        <el-option
          v-for="item in subjects"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">项目来源：</el-col>
      <el-col :span="7">
        <el-select v-model="projectSource" placeholder="请选择">
        <el-option
          v-for="item in sources"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="3" :offset="4">发表范围：</el-col>
      <el-col :span="7">
        <el-select v-model="publicationScope" placeholder="请选择">
        <el-option
          v-for="item in scopes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">卷号：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="volumeNumber" clearable></el-input>
      </el-col>
      <el-col :span="3" :offset="4">期号：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="issueNumber" clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">页码范围：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="pageRange" clearable></el-input>
      </el-col>
      <el-col :span="3" :offset="4">字数：</el-col>
      <el-col :span="4">
        <el-input placeholder="请输入内容" v-model="wordNumber" clearable></el-input>
      </el-col>
      <el-col :span="3"><span>万字</span></el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">学校署名：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="schoolName">
          <el-radio :label="1">第一单位</el-radio>
          <el-radio :label="2">单选按钮</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="3" :offset="4">版面：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="layout">
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
        <el-radio-group v-model="isTranslation">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="3" :offset="4">ISSN号：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="ISSN" clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">CN号：</el-col>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="CN" clearable></el-input>
      </el-col>
      <el-col :span="3" :offset="4">是否与行业联合发表：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="isindustryAlliance">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">是否与地方联合发表：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="islocalAssociation">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="3" :offset="4">是否与国际联合发表：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="isinterAssociation">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">是否与企业联合发表：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="iscompanyAssociation">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="3" :offset="4">是否与跨学科论文：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="isinterdisciplinaryPapers">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">是否被高引用：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="isQuote">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="3">自然科学研究类别：</el-col>
      <el-col :span="7">
        <el-radio-group v-model="isNaturalScienceType">
          <el-radio :label="1">自然科学</el-radio>
          <el-radio :label="2">工程与技术</el-radio>
          <el-radio :label="3">医药科学</el-radio>
          <el-radio :label="4">农业科学</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="24">
        <el-upload
          class="upload-demo"
          style="width:300px;"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/pdf文件，且不超过500kb</div>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="12">
        <el-button type="primary">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        paperType: 0,
        firstAuthorType:0,
        paperSubType:0,
        isTranslation:0,
        isindustryAlliance:0,
        islocalAssociation:0,
        isinterAssociation:0,
        iscompanyAssociation:0,
        isinterdisciplinaryPapers:0,
        isNaturalScienceType:0,
        isQuote:0,
        PeriodicalLevel:'',
        CN:'',
        ISSN:'',
        layout:'',
        schoolName:'',
        wordNumber:'',
        pageRange:'',
        issueNumber:'',
        volumeNumber:'',
        publicationScope:'',
        firstAuthor:'',
        projectSource:'',
        firstSubject:'',
        paperTitle: '',
        reportAuthor:'',
        publishTime:'',
        Publications:'',
        company:'',
        PublicationType: [],
        Periodicals:[],
        companys:[],
        subjects:[],
        sources:[],
        scopes:[],
        // cities: [{
        //   value: 'Beijing',
        //   label: '北京'
        // }, {
        //   value: 'Shanghai',
        //   label: '上海'
        // }, {
        //   value: 'Nanjing',
        //   label: '南京'
        // }, {
        //   value: 'Chengdu',
        //   label: '成都'
        // }, {
        //   value: 'Shenzhen',
        //   label: '深圳'
        // }, {
        //   value: 'Guangzhou',
        //   label: '广州'
        // }],
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>
<style lang="scss">
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
