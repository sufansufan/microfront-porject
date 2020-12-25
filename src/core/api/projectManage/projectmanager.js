import request from '../config/axios'
const baseUrl = '/projectmanager'

// 组件项目部-list
export const getProjectDeptList = (data) => (
  request({
    url: baseUrl + '/project/pageList',
    method: 'post',
    data
  })
)

// 组件项目部-list
export const getProjectDeptNopage = (params) => (
  request({
    url: baseUrl + '/project/list',
    method: 'get',
    params
  })
)

// 组建项目部-创建项目部
export const createProjectDept = (id) => (
  request({
    url: baseUrl + '/project/save/' + id,
    method: 'post'
  })
)

// 组建项目部-项目部成员-不分页
export const getProjectmember = (id) => (
  request({
    url: baseUrl + '/projectmember/list/' + id,
    method: 'post'
  })
)

// 组建项目部-获取项目部信息
export const getProjectInfo = (id) => (
  request({
    url: baseUrl + '/project/get/' + id,
    method: 'get'
  })
)

// 组建项目部-保存
export const updateProjectInfo = (data) => (
  request({
    url: baseUrl + '/project/update',
    method: 'put',
    data
  })
)

// 组建项目部-成员任命
export const memberAppoint = (data) => (
  request({
    url: baseUrl + '/projectmember/save',
    method: 'post',
    data
  })
)

// 组建项目部-修改成员任命
export const updateMemberAppoint = (data) => (
  request({
    url: baseUrl + '/projectmember/update',
    method: 'put',
    data
  })
)

// 组建项目部-成员任命清空
export const emptyMember = (id) => (
  request({
    url: baseUrl + '/projectmember/clear/' + id,
    method: 'get'
  })
)

// 组建项目部-发布通知
export const releaseNotice = () => (
  request({
    url: baseUrl + '/projectmember/notice',
    method: 'get'
  })
)

// 组建项目部-退出项目
export const quitproject = (data) => (
  request({
    url: baseUrl + '/projectmember/quitproject',
    method: 'post',
    data
  })
)

// 组建项目部-合同归属-组织分类
export const projectOrgType = (data) => (
  request({
    url: baseUrl + '/project/orgType',
    method: 'get'
  })
)
// 工人实名制-所属公司
export const getmyCooperatunits = (id) => (
  request({
    url: baseUrl + '/constructionteam/myCooperatunits/' + id,
    method: 'get'
  })
)
// 工人实名制- 项目部分页
export const getRealNameList = (data) => (
  request({
    url: baseUrl + '/construction/pageList',
    method: 'post',
    data
  })
)
// 工人实名制-组建施工队-生成施工队/施工班组编号
export const getGenerateCode = (data) => (
  request({
    url: baseUrl + '/constructionteam/generateCode',
    method: 'get',
    params: data
  })
)
// 工人实名制-组建施工队-施工队/施工班组不分页
export const getTeamoGroupList = (data) => (
  request({
    url: baseUrl + '/constructionteam/list',
    method: 'post',
    data
  })
)
// 工人实名制-组建施工队-查询施工队/施工班组树形集合
export const getTeamoGroupTree = (data) => (
  request({
    url: baseUrl + '/constructionteam/tree',
    method: 'get',
    params: data
  })
)
// 工人实名制-施工人员不分页查询
export const getPersonList = (data) => (
  request({
    url: baseUrl + '/constructionmember/list',
    method: 'get',
    params: data
  })
)

// 工人实名制-组建施工队-添加施工队/施工班组
export const addTeamoGroup = (data) => (
  request({
    url: baseUrl + '/constructionteam',
    method: 'post',
    data
  })
)
// 工人实名制-组建施工队-获取施工队/施工班组
export const getTeamoGroup = (id) => (
  request({
    url: baseUrl + '/constructionteam/' + id,
    method: 'get'
  })
)
// 工人实名制-组建施工队-修改施工队/施工班组
export const editTeamoGroup = (data, id) => (
  request({
    url: baseUrl + '/constructionteam/' + id,
    method: 'put',
    data
  })
)
// 工人实名制-组建施工队-删除施工队/施工班组
export const deleteTeamoGroup = (id) => (
  request({
    url: baseUrl + '/constructionteam/' + id,
    method: 'delete'
  })
)

// 验证施工队施工班组字段是否唯一
export const validateUnique = (data) => (
  request({
    url: baseUrl + '/constructionteam/validateUnique',
    method: 'post',
    data
  })
)
// 工人实名制-组建施工队-导出施工队/施工班组花名册
export const exportTeamorGroup = (data) => (
  request({
    url: baseUrl + '/constructionteam/export',
    method: 'post',
    data
  })
)
// 工人实名制-持证信息不分页
export const getCertificateList = (data) => (
  request({
    url: baseUrl + '/certificate/list',
    method: 'get',
    params: data
  })
)
// 工人实名制-添加持证信息
export const addCertificate = (data) => (
  request({
    url: baseUrl + '/certificate',
    method: 'post',
    data
  })
)
// 工人实名制-持证信息删除
export const deleteCertificate = (id) => (
  request({
    url: baseUrl + '/certificate/' + id,
    method: 'delete'
  })
)

// 工人实名制-保存施工队长/施工班组长信息
export const saveTeamLeader = (data) => (
  request({
    url: baseUrl + '/constructionmember/saveTeamLeader',
    method: 'post',
    data
  })
)
// 工人实名制-获取施工队长/施工班组长信息
export const getTeamLeader = (id) => (
  request({
    url: baseUrl + '/constructionmember/' + id,
    method: 'get'
  })
)
// 工人实名制-更新施工队长/施工班组长信息
export const updateTeamLeader = (data) => (
  request({
    url: baseUrl + '/constructionmember/updateTeamLeader',
    method: 'post',
    data
  })
)
// 工人实名制-加入申请分页查询
export const getapplyPage = (data) => (
  request({
    url: baseUrl + '/constructionmember/apply/page',
    method: 'get',
    params: data
  })
)
// 工人实名制-查询返场确认分页列表
export const getreturnPage = (data) => (
  request({
    url: baseUrl + '/entryrecord/return/page',
    method: 'get',
    params: data
  })
)
// 工人实名制-拒绝返场
export const refuseReturn = (id) => (
  request({
    url: baseUrl + '/entryrecord/return/reject/' + id,
    method: 'put'
  })
)
// 工人实名制-同意返场
export const agreeReturn = (id) => (
  request({
    url: baseUrl + '/entryrecord/return/agree/' + id,
    method: 'put'
  })
)
// 工人实名制-删除返场确认记录
export const deleteReturn = (id) => (
  request({
    url: baseUrl + '/entryrecord/return/' + id,
    method: 'delete'
  })
)
// 工人实名制-根据身份证查询施工人员信息
export const findByIdNumber = (id) => (
  request({
    url: baseUrl + '/constructionmember/findByIdNumber/' + id,
    method: 'get'
  })
)
// 工人实名制-加入申请分页查询
export const applyPage = (data) => (
  request({
    url: baseUrl + '/constructionmember/apply/page',
    method: 'get',
    params: data
  })
)
// 工人实名制-提交加入申请记录
export const applySubmit = (data) => (
  request({
    url: baseUrl + '/constructionmember/apply/submit',
    method: 'put',
    data
  })
)
// 工人实名制-退回加入申请记录
export const applyGoback = (id) => (
  request({
    url: baseUrl + '/constructionmember/apply/goback/' + id,
    method: 'put'
  })
)
// 工人实名制-施工人员统计
export const statistics = (data) => (
  request({
    url: baseUrl + '/constructionmember/statistics',
    method: 'get',
    params: data
  })
)

// 工人实名制-施工人员分页查询
export const getPersonPage = (data) => (
  request({
    url: baseUrl + '/constructionmember/page',
    method: 'get',
    params: data
  })
)
// 工人实名制-添加施工人员
export const addBuildPerson = (data) => (
  request({
    url: baseUrl + '/constructionmember',
    method: 'post',
    data
  })
)

// 工人实名制-获取施工人员统计数目
export const getConstructionMemberCount = (projectId) => (
  request({
    url: baseUrl + '/constructionmember/getConstructionMemberCount/' + projectId,
    method: 'get'
  })
)
// 工人实名制-提交人员返场确认信息
export const backConfirm = (data) => (
  request({
    url: baseUrl + '/constructionmember/backConfirm',
    method: 'put',
    data
  })
)

// 工人实名制-验证加入申请记录
export const applyVerification = (id) => (
  request({
    url: baseUrl + '/constructionmember/apply/verification/' + id,
    method: 'put'
  })
)

// 工人实名制-更新资料
export const updateInfo = (data) => (
  request({
    url: baseUrl + '/constructionmember/updateInfo',
    method: 'put',
    data
  })
)
// 工人实名制-任命下拉框查询(传入施工队/施工班组Id)
export const selectAppointment = (constructionTeamId) => (
  request({
    url: baseUrl + '/constructionmember/selectAppointment/' + constructionTeamId,
    method: 'get'
  })
)
// 工人实名制-验证施工人员字段是否唯一
export const perValidateUnique = (data) => (
  request({
    url: baseUrl + '/constructionmember/validateUnique',
    method: 'post',
    data
  })
)
// 工人实名制-保存人员离场或返场信息
export const leaveAndBack = (data) => (
  request({
    url: baseUrl + '/constructionmember/leaveAndBack',
    method: 'put',
    data
  })
)
// 工人实名制-下载体检报告
export const downMedicalReport = (data) => (
  request({
    url: baseUrl + '/constructionmember/downMedicalReport',
    method: 'post',
    responseType: 'arraybuffer',
    data
  })
)
/* 进场管理 */
// 进场管理主页面
export const approachListPage = (data) => (
  request({
    url: baseUrl + '/approachcontrolProject/projectList',
    method: 'post',
    data
  })
)

export const approachOrgType = () => (
  request({
    url: baseUrl + '/approachcontrolProject/orgType',
    method: 'get'
  })
)

// 获取工程名称不分页
export const approachAllList = (data) => (
  request({
    url: baseUrl + '/approachcontrolProject/projectAllList',
    method: 'post',
    data
  })
)

/* 安全协议 */
// 获取列表
export const safeAgreeListPage = (data) => (
  request({
    url: baseUrl + '/securitycontract/page',
    method: 'post',
    data
  })
)

// 工人实名制-施工人员获取详情
export const getBuildPerson = (id) => (
  request({
    url: baseUrl + '/constructionmember/' + id,
    method: 'get'
  })
)
// 工人实名制-施工人员修改
export const editBuildPerson = (data, id) => (
  request({
    url: baseUrl + '/constructionmember/' + id,
    method: 'put',
    data

  })
)
// 工人实名制-施工人员删除
export const deleteBuildPerson = (id) => (
  request({
    url: baseUrl + '/constructionmember/' + id,
    method: 'delete'
  })
)
// 工人实名制-进出场记录不分页
export const getInoroutList = (data) => (
  request({
    url: baseUrl + '/entryrecord/list',
    method: 'get',
    params: data
  })
)
// 安全协议下载
export const safeAgreeLoad = (data) => (
  request({
    url: baseUrl + '/securitycontract/download',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
)

// 安全协议上传
export const safeAgreeAdd = (data) => (
  request({
    url: baseUrl + '/securitycontract/save',
    method: 'post',
    data
  })
)

// 安全协议上传
export const safeAgreeUpdate = (data) => (
  request({
    url: baseUrl + '/securitycontract/update',
    method: 'put',
    data
  })
)

// 安全协议上传
export const safeAgreeDalete = (id) => (
  request({
    url: baseUrl + '/securitycontract/' + id,
    method: 'delete'
  })
)

/* 三级安全教育 */
// 安全教育列表
export const safeEducationList = (data) => (
  request({
    url: baseUrl + '/securityeducation/page',
    method: 'post',
    data
  })
)

// 安全教育添加
export const safeEducationAdd = (data) => (
  request({
    url: baseUrl + '/securityeducation/save',
    method: 'post',
    data
  })
)

// 安全教育修改
export const safeEducationEdit = (data) => (
  request({
    url: baseUrl + '/securityeducation/update',
    method: 'put',
    data
  })
)

// 安全教育获取详情
export const safeEducationDetails = (id) => (
  request({
    url: baseUrl + '/securityeducation/' + id,
    method: 'get'
  })
)

// 安全教育获取删除
export const safeEducationDelete = (id) => (
  request({
    url: baseUrl + '/securityeducation/' + id,
    method: 'delete'
  })
)

// 安全教育-下载
export const safeEducationDownload = (data) => (
  request({
    url: baseUrl + '/securityeducation/download',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
)

// 安全教育编号唯一
export const validateSafeEducationUnique = (data) => (
  request({
    url: baseUrl + '/securityeducation/validateUnique',
    method: 'post',
    data
  })
)

// 安全教育-施工人员或者左树
export const safeBuildPersonTree = (id) => (
  request({
    url: baseUrl + '/approachcontrol/getTree/' + id,
    method: 'post'
  })
)

// 安全教育-施工人员列表
export const buildPersonTableList = (data) => (
  request({
    url: baseUrl + '/approachcontrol/page',
    method: 'post',
    data
  })
)

// 安全教育-施工人员列表-录入信息
export const buildPersonAdd = (data) => (
  request({
    url: baseUrl + '/approachcontrol/save',
    method: 'post',
    data
  })
)

// 安全教育-施工人员列表-录入信息-修改
export const buildPersonUpdate = (data) => (
  request({
    url: baseUrl + '/approachcontrol/update',
    method: 'put',
    data
  })
)

// 安全教育-施工人员列表-确认进场
export const configApproach = (data) => (
  request({
    url: baseUrl + '/approachcontrol/approach',
    method: 'put',
    data
  })
)

// 安全教育-施工人员列表-下载
export const buildPersonDownload = (data) => (
  request({
    url: baseUrl + '/approachcontrol/download',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
)

// 安全教育-施工人员列表-导出花名册
export const buildPersonMember = (data) => (
  request({
    url: baseUrl + '/approachcontrol/exportMember',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
)

// 安全教育-施工人员列表-导出安全教育等级表
export const buildPersonEducation = (data) => (
  request({
    url: baseUrl + '/approachcontrol/exportSecurityEducation',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
)

// 安全教育-施工人员列表-导出安全教育等级表
export const buildPersonWorkType = (data) => (
  request({
    url: baseUrl + '/approachcontrol/exportSpecialWorkType',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
)

/* 安全技术交底 */
// 获取list
export const discloseList = (data) => (
  request({
    url: baseUrl + '/securitytechnology/page',
    method: 'post',
    data
  })
)

// 安全技术交底新增
export const discloseAdd = (data) => (
  request({
    url: baseUrl + '/securitytechnology/save',
    method: 'post',
    data
  })
)

// 安全技术交底获取详情
export const discloseDetails = (id) => (
  request({
    url: baseUrl + '/securitytechnology/getById/' + id,
    method: 'get'
  })
)

// 安全技术交底修改
export const discloseUpdate = (data) => (
  request({
    url: baseUrl + '/securitytechnology/update',
    method: 'put',
    data
  })
)

// 安全技术交底删除
export const discloseDelete = (id) => (
  request({
    url: baseUrl + '/securitytechnology/' + id,
    method: 'delete'
  })
)

// 安全技术交底下载
export const discloseDownload = (data) => (
  request({
    url: baseUrl + '/securitytechnology/download',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
)

// 安全技术交底导出
export const discloseExplore = (data) => (
  request({
    url: baseUrl + '/securitytechnology/explore',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
)

// 安全技术交底-获取交底人
export const disclosePerson = (id) => (
  request({
    url: baseUrl + '/projectmember/list/' + id,
    method: 'post'
  })
)

// 安全技术交底编号唯一
export const validateDiscloseUnique = (data) => (
  request({
    url: baseUrl + '/securitytechnology/validateUnique',
    method: 'post',
    data
  })
)
