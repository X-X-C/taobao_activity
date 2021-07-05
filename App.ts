import {XApp} from "./base/App";
import {Before} from "./src/config/Before";

export default class App extends XApp {
    globalAppConfig: appConfig;
    before: Before = new Before(this);
}
