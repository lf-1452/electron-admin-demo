let NODE_ENV = 'development';
let webSocketUrl = 'ws://192.168.14.152:8002/ws/';
let bClientId = 'bonade';
let linkUrl = {
    workReportUrl: 'http://192.168.14.214:8084/workReportPC', //工作汇报
    approvalUrl: 'http://192.168.14.214:8081/com.approval/commission', // 审批
    noticeUrl: 'http://192.168.14.214:8084/pcNotice' //公告
}
let materialUrl = '/template';
let downloadStaffUrl = '';
let api = '';
let getByUrlOrWebScoket = true;
let pubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUoHGYCV0xrvQacKnd81bR5jY5ph50bGa8ixpl6siyfdL8GDStVUaatqFrfaExzg0Gi0i399ZG9xSVn5iIsdrUq4HDQHZXqfmC+Ss3GBTPkYickTUpmnPzod9AMyEDnddVD1vyfuePw1JaeEpqhEtyRs6bra8q4LtVQIdYtBmJdwIDAQAB';
if(process.env.VUE_APP_TITLE != 'development') {
    materialUrl = '/api/template';
    downloadStaffUrl = '/api/';
    api = '/api';
    switch (process.env.VUE_APP_TITLE) {
        case 'production':
            NODE_ENV = 'production';
            webSocketUrl = 'wss://zt.bndxqc.com/reim-im/ws/';
            bClientId = '847ce78478a211e99c7e7cd30ad3a6a8';
            linkUrl.workReportUrl = 'https://zthb.bndxqc.com/workReportPC';
            linkUrl.approvalUrl = 'https://ztqyzx.bndxqc.com/com.approval/commission';
            linkUrl.noticeUrl = 'https://ztfwcs.bndxqc.com/pcNotice';
            pubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXRyojOxs5Z8KBfnb6s+KcpE2bZdj+TPclUyKFNDV8oeXsoV6aUSuCOTBuNUTL31NgpqLNqJqNZU0q91O46xmbhzNbYanSbRqhdx9C/pgAElkXB3C/SoBHAZ/Lm/SyFaZoJoAOkD5p2IsrLLh7yt07MT3qrTr991B+5Je58CIizQIDAQAB';
            break;
        case 'demo':
            NODE_ENV = 'demo';
            webSocketUrl = 'wss://imztdemo.bndxqc.com/reim-im/ws/';
            bClientId = '847ce78478a211e99c7e7cd30ad3a6a8';
            linkUrl.workReportUrl = 'http://hbdemo.bndxqc.com/workReportPC';
            linkUrl.approvalUrl = 'http://qyzxdemo.bndxqc.com/com.approval/commission';
            linkUrl.noticeUrl = 'http://hbdemo.bndxqc.com/pcNotice';
            pubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXRyojOxs5Z8KBfnb6s+KcpE2bZdj+TPclUyKFNDV8oeXsoV6aUSuCOTBuNUTL31NgpqLNqJqNZU0q91O46xmbhzNbYanSbRqhdx9C/pgAElkXB3C/SoBHAZ/Lm/SyFaZoJoAOkD5p2IsrLLh7yt07MT3qrTr991B+5Je58CIizQIDAQAB';
            break;
        case 'experience':
            NODE_ENV = 'experience';
            webSocketUrl = 'wss://ztty.bndxqc.com/reim-im/ws/';
            bClientId = 'a686023f70a711e9b9fd7cd30a5a3208';
            linkUrl.workReportUrl = 'https://zthbty.bndxqc.com/workReportPC';
            linkUrl.approvalUrl = 'https://ztqyzxty.bndxqc.com/com.approval/commission';
            linkUrl.noticeUrl = 'https://ztjcmhty.bndxqc.com/pcNotice';
            pubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXRyojOxs5Z8KBfnb6s+KcpE2bZdj+TPclUyKFNDV8oeXsoV6aUSuCOTBuNUTL31NgpqLNqJqNZU0q91O46xmbhzNbYanSbRqhdx9C/pgAElkXB3C/SoBHAZ/Lm/SyFaZoJoAOkD5p2IsrLLh7yt07MT3qrTr991B+5Je58CIizQIDAQAB';
            break;
        case 'test':
            NODE_ENV = 'test';
            webSocketUrl = 'ws://39.108.83.56/reim-im/ws/';
            bClientId = 'a686023f70a711e9b9fd7cd30a5a3208';
            linkUrl.workReportUrl = 'http://120.78.203.168:8081/workReportPC';
            linkUrl.approvalUrl = 'http://120.79.228.80:8081/com.approval/commission';
            linkUrl.noticeUrl = 'http://120.79.228.80:8080/pcNotice';
            break;
        default:
            NODE_ENV = 'production';
            webSocketUrl = 'wss://zt.bndxqc.com/reim-im/ws/';
            bClientId = '847ce78478a211e99c7e7cd30ad3a6a8';
            linkUrl.workReportUrl = 'https://zthb.bndxqc.com/workReportPC';
            linkUrl.approvalUrl = 'http://ztqyzx.bndxqc.com/commission';
            linkUrl.noticeUrl = 'https://ztfwcs.bndxqc.com/pcNotice';
            pubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXRyojOxs5Z8KBfnb6s+KcpE2bZdj+TPclUyKFNDV8oeXsoV6aUSuCOTBuNUTL31NgpqLNqJqNZU0q91O46xmbhzNbYanSbRqhdx9C/pgAElkXB3C/SoBHAZ/Lm/SyFaZoJoAOkD5p2IsrLLh7yt07MT3qrTr991B+5Je58CIizQIDAQAB';
            break;
    }
}

const nodeObj = {
    NODE_ENV:NODE_ENV, //环境
    webSocketUrl:webSocketUrl,//webSocket路径
    bClientId: bClientId,//获取ticket时要用到的bClientId
    linkUrl:linkUrl,//中台工作汇报路径
    materialUrl:materialUrl, //图片等资源路径代理
    downloadStaffUrl:downloadStaffUrl, //下载等路径代理
    api:api, //打包之后要加的路径代理
    pubKey:pubKey, //登录秘钥
    getByUrlOrWebScoket: getByUrlOrWebScoket, //会话历史从接口还是长连接返回
}

module.exports = nodeObj;
