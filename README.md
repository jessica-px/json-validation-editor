# JSON Validation Editor

## What is this?
A VS Code-like text editor (built with Electron) that displays JSON schema validation errors in the user interface.

![Screenshot 2023-09-20 at 11 15 43 AM](https://github.com/jessica-px/json-validation-editor/assets/17056719/5c3f096a-213f-4f4b-8d40-9ceecae1791a)

## Why?
I'm working on a personal game development project that uses a data-driven design pattern, meaning just about everything in the game is defined via JSON. This keeps my game code highly reusable, and makes the design iteration process very fast and easy, but it does depend on all of my JSON files adhering to very specific schemas, as well as passing validation in other ways (eg. unique IDs). I'd written a CLI-based validator, but frequently found myself wanting a VS Code-like interface for easily naviagting my validation errors. While travelling (meaning I didn't have access to my game development computer), I decided to see what I could throw together. This doubled as an excuse to play around with Electron. Eventually, I reached a point where I decided I'd probably be better served by just writing a VS Code plugin  instead, but the process was still very fun.

## Dev Notes

Run the Electron app with `npm run start`

### Adding new functions to the API

To expose a new main process function to the frontend, we must:

1. Within `src/shared/api.ts`, add an `ApiKey` enum
2. Within `src/backend/api`, define the function that should run on the main process
3. Within `src/backend/api/index.ts`, add an entry to the `backendApi` object
4. Within `src/preload.ts`, add an entry to the `frontendApi` object. This is where you define what arguments you want the frontend to be able to send!
