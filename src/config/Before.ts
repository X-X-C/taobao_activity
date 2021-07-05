import {XBefore} from "../../base/App";
import App from "../../App";

export class Before extends XBefore {
    appConfig() {
        this.addBefore = async (app: App) => {
            let data: appConfig[] = await app.db("appConfig").find();
            let appConfig = data[0];
            if (appConfig) {
                app.globalAppConfig = appConfig || {} as appConfig;
            } else {
                app.status = 0;
                app.response.set222("还未配置appConfig!");
            }
        }
    }
}
