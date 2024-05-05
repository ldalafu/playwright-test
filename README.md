# Introduction 
This is a sample test project.

# Getting Started

## Environment setup
Create `.env` file with baseurl

  ```typescript
  URL=<your_url>
  ````
## Installation
Install Dependecies
  ```properties
  npm install
  ````
## Project Structure
The project structure is based on multiple abstractions aimed at separating complexity into manageable layers to improve
code reuse and maintainability. The general rule is that abstractions at the same layer should not call each other and
can only call lower level abstractions. The overview of the abstraction layers is provided below, followed by more
detailed descriptions with examples in the following sections.

| Layer     |                               Description                               | May Contain            |
|-----------|:-----------------------------------------------------------------------:|------------------------|
| tests     |                        playwright tests                                 | processes and/or steps |
| modules   |                        reusable test step blocks                        | steps                  |
| pages     | Page Object Model class hierarchy where each class represents a UI page | UI element objects and methods     |

## Test Execution
Tests can be executed using `npm run test`. This command is configured under `scripts` property in `package.json` file and runs tests in chromium browser.

- run test headed in chrome
  ```properties
  npm run test
  ````

- run test headless in chrome
  ```properties
  npm run chrome-headless
  ````
- run test headless in all browsers
  ```properties
  npm run all-headless
  ````

For more debugging and running options, please refer [playwright docs.](https://playwright.dev/docs/running-tests#running-tests)

