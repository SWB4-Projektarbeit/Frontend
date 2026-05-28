Keycloak (local)
=================

This folder contains a local Keycloak scaffold for development using Docker Compose.

Quick start
-----------

1. From this folder run:

```bash
docker compose up -d
```

2. Open the admin console at: http://localhost:8080/
   - Username: `admin`
   - Password: `admin`

3. The realm `studienprojekt` is pre-imported and contains:
   - Roles: `dekanat`, `professor`, `staff`, `admin`
   - Public client: `frontend` (redirects allowed to `http://localhost:4200/*`)
   - Test user: `testuser` / `password`

Notes
-----
- The compose file uses the Keycloak "start-dev" mode (suitable for local development).
- Persisted data is stored in `./data`.
- You can modify `realm-export.json` to adjust clients, roles, and test users.
