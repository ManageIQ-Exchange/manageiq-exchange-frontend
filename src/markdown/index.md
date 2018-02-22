# MANAGEIQ EXCHANGE

## *Take ManageIQ Spins for a spin!*

## What is ManageIQ Exchange
Welcome to the ManageIQ Exchange! This is the official community portal for finding and sharing ManageIQ Spins. A Spin is the ManageIQ way of bundling content and making it reusable.

## What is a Spin
A Spin is a content package that can be imported into ManageIQ. Spins are stored in a content management system and are publicly available for other users. A Spin can also be applied to [Red Hat CloudForms](https://www.redhat.com/en/technologies/management/cloudforms), based on the ManageIQ project.

## What is a Spin Candidate
A Spin Candidate is an SCM repository that is identified as a potential Spin. Spin Candidates can be found in the "My Content" tab when you are logged in, with the option to be published in the ManageIQ Exchange to be publicly searchable by other users.

### What kind of content can be included in a Spin Candidate
Any kind of content that can be imported to/exported from ManageIQ can be part of a Spin Candidate. Related content (like dialogues related to a workflow) should be part of the same Spin. Please remember to label your Spins properly.

## Sign up and sign in
We use an Oauth application to identify the user and its content. Currently GitHub is supported. To sign in or sign up, click on "Login" at the top right corner of the ManageIQ Exchange. You will be asked to log in to GitHub, and to authorize ManageIQ Exchange if this is your first time accessing the Exchange.

## Creating Spins

### Identifying Spin Candidates
Spin Candidates are identified by having a file with the name `.manageiq-spin` in the root folder of the repository. To populate your Spin Candidates, press the "Refresh" button located under "My Content" tab. After a few seconds, a list of Spin Candidates will be displayed.

### Publishing Spins
You can promote a Spin Candidate to a Spin, which is publicly visible in the Exchange. In order to do so, the Spin Candidate needs to comply with some policies. There is an up-to-date example in [ManageIQ Exchange Spin Template](https://github.com/ManageIQ-Exchange/manageiq-exchange-spin-template). Currently the policies are:

1. A file with the name `.manageiq-spin` located in the root folder.
2. A `metadata.yml` file with the proper format can be found in the root folder. The `metadata.yml` file in the example template describes the options within.
3. A License can be identified by GitHub. Sometimes, when cloning a repo, you need to manually update the `LICENSE` file for it to be recognized.

### Creating a Spin in 5 minutes
- Clone the [template repo](https://github.com/ManageIQ-Exchange/manageiq-exchange-spin-template)
- Modify the `metadata.yml` file
- Edit the `LICENSE` file in GitHub so it is recognized (modify name and copyright year)
- Create a valid release with `vx.y.z` as the release tag, e.g. `v1.0.0`
- Refresh your Spin Candidates and toggle "ON" to publish a Spin to the Exchange

## Discovering Spins

From the [Explore](/explore/) page, you can find the most popular Spins and recently added Spins. Use the [Search](/search/) tab to filter Spins by author, Spin name, or tag. [Browse Authors](/authors/) to find content creaters in the ManageIQ Exchange.

## Managing your content

You can see a list of your Spin Candidates and Spins associated with your GitHub account on the "My Content" page. From here, you can refresh, validate, and publish your Spin Candidates to Spins.

***

## FAQ

### My repository is fine but it is failing validation

You can find additional information about the Spin Candidate if you click on it. Look for the validation log which will describe the errors.

### My repo has a license file but it is failing validation because it has no license

Sometimes GitHub does not recognize licenses when you clone a repo. Open the License file and save it again.

### I don't know how to create a release

Please visit GitHub user documentation on the topic [here](https://help.github.com/articles/creating-releases/)

### More questions?

If you have unanswered questions about the ManageIQ Exchange, feel free to ask on the [ManageIQ Forum](http://talk.manageiq.org/) and tag it with `exchange`.
