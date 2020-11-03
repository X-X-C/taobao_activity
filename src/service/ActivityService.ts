import TopService from "../../base/service/TopService";
import App from "../../base/App";
import BaseActivityService from "../../base/service/ActivityService";

/**
 *
 * @param code
 * -1-->没有此活动
 * 0-->活动未开始
 * 1-->活动进行中
 * 2-->活动已结束
 * @param data 活动数据
 */
type activityData = {
    code: number,
    data: any
}

export default class ActivityService extends BaseActivityService {
    constructor(app: App) {
        super(app);
    }

    private topService = this.getService(TopService)

    async grant() {
        let prizes = [];
        let activity = await this.getActivity();
        if (activity.code !== -1) {
            activity = activity.data;
            Object.keys(activity.data.grantTotal).map(item => {
                prizes.push(
                    {
                        count: activity.data.grantTotal[item],
                        _id: item
                    }
                );
            });
        }
        return prizes;
    }

    async bindItemToApp(appId, itemId) {
        let rs = await this.topService.taobaoOpentradeSpecialItemsBind(appId, itemId)
        if (rs.code === 0) {
            throw rs;
        }
    }

    async getBindItemInfo(appId) {
        let ids = await this.topService.taobaoOpentradeSpecialItemsQuery(appId);
        let items = [];
        if (ids.data.items.number) {
            for (const id of ids.data.items.number) {
                let result = await this.topService.taobaoItemSellerGet(id);
                let item = result.data.item;
                items.push(
                    {
                        nick: item.nick,
                        detail_url: item.detail_url,
                        price: item.price,
                        item_imgs: item.item_imgs,
                        num_iid: item.num_iid,
                        pic_url: item.pic_url,
                        title: item.title,
                        type: item.type,
                        approve_status: item.approve_status
                    }
                );
            }
        }
        return items;
    }

    async copy() {
        let target: any = await this.getActivity();
        target = target.data;
        delete target._id;
        for (let configKey in target.config) {

        }
    }
}