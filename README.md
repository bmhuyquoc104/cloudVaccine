# Vaccination Program
RMIT University Vietnam \
Course: 	*COSC2638  Cloud Computing* \
Semester: *2021B* \
Assessment name: *Final Project* \
Team name: *The Chamber of Secrets* \
Team members: 
1. Nguyen Dang Huynh Chau - s3777214
2. Vo Quoc Huy - s3823236
3. Truong Phu Khang - s3814172
4. Le Tran Trong Hung - s3805504

# INTRODUCTION:
In this project, our group has decided to build an application for registration for be vaccinated and review, and getting information for each vaccine that has been allowed to use in Vietnam. By using dynamo DB as a storage (database), configurate Lambda function and API on AWS. So that, we can collect data from DynamoDB table and display, adding, create new, and delete by users easily. In additional, our group also draw graphs base on all data that we had collected and store in dynamoDB, for easily monitoring, and comparision covid case, and vaccinated rate situation between each country and Vietnam. Also, this app also collecting data which is updating daily for people to monitor daily. With this feature, we used a real time API with react.js (Javascript). Our app also allow user to register an account on our app. With many feature assistance account users like forget password, change password and email, verify code after signing up or user forgot password.

# COMPONENTS:
* **DynamoDB**: we use DynamoDB as storage where we can store many different types of data in different tables. These table will be used in some page, like review page, vaccine page, register page, all country summary and dashboard.
* **-	Lambda function**: this tool will be used as an API request executer. Whenever, users make a request from a feature in the application that had been coded to use a particular API gateway, a particular Lambda that had been set to work with one API gateway will access an exact table in DynamoDB and perform the request as it was programed in.

* **API gateway**: this is also the tool that needed to become a part of the process of making any request from client. API gateway will call the request within the system toward Lambda function. One API will be connected with one button to perform request as correct as clients ask for.
* **Amplify Sign Up**: this tool will cooperate with Cognito to help users create accounts on the application. It will be used in sign up pages.
* **Amplify Deploy**: Beside working for sign up, amplify can also become a host work with Github to host application online rather than on localhost. This is the tool we will use when the project has been completed. 
* **Cognito**: Cognito is an authentication tool that used to store account variable like username and email and check when clients sign in or change password or email. Cognito is implement in sign in, change password, email.
* **Cognito**: Cognito is an authentication tool that used to store account variable like username and email and check when clients sign in or change password or email. Cognito is implement in sign in, change password, email.
* **SNS**: SNS is Amazon Simple Notification Service (Amazon SNS) is a fully managed messaging service for both application-to-application (A2A) and application-to-person (A2P) communication. It is used for notifying when there is a review is added.
* **SES**: SES Amazon Simple Email Service (SES) is a cost-effective, flexible, and scalable email service that enables developers to send mail from within any application. It is used for sending a mail confirm for a successful registration.
* **LEX**: Amazon Lex provides the advanced deep learning functionalities of automatic speech recognition (ASR) for converting speech to text, and natural language understanding (NLU) to recognize the intent of the text, to enable you to build applications with highly engaging user experiences and lifelike conversational interactions. It is used for booking appointment and instructing how to use the application.
* **S3**: Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. It is used for storing all the health declaration in this application.
* **Cloud watch**: Amazon CloudWatch is a monitoring and observability service built for DevOps engineers, developers, site reliability engineers (SREs), and IT managers. It is used for logging the activities and conversation of the AWS Lex Bot.

# How to use this app:
## Install all the library:
```
npm install
```

# Acknowledgement
* Dr Nguyen Ngoc Thanh - our lecturer
* AWS Documentation: https://docs.aws.amazon.com/
