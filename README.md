# Profile App

This is a simple profile app that displays user information extracted from a JWT token. It uses React, Vite, and the `jose` library for JWT verification.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [pnpm](https://pnpm.io/) (v7 or higher)

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd profile
   ```

2. Install dependencies using `pnpm`:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory and add the following environment variable:

   ```env
   VITE_PUBLIC_KEY=<your-public-key>
   ```

   Replace `<your-public-key>` with your actual public key in SPKI format (base64-encoded).

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open the app in your browser at [http://localhost:5173](http://localhost:5173).

## Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the app for production.
- `pnpm preview`: Preview the production build locally.

## Features

- Displays user profile information extracted from a JWT token.
- Verifies the JWT using a public key in SPKI format.
- Includes a logout button that clears the token and redirects to `/auth`.

## License

This project is licensed under the MIT License.
