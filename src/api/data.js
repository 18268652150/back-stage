import axios from './axios'

// export const getMenu = () => {  /admin/user/allList
//   return axios.request({
//     url: 'menu',getPersonGateList    /admin/visit-config/add
//     method: 'get'
//   })/admin/entrance/gate-person/list
// }/admin/entrance/company/list  /admin/visit-config/list /admin/dept/all_list /admin/user/allList


export const getProcessInfo = (params) => {
  return axios.request({
    url: '/admin/audit-process/info',
    method: 'get',
    params
  })
} 

export const putProcessAdd = (data) => {
  return axios.request({
    url: '/admin/audit-process/edit',
    method: 'put',
    data
  })
} 




export const postProcessAdd = (data) => {
  return axios.request({
    url: '/admin/audit-process/add',
    method: 'post',
    data
  })
} 


export const getTreeDeptUserList = (params) => {
  return axios.request({
    url: '/admin/user/tree-with-dept',
    method: 'get',
    params
  })
} 

export const getAuditList = (params) => {
  return axios.request({
    url: '/admin/audit-process/list',
    method: 'get',
    params
  })
} 



export const postVisitEdit = (data) => {
  return axios.request({
    url: '/admin/visit-config/edit',
    method: 'put',
    data
  })
} 



export const postVisitAdd = (data) => {
  return axios.request({
    url: '/admin/visit-config/add',
    method: 'post',
    data
  })
} 
// 个人用户信息
export const getAllUserList = (params) => {
  return axios.request({
    url: '/admin/user/allList',
    method: 'get',
    params  })
}


export const getAllDeptList = (params) => {
  return axios.request({
    url: '/admin/dept/all_list',
    method: 'get',
    params  })
}


export const getVisitList = (params) => {
  return axios.request({
    url: '/admin/visit-config/list',
    method: 'get',
    params  })
}


export const getPersonGateList = (params) => {
  return axios.request({
    url: '/admin/entrance/gate-person/list',
    method: 'get',
    params  })
}


export const getDeptGateList = (params) => {
  return axios.request({
    url: '/admin/entrance/gate-dept/list',
    method: 'get',
    params  })
}


export const postCompanyEntranceChoice = (data) => {
  return axios.request({
    url: '/admin/entrance/company/choice',
    method: 'post',
    data
  })
}

export const getCompanyEntranceList = (params) => {
  return axios.request({
    url: '/admin/entrance/company/list',
    method: 'get',
    params
  })
}

export const getTree = (params) => {
  return axios.request({
    url: '/admin/entrance/region/list',
    method: 'get',
    params
  })
}



// 全部公司列表
export const postCompanyAllList = (data) => {
  return axios.request({
    url: '/admin/company/all_list',
    method: 'post',
    data
  })
}

export const getFirm = (params) => {
  return axios.request({
    url: '/admin/company/list',
    method: 'get',
    params
  })
}




export const getHome = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}

export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}

export const getMenu = (params) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: params
  })
}