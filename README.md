# itweather-ionic
The Weather App by IT. https://play.google.com/store/apps/details?id=com.iliyan_trifonov.itweather

This is the source code of the Android App built with Ionic and hosted [here](https://play.google.com/store/apps/details?id=com.iliyan_trifonov.itweather "ITWeather").

The weather data from [openweathermap.org](http://openweathermap.org "openweathermap.org") is used.

The application detect automatically the current location and calls the [openweathermap.org](http://openweathermap.org "openweathermap.org")'s API with the detected lat and lon + the units.

First copy the www/js/config.js.dist to www/js/config.js and put your settings in it.
Then run the application:

Can be fully tested in the browser locally:

    ionic serve

Or run it in Android emulator or a connected real device:

    cordova platform add android
    ionic run android

I don't have the possibility at the moment to test it with IOS but it should be fully compatible.
The commands for IOS will be:

    cordova platform add ios
    ionic run ios
