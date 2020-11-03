// @ts-ignore
import * as gmtaobao from "gmtaobao"
import ActivityService from "./src/service/ActivityService";
import App from "./base/App";

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
// @ts-ignore
exports.qrimage = async (context) => {
    return gmtaobao.utils.qrimage(context);
};

//编辑活动
// @ts-ignore
exports.edit = async (context) => {
    return await gmtaobao.activity.edit(context);
};
//活动列表
// @ts-ignore
exports.list = async (context) => {
    let result = await gmtaobao.activity.list(context)
    result.data.appConfig = appConfig;
    return result;
};
//活动获取
// @ts-ignore
exports.details = async (context) => {
    let result = await gmtaobao.activity.details(context)
    result.data.appConfig = appConfig;
    return result;
};
//复制活动
// @ts-ignore
exports.copy = async (context) => {
    let result = await gmtaobao.activity.copy(context)
    return result;
};
//权益查询
// @ts-ignore
exports.queryBenefit = async (context) => {
    let result = await gmtaobao.top.queryBenefit(context)
    return result;
};
// @ts-ignore
exports.grant = async (context) => {
    const app = new App(context, "grant");
    return await app.run(async function () {
        let activityService = new ActivityService(app);
        let prizes = await activityService.grant();
        return {prizes};
    });
}
// @ts-ignore
exports.bindItemToApp = async (context) => {
    const app = new App(context, "bindItemToApp");
    return await app.run(async function () {
        let activityService = new ActivityService(app);
        await activityService.bindItemToApp(appConfig.C.appId, this.itemId);
    });
}
// @ts-ignore
exports.getBindItemInfo = async (context) => {
    const app = new App(context, "getBindItemInfo");
    return await app.run(async function () {
        let activityService = new ActivityService(app);
        let items = await activityService.getBindItemInfo(appConfig.C.appId);
        return {items};
    });
}