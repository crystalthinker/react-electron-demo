import {decorate, observable, configure, action} from "mobx";
import APP_CONSTANTS from "../config/constants";
import axios from "axios/index";

configure({ enforceActions: true })



class Store {
    weatherData = [];

    getWeatherData(searchText) {
        let url = `${APP_CONSTANTS.API_URL}?q=${searchText}&appid=${APP_CONSTANTS.API_KEY}&units=metric`;
        axios.get(url)
            .then(res => {
                this.weatherData= res.data.list||[];
            })

    }
}

decorate(Store, {
    getWeatherData: action,
    weatherData: observable
});
const weatherStore = new Store();
export default weatherStore;