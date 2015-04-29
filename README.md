# itweather-ionic
The Weather App by IT(me!). https://play.google.com/store/apps/details?id=com.iliyan_trifonov.itweather

This is the source code of the Android App built with Ionic and hosted [here](https://play.google.com/store/apps/details?id=com.iliyan_trifonov.itweather "ITWeather").

The weather data from [openweathermap.org](http://openweathermap.org "openweathermap.org") is used.

The application detects automatically the current location and calls the [openweathermap.org](http://openweathermap.org "openweathermap.org")'s API with the detected lat and lon + the units.

First copy the www/js/config.js.dist to www/js/config.js and put your settings in it.

Install required npm and bower modules:

    npm install && bower install

Install the required cordova plugins:

    cordova plugin add com.ionic.keyboard org.apache.cordova.device org.apache.cordova.geolocation

Run the application:

It can be fully tested in the browser locally:

    ionic serve

Or run it in Android emulator or a connected real device:

    cordova platform add android
    ionic run android

I don't have the possibility at the moment to test it with iOS but it should be fully compatible.
The commands for iOS will be:

    cordova platform add ios
    ionic run ios
