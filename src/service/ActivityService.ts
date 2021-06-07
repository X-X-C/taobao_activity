import TopService from "../../base/service/TopService";
import XActivityService from "../../base/service/XActivityService";
import {before, exp} from "../../base/utils/Annotation";
import App, {Before} from "../../App";

export default class ActivityService extends XActivityService {
    constructor(app: App) {
        super(app);
    }

    app: App;

    private topService = this.getService(TopService)

    @before(Before.prototype.globalActivityInfo)
    @exp()
    async grant() {
        let prizes = [];
        let stock = this.globalActivity.activityInfo;
        Object.keys(stock).map(item => {
            prizes.push(
                {
                    count: stock[item],
                    _id: item
                }
            );
        });
        this.response.data = {prizes};
    }

    @before(Before.prototype.appConfig)
    @exp()
    async bindItemToApp() {
        try {
            let r = await this.topService.taobaoOpentradeSpecialItemsBind({
                appCID: this.app.globalAppConfig.appConfig.C.appId,
                itemId: this.data.itemId
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

    @before(Before.prototype.appConfig)
    @exp()
    async getBindItemInfo() {
        let ids: any = await this.topService.taobaoOpentradeSpecialItemsQuery({
            appCID: this.app.globalAppConfig.appConfig.C.appId
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
        this.response.data = {items};
    }
}
