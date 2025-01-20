# Fridgefy

Welcome to **Fridgefy**!
It is a React.js + Node.js web app that allows you to store your recipes and ingredients that you have in a fridge.
Recipes can be filtered by ingredients, cuisine, diet, intolerance, and more.

> **Important Note:**
> Feel free to set up your project as you see fit, but please keep this README.md file for your reference throughout the project. The requirements and guidelines outlined here should still be followed, regardless of your chosen stack.

> **Group Work:** <br>
> Ideally, you will work in teams, as collaboration is an important part of this project. Your instructor will assign groups to ensure fairness and balance. 


## Dates

- Jan 20, 2024 - Project Kickoff
- Jan 27, 2024 - Project Presentation

## Features

### All users

- [ ] Search for recipes. You can find it in the API documentation of [DummyJSON](https://dummyjson.com/docs/recipes)

### Only registered users can:

- [ ] Add/remove ingredients to the fridge
- [ ] Add/remove recipes to the wish list
- [ ] Make shopping list based on selected recipes
- [ ] Do not include items to the shopping list if the items exist in the fridge
- [ ] Search for recipes based on ingredients in the fridge. Add a checkbox in the filter area to show only recipes with ingredients in the fridge.

## Pages

- [ ] Home / Hero page
- [ ] All Recipes page with search and filters
- [ ] Wish list page with shopping list

## Bonus
These are some ideas for the bonus features. You can choose any of them to implement.

- [ ] Filter recipes by ingredients in the fridge
- [ ] Filter recipes by cuisine
- [ ] Filter recipes by meal type
- [ ] Filter recipes by tags
- [ ] Filter recipes by rating
- [ ] Filter recipes by review count
- [ ] Filter recipes by prep time
- [ ] Remove item from the shopping list if the ingredient was added to the fridge

## Demo Application
You may refer to the following demo application for the project.
Some features, such as CRUD operations, authentication, and authorization, are implemented in the demo application. (CRUD operations, Authentication, and Authorization)

- [ReizApp](https://wad301-demo-denkireizouko.vercel.app/)

## API

- https://dummyjson.com/docs/recipes
- https://spoonacular.com/food-api/docs (Alternative)

## Database

Personalized fridge items and selected recipes can be stored using one of the following:

## Services you may use

- [Render](https://render.com/docs/postgresql)
- [Firebase](https://firebase.google.com/docs/database/rtdb-vs-firestore)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart)

## Stand-alone Databases

- [Prisma](https://www.prisma.io/nextjs) with your choice of database (e.g., PostgreSQL, MySQL)
- [MongoDB](https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/) with Mongoose

> **Info:** Choose the option that best fits your project needs and team's expertise. It is not necessary to use a service for the database. You can use a stand-alone database. Use the knowledge you have learned in the Node.js class.

## Authentication

- SSO with Google or Github
  > Choose from any authentication providers you prefer such as:
  - [Clerk](https://clerk.com/docs/quickstarts/react)
  - [Supabase Authentication](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
  - [Firebase Authentication](https://firebase.google.com/docs/auth)

> **Info:** It is not necessary to use a third-party authentication service. You can implement your own authentication system using the knowledge you've gained from your Node.js class, such as using JSON Web Tokens (JWT) or session-based authentication.

## Stack

- Typescript (It would be a big plus for future)
- React JS (frontend)
- Node JS (backend)


## Design Resources

- An initial wireframe is provided within the repository. It is just for you to reference, so you can come up with your own.

![sample](./docs/CICCC-React-Final.png)

- You can refer to these sites for design and UI insipirations from:
  - [Dribbble](https://dribbble.com/)
  - [Wix](https://www.wix.com/blog/website-design-trends)
  - [Template monster](https://www.templatemonster.com/blog/website-design-trends/)

## Rules of GIT

- **Never code on main**
- Create a branch and work on your task
- Create PR, do PR reviews, and approve the PR before merging to the main branch
- The main branch should never be broken at anytime
- Conflicts happens time to time. It's a part of development. You are not doing anything wrong. There are ways of minimizing conflicts but you can never get rid of them.

## Team Workflow

### Format

Best practices for Standup meetings: 5-10 minutes per day

<blockquote>
<h3>What did you do yesterday?</h3>
Eg. I worked on the login page and implemented the Google login using NextAuth. I also created the user model in the database and implemented the signup functionality.<br>
<h3>What are you going to do today?</h3>
Eg. I will start working on the signup page and implement the Github login using NextAuth.
<h3>Do you have any blockers?</h3>
Eg. I am stuck on the signup page and I am not sure how to implement the email verification.
</blockquote>

### Dividing Tasks

- Design
- Frontend
- APIs
- Consider of using Github issue or Project management apps like Trello
- Pair programming (Take turns)

### Understand your data

- What is the data?
- What data do you need?
- What types of data do you need?
- How to store the data?
- Create the data flow

eg. search recipes -> fetch recipes -> display recipes -> add to My recipes (click event) -> store my recipes -> fetch my recipes (or manage state separately) -> display updated my recipes

### Set up your environment

- One member of the team will accept the project material (clone the repository) and other two will join to the team (repository collaboration - add as a collaborator)
- One member of the team will create a slack channel where async discussion happening and invite the rest members plus include instructor in the channel.
- Create `.env` or `.env.local` (choose based on official documentation) file at the root of the project for the firebase project (or other BaaS), and add it to the `.gitignore` file (`.env config` in the code)
- **MAKE SURE YOU DON'T PUSH THE .ENV FILE TO GITHUB**
- Push the initial commit to the repository
- Every member should clone the repository
- Every member should create their own branch

### Create the design

- Think about the UI and how would you split into components
- Create the wireframe (lo-fi, hi-fi)
- The more design, the faster you can build in development phase.

### Please keep in mind!!

- if something fails in your team, it is not one of your team member's failure but `WHOLE TEAM`.
- if you do not want to lead, `follow` the lead
- Decide as a team
- Be responsive - no longer than half day
- Estimate each task and try to aim to finish on time
- Please flag if you think you are behind
- If you are stuck on a problem for more than 1 hour, It is time to ask for help
- Take an action instead of keep thinking

Remember, the journey of building this project is just as important as the destination. Your effort, learning, and growth throughout this process are what truly matter. Good luck, and enjoy the process of bringing Fridgefy to life!
