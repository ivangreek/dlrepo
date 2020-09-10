# Dubai Landmarks application

### Requirements

The following configuration is the prerequisites for the installation. 

```
Angular CLI: 10.0.5
Node: 14.2.0
OS: linux x64
```

### Repository

* Copy the repository in a local directory with `git clone` or download the `.zip` file.
* The repository contains two folder `dlback` and `dlfront` for Front-end and Back-end respectively.

### Parse server

* In the dlback directory execute: `npm install`
* Copy `.env` file to the `dlrepo/dlback` directory
* In the same directory execute `npm start`

### Front-end

* Execute node package installation in the folder `dlrepo/dlfront`

`npm install`

* In the same folder execute 

`ng serve`

The application is available at the address http://localhost:4200

### Parse Dashboard

Install parse-dashboard by executing the following command:
```
npm install -g parse-dashboard
```

Save file `parse-dashboard-config.json` locally

Execute the following command:

```
parse-dashboard --config parse-dashboard-config.json
```

The Parse-dashboard is available at the following address
http://localhost:4040/
