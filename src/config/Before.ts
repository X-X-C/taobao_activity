import {XBefore} from "../../base/App";
import App from "../../App";

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
}
