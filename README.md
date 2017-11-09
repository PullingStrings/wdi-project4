# WDI Project 4: MERN Stack

## Deployment

When deploying the app for the first time ensure you have run the following steps in order:

1. `heroku create`
1. `heroku addons:create mongolab`
1. `heroku config:set NPM_CONFIG_PRODUCTION=false`
1. `git push heroku master`
1. `heroku open`

After that simply `git commit` and `git push heroku master`.

## Important

Ensure that you add any relevant environment variables to heroku with `heroku config:set`, eg:

`heroku config:set AWS_BUCKET_NAME=wdi-project-4`

--------------------------------------------------------------------------------------------------------------------------

# WDI Project 4: MERN Stack

### PlayGen Finder

### A MERN Stack playlist generater and locator


![screen shot 2017-11-09 at 14 50 28](https://user-images.githubusercontent.com/27218761/32611988-f516f99c-c55e-11e7-93c3-8ec3f561bd1b.png)



### installation and setup

To run the code,

* visit the wdi project 4 github repository.
* Hit 'clone or download'.
* Using your terminal, run the NPM or Yarn in comand to install the dependencies needed.
* Run client:start server and in another terminal run client:start client
* Note- You will need to have 'gulp -cli' installed globally. 



### Finding Playlist's

The web app is a locator to find playlist's where ever you are dending on how many user's of the app are in your area. 
![screen shot 2017-11-09 at 15 08 20](https://user-images.githubusercontent.com/27218761/32612320-e0c45fa6-c55f-11e7-91db-144e8ddfa38d.png)

### What to look for 

You will get a slick look homepage that will ask you to login with your spotify account.
![screen shot 2017-11-09 at 14 49 42](https://user-images.githubusercontent.com/27218761/32612028-11ae7152-c55f-11e7-9c0c-16ffddfacc3b.png)




### Insert your location

Once you have logged in you can change or insert a profile picture and insert your wanted location.

![screen shot 2017-11-09 at 14 50 14](https://user-images.githubusercontent.com/27218761/32612065-2d860f34-c55f-11e7-804f-2b10effee66c.png)

You will then land on your profile page and see where you are in relation to other user's and also be able to view the playlists that you follow on your on spotify
![screen shot 2017-11-09 at 14 50 28](https://user-images.githubusercontent.com/27218761/32612120-5378399c-c55f-11e7-9958-d88fc2222c58.png)

### Preview music

If you would like to preview song's on your playlists...click on the album cover and scroll thru the preview menu under the google map
![screen shot 2017-11-09 at 14 53 43](https://user-images.githubusercontent.com/27218761/32612140-6a753f1e-c55f-11e7-9c46-b5b4f229ceae.png)

### Locate other user's around you 

If you would like to see other user's around you click on the "follow & find playlists" and you will see where other user's are in relation to your self.
![screen shot 2017-11-09 at 15 05 50](https://user-images.githubusercontent.com/27218761/32612175-833c09ec-c55f-11e7-9cd0-aa3f8509bc66.png)

### Follow playlists

Click on any user and either preview or follow their music and it will update both your in app profile and your spofity account as well

![screen shot 2017-11-09 at 15 07 07](https://user-images.githubusercontent.com/27218761/32612252-b6aba1ca-c55f-11e7-9b38-d8f42966798b.png)
![screen shot 2017-11-09 at 15 07 19](https://user-images.githubusercontent.com/27218761/32612255-b92aebf4-c55f-11e7-87a1-d33e489d953b.png)


### Technologies Used 

Software languages used-

* React
* HTML 5
* BootStrap 4
* SCSS
* Javascript
* Webpack
* Heroku
* Git & Git Hub


### Challenges faced
I'm not comfortable and familar with external API's like spotify, and so this posed and challenge for me, which is why I did this project. Also my app is very user based and so I had to build it out without testing till the near end...which was stressful
![](public/assets/screenshot-5.png)


### Improvements
I'm still working at getting a good user experience flow for the whole app...also I want to enable soundcloud login also which will be really cool...and fix some styling
