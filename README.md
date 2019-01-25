# Frida-backend
Frida, AI and IoT comes to the aid of teachers, students, and first responders. A Call for Code project from IBM.


## Steps to run the project on local machine
1. Download/Clone the project
2. Run `npm install` to install all the required dependencies
3. Run `npm run-script build` to build the project
4. Run `npm start` to start the project. Currently, the server is configured to run on Port `3001`


## Steps to run the project on IBM Cloud
1. Download and install the IBM Cloud [CLI External](https://console.bluemix.net/docs/cli/index.html#overview)
2. Through terminal CLI, Run
    > ibmcloud login

    Note, if you are using a federated user ID, please use one time passcode

    > ibmcloud login --sso

    or use API key

    > ibmcloud --apikey key or @key_file

    to authenticate; Get One Time Code from https://identity-2.us-south.iam.cloud.ibm.com/identity/passcode to proceed.
3. Select an Account and enter a number
4. Select a Region and enter a number
5. Select current org/space:

    1. View the current account, region, org, and space:

       > ibmcloud target --cf

    2. Select the space and enter a number
6. Go to your App backend API source code folder, run

> ibmcloud cf push FridaApp

7. Once it has been pushed to your org/space in IBM Cloud, click on the app
8. Open the app, and click on "View App URL", copy the URL
9. Update line in constant.js file in [Frida-app](https://github.com/IBM/Frida-app) with:

> const HOSTNAME = "https://fridaxxxx.mybluemix.net/v1/";