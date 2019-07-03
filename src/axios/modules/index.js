/* eslint-disable no-tabs */
import request from '../request'

// 登陆接口
// {
// 	mobile: '15121150616',
// 	password: '123456',
// 	validateCode: '8888'
// }
export function login (data) {
  return request({
    url: `http://http://chargers.vicp.io:18080/charger-mes/sign-in`,
    method: 'post',
    params: data
  })
}
// 图形验证码
export function validateCode (code) {
  return request({
    url: `http://http://chargers.vicp.io:18080/charger-mes/sign-in/${code}`,
    method: 'get',
    params: code
  })
}
// 1.2.获取部门列表
// {
// 	"deptName":"",
// 	"pid":"",
// 	"viewerUid":"",
// 	"leaderUid":"",
// 	"sort":"ASC"
// }
export function deptList (data) {
  return request({
    url: `http://chargers.vicp.io:18080/charger-mes/sign-in/department/show-list`,
    method: 'get',
    params: data
  })
}
