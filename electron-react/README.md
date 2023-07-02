## About Project Structure

## About the Backend <-> Frontend API

### Adding new functions

To expose a new main process function to the frontend, we must:

1. Within `src/shared/api.ts`, add an `ApiKey` enum
2. Within `src/backend/api`, define the function that should run on the main process
3. Within `src/backend/api/index.ts`, add an entry to the `backendApi` object
4. Within `src/preload.ts`, add an entry to the `frontendApi` object. This is where you define what arguments you want the frontend to be able to send!
