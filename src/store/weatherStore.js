import {decorate, observable, configure, action} from "mobx";
import APP_CONSTANTS from "../config/constants";
import axios from "axios/index";
import db from "../db/dexie.sample.db";

configure({ enforceActions: true })



class Store {
    weatherData;
    searchData;
    constructor(){
        this.weatherData = [];
        this.getUniqueSearchResult();
    }
    updateWeatherData(data){
        this.weatherData= data;
    }
    updateSearchData(data){
        this.searchData= data;
    }
    getUniqueSearchResult(){
        db.city.orderBy('name').uniqueKeys(result =>{
            this.updateSearchData(result||[]);
        });
    }
    getWeatherData(searchText) {
        db.city.put({name: searchText}).then (()=>{
            this.getUniqueSearchResult();
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
    updateSearchData: action,
    weatherData: observable,
    searchData: observable
});
const weatherStore = new Store();
export default weatherStore;