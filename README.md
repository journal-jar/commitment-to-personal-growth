# Intelligent Journal

## Description
We are building a smart journal with evolving insights; We help people commit to personal growth.  
* [Use it as we build it](https://intelligent-journal-8282a9aeed1f.herokuapp.com/) (feedback loop)

## Tech stack
MERN (MongoDB, ExpressJS, ReactJS, NodeJS)

## Local development environment setup
1. For the read and write database routes to work (locally), you will need to add a mongoDB connection string as a variable to a .env file in the root directory.
2. For the OpenAI API calls to work, you will need to add an OpenAi API key to the .env file.
3. To run the application while developing, navigate to the root directory and use "npm run develop". The app will appear in your web browser at port 3000. 
> The repo is organized with the standard server/client split. The client folder contains a react front end created with the "create react app" command. There is a line in the package.json of the client folder that proxys web traffic from port 3000 to the port that Node is configured for, 3001. 
4. To successfully run, you will need all the dependencies installed. To achieve this, run the "npm i" command while in each the root, client, and server directories.

## Design
* [Wireframe](https://www.figma.com/file/uzlMSOUEbX4111nrqjxgYw/JournalJar?type=design&node-id=361%3A3193&mode=dev) -(still in development)

* Branding kit -(to be determined)

## Credits
* Karl Finkel
* Will R Cline

## Repo owner
* Will R Cline  
* willrcline.atx@gmail.com
* [Linkedin](linkedin.com/in/willrcline)  
* Slack me or otherwise contact me anytime.