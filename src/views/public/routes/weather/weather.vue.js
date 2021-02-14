import ApiService from "../../../../services/api.service";
import { WEATHER_CONFIG } from "./weather.config";
import CardItem from "./components/card-item/card-item";
import firebase from "../../../../config/firebase.config";
import _ from "lodash";

export default {
    name: "weather",
    props: [],
    // Initializing the data
    data: function () {
        return {
            isDark: true,
            settingsEnabled: false,
            units: "metrics",
            alert: null,
            buildNumber: process.env.BUILD_NO,
            api: new ApiService(),
            isLoading: null,
            weatherData: null,
            // Data for testing
            // weatherData: { ...WEATHER_CONFIG.testWeatherData },
            //position : { ...WEATHER_CONFIG.defaultPosition },
            // places: [{ ...WEATHER_CONFIG.defaultPosition }],
            position: null,
            places: [],
            selectedIndexForForecastDays: 0,
            db: firebase.firestore(),
        };
    },
    created: function () {
        // Fetch Location from Navigator
        if (navigator.geolocation) {
            // Watch for User Action
            setTimeout(this.watchForPermissions,100);
            navigator.geolocation.getCurrentPosition((position) => {
                this.isLoading = true;
                var geocoder = new google.maps.Geocoder();
                const latlng = {
                    lat: parseFloat(position.coords.latitude),
                    lng: parseFloat(position.coords.longitude),
                };
                this.$set(this, "position", {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    label: "Browser Location",
                });
                this.places.push(this.position);
                this.isLoading = false;
                // Get Place Details from Geo Code
                geocoder.geocode({ location: latlng }, (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK) {
                        this.$set(this.position, "label", results[0].formatted_address);
                        this.$set(this.places[0], "label", results[0].formatted_address);
                    }
                });
            });
        }
    },
    methods: {
        watchForPermissions: function(){
            navigator.permissions.query({
                name: "geolocation"
            }).then((result)=> {
                if (result.state == "granted") {
                    if(this.isLoading === null && !this.position){
                        this.isLoading = true;
                    }
                } else if (result.state == "prompt") {
                    setTimeout(this.watchForPermissions,100);
                }
            });  
        },
        // Load Weather from OpenWeather
        loadWeather: function (position) {
            this.isLoading = true;
            fetch(`https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${position.lat}&lon=${position.lng}&appid=2926c12fece2510281e36ab190887136`)
                .then(
                    (response) => {
                        if (response.status !== 200) {
                            this.isLoading = false;
                            this.alert = {
                                class: "alert-danger",
                                icon: "fa-info-circle",
                                text: "Unexpected error occurred."
                            };
                        } else {
                            response.json().then((data) => {
                                data.daily.unshift(data.current);
                                this.$set(this, "weatherData", data);
                                this.isLoading = false;
                                this.selectedIndexForForecastDays = 0;
                                this.settingsEnabled = false;
                                this.$toastr.s("Weather Data Loaded Successfully.");
                                // Store responses in firestore for history purpose
                                this.db.collection("searches").add({
                                    address : this.position.label,
                                    data: data
                                });
                            }).catch((err) => {
                                this.isLoading = false;
                                this.alert = {
                                    class: "alert-danger",
                                    icon: "fa-info-circle",
                                    text: err ? err.toString() : "Unexpected error occurred."
                                };
                            });
                        }
                    }
                )
                .catch((err) => {
                    this.isLoading = false;
                    this.alert = {
                        class: "alert-danger",
                        icon: "fa-info-circle",
                        text: err ? err.toString() : "Unexpected error occurred."
                    };
                });
        },
        getDateTime: function (timestamp) {
            let date = new Date(0);
            date.setUTCSeconds(timestamp);
            return date.toLocaleString();
        },
        getDate: function (timestamp) {
            let date = new Date(0);
            date.setUTCSeconds(timestamp);
            return date.toLocaleDateString();
        },
        getTime: function (timestamp) {
            let date = new Date(0);
            date.setUTCSeconds(timestamp);
            return date.toLocaleTimeString();
        },
        getImage: function (icon) {
            return `<img width=40 height=40 src="https://openweathermap.org/img/wn/'+${icon}+'.png`;
        },
        getDay: function (timestamp) {
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let date = new Date(0);
            date.setUTCSeconds(timestamp);
            return days[date.getDay()];
        },
        getTemperature: function (temp) {
            return `${temp} &deg;`;
        },
        scrollLeftDaysForecast: function (id) {
            if (this.selectedIndexForForecastDays > 0) {
                this.selectedIndexForForecastDays -= 1;
            }
        },
        scrollRightDaysForecast: function (id) {
            if (this.selectedIndexForForecastDays < this.weatherData.daily.length - 1) {
                this.selectedIndexForForecastDays += 1;
            }
        },
        onSearch: function (search, loading) {
            loading(true);
            this.getCities(loading, search, this);
        },

        getCities: _.debounce(function (loading, search, vm) {
            if (!search || search.toString() === "") {
                loading(false);
            } else {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ "address": search }, function (results, status) {
                    console.log(results);
                    if (status == google.maps.GeocoderStatus.OK) {
                        let places = results.filter(function (resource) {
                            return true;
                        });
                        places.forEach((place) => {
                            place.label = place.formatted_address;
                            place.lat = place.geometry.location.lat();
                            place.lng = place.geometry.location.lng();
                        });
                        vm.places = places;
                        loading(false);
                    } else {
                        let response = { ...WEATHER_CONFIG.defaultAddresses };
                        let places = response.results.filter(function (resource) {
                            return true;
                        });
                        places.forEach((place) => {
                            place.label = place.formatted_address;
                            place.lat = place.geometry.location.lat;
                            place.lng = place.geometry.location.lng;
                            place.isUserSelected = true;
                        });
                        vm.places = places;
                        loading(false);
                    }
                });
            }
        }, 1000),

        toggleDarkMode: function () {
            this.isDark = !this.isDark;
        },

        toggleSettings: function () {
            this.settingsEnabled = !this.settingsEnabled;
        }
    },
    computed: {},
    watch: {
        position: function (newVal, oldVal) {
            if (newVal && newVal.lat && newVal.lng) {
                this.loadWeather(newVal);
            }
        },
    },
    components: { CardItem }
};
