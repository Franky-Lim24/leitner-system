# Leitner Box
## _Heap Group 21_

The Leitner Box application is a learning approach by providing efficient spaced repetition of flashcards selection.  
[<img src="https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/logo.png" width="40px" height="40px"/>](https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/logo.png)

## Features

- Flashcard Management System
- Flashcard Display and Evaluation System
- Automatic Question Leveling 
- Automatic Schedule Configuration

## Tech Stack

Leitner Box uses a number of open source projects to operate:

- [React Native](https://reactnative.dev/) - Frontend framework for mobile apps
- [Spring Boot](https://spring.io/projects/spring-boot) - Backend framework for web applications
- [Cloud SQL](https://cloud.google.com/sql) - Host and Store data in MySQL Database
- [App Engine](https://cloud.google.com/appengine) - Host Spring Boot APIs

## Installation

### Spring Boot Application
To run locally, ensure application.properties file in resources folder are filled with the database connection properties

```sh
cd leitner-backend
mvn spring-boot:run
```
Or test the application using Postman by accessing `https://heap-leitner.uc.r.appspot.com/`

### React Native Application
Ensure node version 16 is installed in your workstation and Expo Go in your phone before proceeding with the installation commands

```sh
cd leitner-frontend
npm i -g expo-cli
npm i
npm start
```

A QR code will be displayed in the terminal, please scan the QR code using Expo Go app for Android or Camera for IOS
  
## Application Guide  
  
- Sign In or Register an account   
  
[<img src="https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/Sign%20In.jpg" height="300px"/>](https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/Sign%20In.jpg)  
  
- Explore the Homepage  
  
[<img src="https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/Homepage.jpg" height="300px"/>](https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/Homepage.jpg)  
  
- Create a new Box and Questions  
  
[<img src="https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/Create%20Box%20and%20Qns.jpg" height="300px"/>](https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/Create%20Box%20and%20Qns.jpg)  
  
- View your schedule  
  
[<img src="https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/Schedule.jpg" height="300px"/>](https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/Schedule.jpg)  
  
- Practice your flashcards  
  
[<img src="https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/Questions.jpg" height="300px"/>](https://raw.githubusercontent.com/franky-lim24/leitner-system/main/images/Questions.jpg)
