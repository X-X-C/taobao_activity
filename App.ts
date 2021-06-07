import {XApp, XBefore} from "./base/App";

export default class App extends XApp {
    constructor(context, apiName) {
        super(context, apiName);
        this.before = new Before(this);
        this.globalNeedParams = {
            activityId: "string"
        }
    }

    before: Before;
    globalAppConfig;
}

export class Before extends XBefore {
    appConfig() {
        this.addBefore = async (app: App) => {
            let appConfig = await app.db("appConfig").find();
            appConfig = appConfig[0];
            if (appConfig) {
                app.globalAppConfig = appConfig[0] || {};
            } else {
                app.status = 0;
                app.response.set222("还未配置appConfig!");
            }
        }
    }

    // test() {
    //     this.addBefore = async (app: App) => {
    //         //...
    //     }
    // }
}
