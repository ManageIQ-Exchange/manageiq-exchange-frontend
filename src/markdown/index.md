# Manageiq Exchange
## Share your CloudForm spin with the world

## What is Exchange
ManageIQ Exchange is ManageIQ’s official community hub for sharing ManageIQ spins. A spin is the ManageIQ way of bundling  content and making it reusable.

## What is a Spin
A spin is the ManageIQ way of bundling  content and making it reusable.
Spin are stored in a content management system and are publicly available for other users.

## What is a Spin Candidate
Spin Candidates are SCM repos that are identified as potential Spins.
Spin Candidates can be found in My Content tab once you are identified and can be published or not.

## Sing up and sing in
We use a GitHub Oauth application to identify the user and its content. In order to sign in or sign up, just press the login button on the top right side of the web page. We will ask for the login information to GitHub, and GitHub will ask you for permission if it is the first time you are accessing ManageIQ Galaxy.

## Creating Spins
### Identifying Spin Candidates
Spin Candidates are identified because they have a file with the name `.manageiq-spin` in their root folder.
To populate your spin candidates, just press the refresh button under "My Content" tab.
After a few seconds, a list of spin candidates will be populated.

### Publishing Spins
You can promote a Spin Candidate to a Spin. In order to do so, the Spin Candidate needs to comply with some policies. There is an up to date template in [Exchange Template](https://github.com/ManageIQ-Exchange/manageiq-exchange-spin-template). Currently those policies are:
1. A file with the name `.manageiq-spin` can be found in the root folder
2. A metadata.yml file with the proper format can be found in the root folder. The metadata.yml file in the example describes the options within
2. A License is identified by GitHub. Sometimes, when cloning a repo, you need to manually update the LICENSE file for it to be recognized.
3. 

#### Creating a Spin the easy way
- Clone the template repo.
- Modify its 'metadata.yml' file
- Edit the License file in GitHub so it is recognized (User name and copyright year)
- Create a valid release with the name v1.0.0
- Refresh your Spin Candidates and Push "Publish"


***

## QA
#### My repo is fine but it is failing validation.

You can find additional information in the Spin Candidate if you click on it. Look for the validation log, that will describe the errors.

#### My repo has a license file but it is failing validation because it has no license

Sometimes GitHub does not recognize licenses when you clone a repo. Open the License file and save it again.

#### I don't know how to create a release
Please visit GitHub user documentation on the topic [here](https://help.github.com/articles/creating-releases/)
