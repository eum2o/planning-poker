# Peculiar Planning Poker

A planning poker app for agile teams to estimate work items using the Fibonacci sequence.

<p align="center">
  <kbd>
    <img src="readme/screen1.png" alt="Screenshot of PPP" />
  </kbd>
  <br/>
  <br/>
  <kbd>
    <img src="readme/screen2.png" alt="Screenshot of PPP" />
  </kbd>
</p>

## Example Procedure

Here is a typical procedure to use PPP during your agile ceremonies:

1. Log into PPP with your team.
2. Present a user story to estimate.
3. Ask the team to vote on the story by selecting a card.
4. Once everyone has voted, the most commonly selected card will be displayed.
5. Click "Reset All Estimations" to start the process again with a new user story.

Happy estimating!

## Card Texts

To modify the card texts, edit the `valueToButtonLabel` object in `src/constants.js`.

## Usage

### Running the latest build

To run the latest build of Planning Poker, you can use Docker:

1. Run the image: `docker run -d --rm -p 3000:3000 -p 5000:5000 turtlepreteen571/planning-poker`
2. Open a web browser and go to: `http://localhost:3000`

### Running PPP locally during development

To run PPP locally during development, you can follow these steps:

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the server: `node server.js`
4. Start the React app: `npm start`
5. Open a web browser and go to: `http://localhost:3000`

### Debugging server.js with VS Code

To debug the server.js file with VS Code, you can use the following steps:

1. Open the project in VS Code
2. Open the Debug view (`Ctrl + Shift + D` or `Cmd + Shift + D`)
3. Select "Debug Server" from the dropdown menu in the top menu bar
4. Set any necessary breakpoints in the server.js file
5. Press the "Start Debugging" button (green arrow) or hit `F5`
6. The server should start and pause on any set breakpoints
7. Interact with the app to trigger the desired breakpoints
8. Use the debug console or the debug toolbar to inspect variables and step through code
