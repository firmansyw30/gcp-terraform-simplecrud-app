
# GCP Terraform + CI/CD Pipeline

This is my final year project (also my thesis work), for demonstrate ability from terraform with CI/CD Pipeline to create a google cloud services for deploy an app that bundled using docker container.


## Architecture

![SKRIPSI-(Include Docker) Perubahan Arsitektur Skripsi Berdasarkan Kebutuhan (4)](https://github.com/user-attachments/assets/d2f57097-e20c-4309-89f9-2e010a00a38c)

**Description :**

**1.** Files and all application assets used in the research will be wrapped in a Docker container using Dockerfile, Terraform configuration file and Cloud Build configuration file (YAML) which contains components in the build process required by Cloud Build (Trigger), pushed into the same Cloud Source Repositories. 

**2.** Dockerfile will create Docker Container Images of the application used (in the Cloud Build environment and when the CI / CD Pipeline process is running) which will later be pushed into the Artifact Registry repository to be used by Cloud Run in running the application deployment process.

**3.** Cloud Source Repositories as a private VCS (Version Control System) service owned by Google Cloud Platform is connected to Cloud Build to implement CI / CD Pipeline.

**4.** In the Terraform configuration file, there are four resources used. The three resources are Cloud Run services, Cloud SQL instance + database + user, Cloud Storage bucket and Artifact Registry repositories which will be automatically created if there is a push into the Cloud Source Repositories. But in the process, the resources that are done first are Cloud SQL instance + database + user, Cloud Storage Bucket, and Artifact Registry repositories and followed by Cloud Run for application deployment that has been connected to the database.

**5.** After the four resources (Cloud SQL instance + database + user, Artifact Registry repositories, Cloud Storage Bucket, and Cloud Run services) have been built in the terraform configuration file, for example, there is a revision to the application used in research that has been deployed using Cloud Run services, it will automatically rebuild (create new) docker images and push automatically when the commit and push process is carried out into the Cloud Source Repositories.

**6.** Cloud Monitoring is used to monitor resources and applications running on the Google Cloud Platform through a dashboard created in the Google Cloud Platform console.
## Tech Stack

**Infrastructure as Code:** Terraform

**Cloud Services:** Google Cloud Platform (Cloud Run, Cloud SQL, Artifact Registry, Cloud Build, Cloud Source Repositories & Cloud Storage)

**Client:** EJS (Embedded Javascript Templates), TailwindCSS

**Server:** Node, Express

**Container:** Docker



## Run Locally

Make sure the database configuration is correct to :
 - SQL Databases from Cloud services (like database name, password, etc) or,
 - Localhost (like database name, password, etc) to run without docker container or, 
 - SQL Databases Container from Dockerhub (like database name, password, etc).
 
Follow these step to run locally


Clone the project

```bash
  git clone https://github.com/firmansyw30/gcp-terraform-simplecrud-app
```

Go to the project directory

```bash
  cd gcp-terraform-simplecrud-app
```

Install dependencies

```bash
  npm install
```

Choose one of two locally testing below :

- Start the server (without docker container)

```bash
  npm run start
```
- Start the server (with docker container)

```bash
  docker compose --up build
```

  

## Deployment

Before deploy, ensure the SQL database has a right configuration or already built. In this case, **make sure "terraform" files has provide the desired SQL database services**.

Here's a step for deploy the app to cloud run:

- Create Cloud Build trigger in console that invoked by push event in repositories

- Add comment or remove all args from "import" section in **cloudbuild.yaml**

- After that, do a git initial (make sure the git has installed)
```bash
  git init
```

- Do a commit
```bash
  git commit -m "...."
```

- Push to branch (in this case, master branch)
```bash
  git push -u origin master
```
Cloud Build will automatically execute the CI/CD pipeline process.

- After the SQL Databases is builted, connect the app to SQL databases instances (in the project-inslope/config/db.js) and make sure the SQL dump has imported to SQL instances.

- Uncomment the "import" section to deploy newest revision of the app that has connected to database instances

The "import" section in **cloudbuild.yaml** (as a terraform command) is useful for synchronize the actual resources that provisioned in Google Cloud Platform for prevent error in CI/CD Pipeline. (Correct Me If I Wrong)

## Feedback

If there's any question or feedback, feel's free to contact me at email firmansyahwicaksono30@gmail.com or to [My Linkedln](
https://www.linkedin.com/in/firmansyah-wicaksono/)


Created by : [@firmansyw30](https://www.github.com/firmansyw30)
## Lessons Learned

What I Learned is about how to provision a google cloud platform services using terraform + implement a CI/CD Pipeline even there's a still leak of security.

