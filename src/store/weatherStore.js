import {decorate, observable, configure, action} from "mobx";
import APP_CONSTANTS from "../config/constants";
import axios from "axios/index";
import db from "../db/dexie.sample.db";

configure({ enforceActions: true })



class Store {
    weatherData = [];
    searchData = [];
    updateWeatherData(data){
        this.weatherData= data;
    }
    getWeatherData(searchText) {
        db.city.put({name: searchText}).then (()=>{
            return db.city.toArray();
        }).then((result)=>{
            console.log(result);
        }).catch((error)=>{
            //
            // Finally don't forget to catch any error
            // that could have happened anywhere in the
            // code blocks above.
            //
            alert ("Ooops: " + error);
        });
        let url = `${APP_CONSTANTS.API_URL}?q=${searchText}&appid=${APP_CONSTANTS.API_KEY}&units=metric`;
        axios.get(url)
            .then(res => {
                this.updateWeatherData(res.data.list||[]);
            })

    }
}

decorate(Store, {
    getWeatherData: action,
    updateWeatherData: action,
    weatherData: observable,
    searchData: observable
});
const weatherStore = new Store();
export default weatherStore;