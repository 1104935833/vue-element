import request from '@/utils/request'

export function getHoner(data) {
  return request({
    url: '/getHoner',
    method: 'get',
    params: data
  })
}

export function getOption(data) {
  return request({
    url: '/common/getOption',
    method: 'get',
    params: data
  })
}

export function getUserRole() {
  return request({
    url: '/common/getUserRole',
    method: 'get'
  })
}

export function getFileNameById(data) {
  return request({
    url: '/common/getFileNameById',
    method: 'get',
    params: data
  })
}

export function check(data) {
  return request({
    url: '/check',
    method: 'get',
    params: data
  })
}

export function updataHoner(data) {
  return request({
    url: '/updataHoner',
    method: 'post',
    data
  })
}

export function insertHoner(data) {
  return request({
    url: '/insertHoner',
    method: 'post',
    data
  })
}

export function delFile(data) {
  return request({
    url: '/common/delFile',
    method: 'get',
    params: data
  })
}

export function getPatent(data) {
  return request({
    url: '/getPatent',
    method: 'get',
    params: data
  })
}

export function updataPatent(data) {
  return request({
    url: '/updataPatent',
    method: 'post',
    data
  })
}

export function insertPatent(data) {
  return request({
    url: '/insertPatent',
    method: 'post',
    data
  })
}

//
export function getAcademic(data) {
  return request({
    url: '/getAcademic',
    method: 'get',
    params: data
  })
}

export function updataAcademic(data) {
  return request({
    url: '/updataAcademic',
    method: 'post',
    data
  })
}

export function insertAcademic(data) {
  return request({
    url: '/insertAcademic',
    method: 'post',
    data
  })
}
//
export function getFirstSubject(data) {
  return request({
    url: '/getFirstSubject',
    method: 'get',
    params: data
  })
}

export function updataFirstSubject(data) {
  return request({
    url: '/updataFirstSubject',
    method: 'post',
    data
  })
}

export function insertFirstSubject(data) {
  return request({
    url: '/insertFirstSubject',
    method: 'post',
    data
  })
}

//
export function getLab(data) {
  return request({
    url: '/getLab',
    method: 'get',
    params: data
  })
}

export function updataLab(data) {
  return request({
    url: '/updataLab',
    method: 'post',
    data
  })
}

export function insertLab(data) {
  return request({
    url: '/insertLab',
    method: 'post',
    data
  })
}

//
export function getMonographs(data) {
  return request({
    url: '/getMonographs',
    method: 'get',
    params: data
  })
}

export function updataMonographs(data) {
  return request({
    url: '/updataMonographs',
    method: 'post',
    data
  })
}

export function insertMonographs(data) {
  return request({
    url: '/insertMonographs',
    method: 'post',
    data
  })
}

//
export function getPaper(data) {
  return request({
    url: '/getPaper',
    method: 'get',
    params: data
  })
}

export function updataPaper(data) {
  return request({
    url: '/updataPaper',
    method: 'post',
    data
  })
}

export function insertPaper(data) {
  return request({
    url: '/insertPaper',
    method: 'post',
    data
  })
}

//
export function getPortrait(data) {
  return request({
    url: '/getPortrait',
    method: 'get',
    params: data
  })
}

export function updataPortrait(data) {
  return request({
    url: '/updataPortrait',
    method: 'post',
    data
  })
}

export function insertPortrait(data) {
  return request({
    url: '/insertPortrait',
    method: 'post',
    data
  })
}

//
export function getProductionUnion(data) {
  return request({
    url: '/getProductionUnion',
    method: 'get',
    params: data
  })
}

export function updataProductionUnion(data) {
  return request({
    url: '/updataProductionUnion',
    method: 'post',
    data
  })
}

export function insertProductionUnion(data) {
  return request({
    url: '/insertProductionUnion',
    method: 'post',
    data
  })
}

//
export function getTechnological(data) {
  return request({
    url: '/getTechnological',
    method: 'get',
    params: data
  })
}

export function updataTechnological(data) {
  return request({
    url: '/updataTechnological',
    method: 'post',
    data
  })
}

export function insertTechnological(data) {
  return request({
    url: '/insertTechnological',
    method: 'post',
    data
  })
}

//
export function getAchievement(data) {
  return request({
    url: '/getAchievement',
    method: 'get',
    params: data
  })
}

export function updataAchievement(data) {
  return request({
    url: '/updataAchievement',
    method: 'post',
    data
  })
}

export function insertAchievement(data) {
  return request({
    url: '/insertAchievement',
    method: 'post',
    data
  })
}

//
export function getCompetition(data) {
  return request({
    url: '/getCompetition',
    method: 'get',
    params: data
  })
}

export function updataCompetition(data) {
  return request({
    url: '/updataCompetition',
    method: 'post',
    data
  })
}

export function insertCompetition(data) {
  return request({
    url: '/insertCompetition',
    method: 'post',
    data
  })
}

//
export function getCourse(data) {
  return request({
    url: '/getCourse',
    method: 'get',
    params: data
  })
}

export function updataCourse(data) {
  return request({
    url: '/updataCourse',
    method: 'post',
    data
  })
}

export function insertCourse(data) {
  return request({
    url: '/insertCourse',
    method: 'post',
    data
  })
}

//
export function getEducational(data) {
  return request({
    url: '/getEducational',
    method: 'get',
    params: data
  })
}

export function updataEducational(data) {
  return request({
    url: '/updataEducational',
    method: 'post',
    data
  })
}

export function insertEducational(data) {
  return request({
    url: '/insertEducational',
    method: 'post',
    data
  })
}

//
export function getProfessional(data) {
  return request({
    url: '/getProfessional',
    method: 'get',
    params: data
  })
}

export function updataProfessional(data) {
  return request({
    url: '/updataProfessional',
    method: 'post',
    data
  })
}

export function insertProfessional(data) {
  return request({
    url: '/insertProfessional',
    method: 'post',
    data
  })
}

//
export function getSkill(data) {
  return request({
    url: '/getSkill',
    method: 'get',
    params: data
  })
}

export function updataSkill(data) {
  return request({
    url: '/updataSkill',
    method: 'post',
    data
  })
}

export function insertSkill(data) {
  return request({
    url: '/insertSkill',
    method: 'post',
    data
  })
}

//
export function getStudentResearch(data) {
  return request({
    url: '/getStudentResearch',
    method: 'get',
    params: data
  })
}

export function updataStudentResearch(data) {
  return request({
    url: '/updataStudentResearch',
    method: 'post',
    data
  })
}

export function insertStudentResearch(data) {
  return request({
    url: '/insertStudentResearch',
    method: 'post',
    data
  })
}

//
export function getTeachingReform(data) {
  return request({
    url: '/getTeachingReform',
    method: 'get',
    params: data
  })
}

export function updataTeachingReform(data) {
  return request({
    url: '/updataTeachingReform',
    method: 'post',
    data
  })
}

export function insertTeachingReform(data) {
  return request({
    url: '/insertTeachingReform',
    method: 'post',
    data
  })
}

//
export function getTextBook(data) {
  return request({
    url: '/getTextBook',
    method: 'get',
    params: data
  })
}

export function updataTextBook(data) {
  return request({
    url: '/updataTextBook',
    method: 'post',
    data
  })
}

export function insertTextBook(data) {
  return request({
    url: '/insertTextBook',
    method: 'post',
    data
  })
}

//
export function getTransverse(data) {
  return request({
    url: '/getTransverse',
    method: 'get',
    params: data
  })
}

export function updataTransverse(data) {
  return request({
    url: '/updataTransverse',
    method: 'post',
    data
  })
}

export function insertTransverse(data) {
  return request({
    url: '/insertTransverse',
    method: 'post',
    data
  })
}