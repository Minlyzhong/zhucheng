/* ***************************incoming*********************************** */
function findById(params) { //面签页面--根据apid查询已有信息
    return service({
        url: '/admin/mobile/celebrity/celebrity/activity',
        method: 'get',
        params
    })
}

function faceSignSave(params) { //面签页面--保存提交
    return service({
        url: '/api/backend/faceSign/save',
        method: 'post',
        data: JSON.stringify(params)
    })
}



//点击确定
// confirmBtn() {
//     const params = { //总的提交信息
//         id: this.apId, //混合传过来  业务流id
//     }
//     let that = this;
//     faceSignSave(params).then(res => {
//         if (res.code == 0) {
//            //do something
//         } else {
//            //do something
//         }
//     })
// }