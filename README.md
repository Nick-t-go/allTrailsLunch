# README


* Ruby version
   
   -3.1.2

* Steps to get up and running

    -bundle install

    -yarn install

    -rails s
    

* Note
=======

    -Add .env file with single variable called GOOGLE_API_KEY set to Google Maps/Places API key


* Some Observed Issue

    - Issue with map slingshotting to previous center on pan. This occurs only once. Would spend time looking at the events used to set the center label to diagnose. 

    - Google doesn't allow for Image caching but it really is a waste to have to re-fetch images already loaded.
