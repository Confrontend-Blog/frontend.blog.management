# Confrontend Blog Management

Authenticated management frontend for the Confrontend Blog platform.

This application is the private authoring and administration surface used to manage articles, authors, settings, and internal messages. It is built with React, TypeScript, Vite, React Router, Material UI, styled-components, generated OpenAPI clients, and a SystemJS-loaded chat microfrontend.

## Overview

`frontend.blog.management` is the operational frontend for Confrontend Blog. It sits between the authoring workflow, the NestJS backend, the shared UI library, and the chat microfrontend.

The app is responsible for:

- authenticating users after the backend Google OAuth flow
- rendering the protected admin shell
- creating and managing article content
- uploading article media
- listing authors and articles
- loading the internal chat microfrontend on the messages page
- consuming backend APIs through generated TypeScript clients
- reporting runtime errors and browser traces to Sentry

## Related Projects

- [`frontend.blog.public`](https://github.com/Confrontend-Blog/frontend.blog.public) - public blog reader experience
- [`blog.article.service`](https://github.com/Confrontend-Blog/blog.article.service) - NestJS backend API
- [`ui.library`](https://github.com/Confrontend-Blog/ui.library) - shared React UI component library
- [`frontend.blog.chat`](https://github.com/Confrontend-Blog/frontend.blog.chat) - chat microfrontend
- [`blog.serverless.chat`](https://github.com/Confrontend-Blog/blog.serverless.chat) - Firebase-backed chat package
- [`documentation`](https://github.com/Confrontend-Blog/documentation) - architecture and project documentation

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router v6
- styled-components
- Material UI
- Zustand
- React Hook Form
- React Quill
- Axios
- OpenAPI Generator
- SystemJS
- Sentry
- Jest
- React Testing Library
- Playwright
- Google App Engine

## Architecture

The app follows a layered frontend architecture.

```text
Browser
  -> Vite React app
    -> Root auth gate
      -> Protected app shell
        -> Feature pages
          -> Services
            -> API facades
              -> OpenAPI-generated clients
                -> blog.article.service
```

The main layers are:

- `src/root-component.tsx` - top-level auth gate and public/protected route split
- `src/App.tsx` - authenticated app shell, theme, global styles, and layout
- `src/app-routes.tsx` - protected feature routes
- `src/components` - layout, routing, forms, tables, and reusable UI
- `src/pages` - feature-level page composition
- `src/providers` - shared React contexts, especially auth
- `src/stores` - client-side state such as theme state
- `src/api` - generated clients, facades, services, and request utilities
- `src/utils` - auth, logging, local storage, microfrontend loading, and general helpers

## Application Routes

Public routes:

```text
/login
/inactive
```

Protected routes:

```text
/dashboard
/composer
/authors
/articles
/messages
/settings
```

At startup, `RootComponent` calls `useAuthenticate()` to determine whether a user is available. The app supports user state from:

- the `userInfo` URL parameter returned after backend OAuth redirect
- persisted user data in local storage
- a predefined test user when `VITE_ENVIRONMENT=test`

If no user is available, the app redirects to `/login`. If a user exists, the authenticated application bundle is lazy-loaded.

## API Client Strategy

Backend communication is contract-driven.

OpenAPI specs are stored under:

```text
openapi/specs
```

Generated clients are written to:

```text
src/api/openapi/generated-clients
```

Client generation is handled by:

```bash
yarn generate-clients
```

The script loops through all OpenAPI spec files and generates `typescript-axios` clients:

```text
openapi/specs/*.json
  -> @openapitools/openapi-generator-cli
  -> src/api/openapi/generated-clients/*
```

The UI does not call generated clients directly. API access is layered:

```text
Generated OpenAPI clients
  -> API facade
    -> services
      -> pages/components
```

The facade layer centralizes base URLs, request options, credentials, and error handling. This keeps generated code contained and gives the UI a stable application-level API.

## Microfrontend Integration

The messages page hosts the chat microfrontend.

```text
/messages
  -> Messages page
    -> request chat token
    -> MicroFrontend component
      -> System.import(remote bundle)
      -> remote.mount(containerId)
```

The remote bundle is loaded from Google Cloud Storage:

```text
https://storage.googleapis.com/chat-micro-fe/main-chat-fe-1.js
```

The remote module is expected to expose this contract:

```ts
type MicroFe = {
  mount: (containerId: string) => void;
  unmount: (containerId: string) => void;
};
```

This allows the chat UI to be built and deployed independently from the management app while still being mounted inside the authenticated admin experience.

## Observability

Sentry is initialized at app startup and integrated with React Router v6. The app uses:

- browser tracing
- session replay
- route instrumentation
- environment-based configuration
- a logger wrapper that records console output and Sentry breadcrumbs

Error-level logs are captured as Sentry exceptions. Info, warning, and debug logs are added as breadcrumbs so production errors have useful context.

## Local Development

Install dependencies:

```bash
yarn install
```

Run the app:

```bash
yarn dev
```

The Vite dev server runs on:

```text
http://localhost:8000
```

The local backend is expected on:

```text
http://localhost:9000
```

Vite proxies selected backend API routes to the local backend during development.

## Environment Variables

Create a local environment file and provide the backend and runtime settings:

```bash
VITE_BACKEND_URL=http://localhost:9000
VITE_CLIENT_ID=<google-client-id>
VITE_ENVIRONMENT=local
```

For tests, use:

```bash
VITE_ENVIRONMENT=test
```

Because the app consumes `@Confrontend/ui-library` from GitHub Packages, local installs may require npm registry authentication for the `@Confrontend` scope.

Example `.yarnrc` / npm registry configuration:

```text
@Confrontend:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<token>
```

## Available Scripts

```bash
yarn dev
```

Starts the Vite development server.

```bash
yarn local:prod
```

Starts Vite in production mode locally.

```bash
yarn build
```

Runs TypeScript checks and creates a production build.

```bash
yarn preview
```

Serves the production build locally.

```bash
yarn lint
```

Runs ESLint against the source tree.

```bash
yarn generate-clients
```

Regenerates API clients from OpenAPI specs.

```bash
yarn test
```

Runs Jest in watch mode.

```bash
yarn jest-preview
```

Starts Jest Preview for UI test debugging.

```bash
yarn test:e2e
```

Runs Playwright end-to-end tests with `VITE_ENVIRONMENT=test`.

```bash
yarn deploy
```

Builds the app and deploys it to Google App Engine.

## Deployment

The app is deployed as a static SPA on Google App Engine.

`app.yaml` serves files from `dist` and routes all non-asset requests back to `index.html`, allowing React Router to handle client-side routes after refresh.

```yaml
runtime: nodejs16
instance_class: F2
```

Deployment command:

```bash
yarn deploy
```

## File Structure

```text
frontend.blog.management
|-- assets/                         # README and documentation assets
|-- dist/                           # Production build output
|-- mocks/                          # Mock data for tests
|-- openapi/specs/                  # Backend OpenAPI specs
|-- public/                         # Static assets and SystemJS runtime files
|-- src/
|   |-- api/                        # API facades, services, utilities, generated clients
|   |-- components/                 # Shared UI, layout, routing, and microfrontend host components
|   |-- data-mocks/                 # Test renderers and mock helpers
|   |-- pages/                      # Dashboard, composer, authors, articles, messages, settings
|   |-- providers/                  # Auth and application-level providers
|   |-- stores/                     # Zustand stores
|   |-- styles/                     # Global styles and theme definitions
|   |-- utils/                      # Auth, logging, local storage, microfrontend, URL helpers
|   |-- App.tsx                     # Authenticated app shell
|   |-- app-routes.tsx              # Protected route definitions
|   |-- main.tsx                    # React entry point
|   |-- root-component.tsx          # Auth gate and public route definitions
|-- app.yaml                        # Google App Engine config
|-- generate-clients.sh             # OpenAPI client generation script
|-- index.html                      # Vite HTML entry and SystemJS import map
|-- vite.config.ts                  # Vite config and local API proxies
```

## Engineering Notes

Strong parts of the implementation:

- clear separation between generated API clients, facades, services, and UI
- authenticated route gate before loading the main application bundle
- shared UI package integration
- SystemJS-based microfrontend mounting contract
- Sentry integration with React Router tracing
- Jest and Playwright test setup
- Google App Engine deployment configuration

Areas to harden next:

- move the hardcoded microfrontend bundle URL into environment/config
- pass the chat token into the chat microfrontend through a formal interface
- add visible loading and failure states for remote microfrontend loading
- formalize OpenAPI client generation in CI
- remove remaining TODOs and unused imports
- tighten package naming consistency for `@Confrontend/ui-library`
- improve token refresh and browser refresh behavior
