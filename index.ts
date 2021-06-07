// @ts-ignore
import * as gmtaobao from "gm-activity"
import {XApp} from "./base/App";
import App from "./App";
import ActivityService from "./src/service/ActivityService";

const appConfig = {
    //B端配置
    B: {
        appId: ""
    },
    //C端配置
    C: {
        appId: "",
        // appDebugurl: "",
        appUrl: ""
    },
    //店铺信息
    sellerData: {
        sellerNick: "",
        sellerId: "",
        memberUrl: "https://market.m.taobao.com/app/sj/shop-membership-center/pages/index?wh_weex=true&sellerId=3626596873&extraInfo=%7B%22source%22%3A%22isvapp%22%2C%22activityId%22%3A%22miniapp%22%2C%22entrance%22%3A%22hudong%22%7D&callbackUrl="
    }
};


export async function qrimage(context) {
    return gmtaobao.utils.qrimage(context);
}

//编辑活动

export async function edit(context) {
    return await gmtaobao.activity.edit(context);
}

//活动列表

export async function list(context) {
    let result = await gmtaobao.activity.list(context)
    result.data.appConfig = appConfig;
    return result;
}

//活动获取

export async function details(context) {
    let result = await gmtaobao.activity.details(context)
    result.data.appConfig = appConfig;
    return result;
}

//复制活动

export async function copy(context) {
    let result = await gmtaobao.activity.copy(context)
    return result;
}


export async function newCopy(context) {
    let result = await gmtaobao.activity.newCopy(context)
    return result;
}

//权益查询

export async function queryBenefit(context) {
    let result = await gmtaobao.top.queryBenefit(context)
    return result;
}


//白名单列表
export async function memberList(context) {
    return await gmtaobao.activity.memberList(context);
}

//白名单详情
export async function memberDetail(context) {
    return await gmtaobao.activity.memberDetail(context);
}

//根据nick查询白名单详情
export async function memberInfo(context) {
    return await gmtaobao.activity.memberInfo(context);
}

//编辑或添加白名单
export async function editMember(context) {
    return await gmtaobao.activity.editMember(context);
}

//删除白名单成员
export async function delMember(context) {
    return await gmtaobao.activity.delMember(context);
}

//日志列表
export async function logList(context) {
    return await gmtaobao.activity.logList(context);
}

//日志详情
export async function logDetail(context) {
    return await gmtaobao.activity.logDetail(context);
}

//获取appConfig
export async function getAppConfig(context) {
    return await gmtaobao.activity.getAppConfig(context);
}

//编辑appConfig
export async function editAppConfig(context) {
    return await gmtaobao.activity.editAppConfig(context);
}


const modules = [ActivityService];
for (let entry of Object.entries(XApp.exports)) {
    // @ts-ignore
    exports[entry[0]] = async (context) => {
        const app = new App(context, entry[0]);
        app.runNeedParams = entry[1].params || {};
        if (!entry[1].needGlobalParam) {
            app.globalNeedParams = {};
        }
        entry[1].before.forEach(v => v.call(app.before))
        return await app.run(async function () {
            await app.getService(entry[1].constructor)[entry[0]]();
        });
    }
}
