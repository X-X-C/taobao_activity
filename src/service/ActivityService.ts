import TopService from "../../base/service/TopService";
import App from "../../base/App";
import XActivityService from "../../base/service/XActivityService";

export default class ActivityService extends XActivityService {
    constructor(app: App) {
        super(app);
    }

    private topService = this.getService(TopService)

    async grant() {
        let prizes = [];
        let stock = await this.app.db("activityInfo").find({
            activityId: this.activityId
        });
        stock = stock[0]?.stock || {};
        Object.keys(stock).map(item => {
            prizes.push(
                {
                    count: stock[item],
                    _id: item
                }
            );
        });
        return prizes;
    }

    async bindItemToApp(appId, itemId) {
        try {
            let r = await this.topService.taobaoOpentradeSpecialItemsBind({
                appCID: appId,
                itemId: itemId
            })
            if (r.code !== 1) {
                this.response.success = false;
                this.response.message = r.data?.results?.item_bind_result[0]?.error_message || "绑定失败";
            }
        } catch (e) {
            throw {
                message: e.sub_msg || "绑定失败",
                ...e,
            }
        }
    }

    async getBindItemInfo(appId) {
        let ids: any = await this.topService.taobaoOpentradeSpecialItemsQuery({
            appCID: appId
        });
        let items = [];
        if (ids.data.items.number) {
            ids = ids.data.items.number;
            while (ids.length > 0) {
                let result = await this.topService.taobaoItemsSellerListGet({
                    numIids: ids.splice(0, 20).join(",")
                })
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
