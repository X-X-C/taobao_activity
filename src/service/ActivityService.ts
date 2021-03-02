import TopService from "../../base/service/TopService";
import App from "../../base/App";
import BaseActivityService from "../../base/service/BaseActivityService";

export default class ActivityService extends BaseActivityService {
    constructor(app: App) {
        super(app);
    }

    private topService = this.getService(TopService)

    async grant() {
        let prizes = [];
        let activity = this.globalActivity;
        if (activity.code !== -1) {
            Object.keys(activity.data.data.grantTotal).map(item => {
                prizes.push(
                    {
                        count: activity.data.data.grantTotal[item],
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
        let ids: any = await this.topService.taobaoOpentradeSpecialItemsQuery(appId);
        let items = [];
        if (ids.data.items.number) {
            ids = ids.data.items.number;
            while (ids.length > 0) {
                let result = await this.topService.taobaoItemsSellerListGet(ids.splice(0, 20).join(","))
                if (result.code !== 0) {
                    items.push(
                        ...result.data.items.item
                    );
                }
            }
        }
        return items;
    }
}
