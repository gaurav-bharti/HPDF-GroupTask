<<<<<<< HEAD
# Hello React Native

## What does this come with?

This is a fully working react-native app with a [Hasura](https://hasura.io) backend. You can clone it and modify as per your requirements. It has basic BaaS features implemented. Also, it uses [NativeBase](https://nativebase.io) for better UI.

- When you clone this quickstart project, there are two tables (article and author) in your database populated with some data.

```:bash
Note: This is just to get you familiar with the system. You can delete these tables whenever you like.
```

- There is a login screen in this app where the authentication is managed by the Hasura Auth APIs.
- Then we make data API calls to get the list of articles and their authors.
- The functions that make these calls are in the `react-native/src/hasuraApi.js` file. Modify it as you like and the changes will reflect in the app.

## How to get it running?

### Reqirements

In order to get this app running, you must have the following:
1. [hasura CLI tool](https://docs.hasura.io/0.15/manual/install-hasura-cli.html) (hasura).

2. Expo client (XDE). Download from https://expo.io/tools

3. NodeJS

(For more such apps, check out https://hasura.io/hub)

### Pushing the project to the cluster

- To get cluster information, run `hasura cluster status`. Info will be of the following form.

```
INFO Reading cluster status...
INFO Status:
Cluster Name:       athlete80
Cluster Alias:      hasura
Kube Context:       athlete80
Platform Version:   v0.15.3
Cluster State:      Synced
```

- Set the cluster name in your project by modifying `react-native -> src -> hasuraApi.js`

```:javascript
const clusterName = athlete80;
```

- Install the required node modules. Run the following command from the project directory.

```
$ cd react-native && npm install
```

- Run the following commands from the project directory to push it to your Hasura cluster.
```
$ git add .
$ git commit -m "Commit message"
$ git push hasura master
```
**The app is now ready to use!!**

### Opening the app

- Open Expo XDE, do a login/signup and click on `Open existing project...`. Browse to the hello-react-native directory and open the react-native folder.
- Once the project loads, click on Share.
- Scan the QR code using the Expo app from your phone (Install from Playstore/Appstore)
- Fully working app will open on your phone

```
Note: You can open the app with any of your desired react-native simulators. We prefer Expo because of its simple onboarding for beginners.
```

(*Shoutout to [NativeBase](https://nativebase.io) for their excellent UI components.*)


## How to include a database?

- Hasura provides instant data APIs over Postgres to make powerful data queries. For example, to select "id" and "title" of all rows from the article table, make this query to `https://data.<cluster-name>.hasura-app.io/v1/query/`

```:json
{
    "type":"select",
    "args":{
        "table":"article",
        "columns":[
            "title",
            "id"
        ],
        "where":{
            "author_id":4
        }
    }
}
```

- This app uses the above query and renders the list of articles as shown below.

![List of articles](https://github.com/hasura/hello-react-native/raw/master/readme-assets/list.png)

- You can also exploit relationships. In the pre-populated schema, the author table has a relationship to the article table. The app uses the following query to render the article page.
```:json
{
    "type":"select",
    "args":{
        "table":"article",
        "columns":[
            "title",
            "content"
            "id",
            {
                "name": "author",
                "columns":[
                    "name",
                    "id"
                ]
            }
        ],
        "where":{
            "author_id":4
        }
    }
}
```
![List of articles](https://github.com/hasura/hello-react-native/raw/master/readme-assets/article.png)

- The Hasura API Console is a UI which makes managing the backend easier. To access your api-console, run

```
$ hasura api-console
```

- You can build queries easily using the query builder on API-Console.

![QueryBuilder](https://media.giphy.com/media/3oFzmaJy6xGNehrGUg/giphy.gif)

- Also, there are ready made code snippets generated for the query that you build with the query builder. You can instantly copy and paste them in your code.

![CodeGen](https://media.giphy.com/media/3o7524EoojncABE5Ve/giphy.gif)

## How to add authentication?

- Every app almost always requires some form of authentication. Hasura gives you a flexibility to implement almost every popular login mechanism (mobile, email, facebook, google etc) in your app.
- In this application, we are using just the normal username password login. You can implement whichever login you need. The auth screen looks like this.

![List of articles](https://github.com/hasura/hello-react-native/raw/master/readme-assets/auth.png)

- You can try out all the auth APIs in the API console. Check out.

```
$ hasura api-console
```

## How to migrate from an existing project?

- Replace react-native directory with your pre-existing react-native project directory.
- run `npm install` from this new directory
- Make changes in your backend with API-Console
- App is ready

## How to use a custom API/server?

- Sometimes you might need to add new microservices/APIs as per your requirements. In such cases, you can deploy your microservices with Hasura using git push or docker.
- This quickstart comes with one such custom microservice written in nodejs using the express framework. Check it out in action at `https://api.<cluster-name>.hasura-app.io`. Currently, it just returns a "Hello-React" at that endpoint.
- This microservice is in the microservices folder of the project directory. You can add your custom microservice there.
- To generate your own custom microservice, run

```
$ hasura microservice generate --help
=======
# hello-nodejs-express

This quickstart consists of a basic hasura project with a simple nodejs express app running on it. Once this project is deployed, you will have the nodejs app running on your [cluster](https://docs.hasura.io/0.15/manual/getting-started/index.html#concept-2-a-hasura-cluster).

Follow along below to learn about how this quickstart works.

## Prerequisites

* Ensure that you have the [hasura cli](https://docs.hasura.io/0.15/manual/install-hasura-cli.html) tool installed on your system.

```sh
$ hasura version
```

Once you have installed the hasura cli tool, login to your Hasura account

```sh
$ # Login if you haven't already
$ hasura login
```

* You should have [Node.js](https://nodejs.org/en/) installed on your system, you can check this by:

```sh
# To check the version of node installed
$ node -v

# Node comes with npm. To check the version of npm installed
$ npm -v
```

* You should also have [git](https://git-scm.com) installed.

```sh
$ git --version
```

## Getting started

```sh
$ # Get the project folder and create the cluster in one shot
$ hasura quickstart hasura/hello-nodejs-express

$ # Navigate into the Project
$ cd hello-nodejs-express

```

![Quickstart](https://raw.githubusercontent.com/hasura/hello-nodejs-express/new/assets/quickstart.png "Quickstart")

The `quickstart` command does the following:
1. Creates a new folder in the current working directory called `hello-nodejs-express`
2. Creates a new trial hasura cluster for you and sets that cluster as the default cluster for this project. (In this case, the cluster created is called `bogey45`)
3. Initializes `hello-nodejs-express` as a git repository and adds the necessary git remotes.

## The Hasura Cluster

Everytime you perform a `hasura quickstart <quickstart-name>`, hasura creates a free cluster for you. Every cluster is given a name, in this case, the name of the cluster is `bogey45`. To view the status and other information about this cluster:

```sh
$ hasura cluster status
```

![ClusterStatus](https://raw.githubusercontent.com/hasura/hello-nodejs-express/new/assets/clusterstatus.png "ClusterStatus")

The `Cluster Configuration` says that the local and cluster configurations are different, this is because we have not deployed our local project to our cluster. Let's do that next.

## Deploy app to cluster

```sh
$ # Ensure that you are in the hello-nodejs-express directory
$ # Git add, commit & push to deploy to your cluster
$ git add .
$ git commit -m 'First commit'
$ git push hasura master
```

Once the above commands complete successfully, your project is deployed to your cluster.

You can open up the app directly in your browser by navigating to `https://api.<cluster-name>.hasura-app.io` (Replace `<cluster-name>` with your cluster name, this case `bogey45`)

The URL should return "Hello World".

## More on deployment

### Deploying changes

Now, lets make some changes to our `nodejs` app and then deploy those changes.

Modify the `server.js` file at `microservices/api/src/service.js` by uncommenting line 14 - 18

```javascript
app.get('/json', function(req, res) {
  res.json({
    message: 'Hello world'
  })
});
```

The above code is adding another route which returns "Hello world" as a JSON in the format

```json
{
  "message": "Hello world"
}
```

Save `server.js`.

To deploy these changes to your cluster, you just have to commit the changes to git and perform a git push to the `hasura` remote.

```sh
$ # Git add, commit & push to deploy to your cluster
$ git add .
$ git commit -m 'Added a new route'
$ git push hasura master
```

To see the changes, open the URL and navigate to `/json` (`https://api.<cluster-name>.hasura-app.io/json`, replace `<cluster-name>` with your cluster name)

### View Logs

To view the logs for your microservice

```sh
$ # app is the service name
$ hasura microservice logs app
```

## Customize your deployment

### Dockerfile

Microservices on Hasura are deployed as Docker containers managed on a Kubernetes cluster. You can know more about this [here](https://docs.hasura.io/0.15/manual/custom-microservices/develop-custom-services/index.html#using-a-dockerfile)

A `Dockerfile` contains the instructions for building the docker image. Therefore, understanding how the `Dockerfile` works will help you tweak this quickstart for your own needs.

```Dockerfile

# Step 1: Fetches a base container which has node installed on it
FROM mhart/alpine-node:7.6.0

# Step 2: Adds everything from /microservices/api/src to a /src directory inside the container
ADD src /src

# Step 3: Sets the work directory to be /src
WORKDIR /src

# Step 4: Installs the node modules inside the container
# Note: Since at STEP 3 we set the work directory to be /src, npm install is run inside the /src directory which has the package.json
RUN npm install

#Step 5
# This is the instruction to run the server
CMD ["node", "server.js"]
```

### Migrating existing app

If you already have a prebuilt nodejs app and would want to use that. You have to replace the contents inside the `microservices/api/src` directory with your app files.

What matters is that the `Dockerfile` and the `k8s.yaml` file remain where they are, i.e at `microservices/api/`. Ensure that you make the necessary changes to the `Dockerfile` such that it runs your app. You can learn more about `Docker` and `Dockerfiles` from [here](https://docs.docker.com/)

## Running the app locally

Everytime you push, your code will get deployed on a public URL. However, for faster iteration you should locally test your changes.

### Running on your machine

```sh
$ # Navigate to the src directory
$ cd microservices/api/src

$ # Install the node dependencies
$ npm install

$ # Start the server
$ node server.js
```

Your app will be running on your local port 8080

### Running on a local docker container

You can use the following steps to test out your dockerfile locally before pushing it to your cluster

```sh
$ # Navigate to the api directory
$ cd microservices/api

$ # Build the docker image (Note the . at the end, this searches for the Dockerfile in the current directory)
$ docker build -t nodejs-express .

$ # Run the command inside the container and publish the containers port 8080 to the localhost 8080 of your machine
$ docker run -p 8080:8080 -ti nodejs-express
>>>>>>> f59a6aedcb2e49fc22143861e7afb6656015e00c
```
