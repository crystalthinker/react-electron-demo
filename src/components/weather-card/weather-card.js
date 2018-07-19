import React, { Component } from 'react';
import './weather-card.css'

class WeatherCard extends Component {
    formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    render() {
        return (
            <div className="card col-3 bg-success">
                <div className="card-body">
                    <h5 className="card-title">On {this.props.date.getUTCDate()},  Time: {this.formatAMPM(this.props.date)},{this.props.dayOfWeek}</h5>
                    <p className="card-text">Temp: {this.props.weatherData.main.temp}°C</p>
                    <p className="card-text">Pressure: {this.props.weatherData.main.pressure} Pa</p>
                    <p className="card-text">Humidity: {this.props.weatherData.main.humidity}</p>
                    <p className="card-text">Clouds: {this.props.weatherData.clouds.all} %</p>
                    <p className="card-text">Desc: {this.props.weatherData.weather[0].description}</p>
                </div>
            </div>
        );
    }
}

export default WeatherCard;