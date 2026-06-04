#!/bin/bash

# Wait for Keycloak to be ready
echo "Waiting for Keycloak to start..."
while ! curl -s http://localhost:8080/admin/realms > /dev/null 2>&1; do
  sleep 2
done

echo "Keycloak is ready, importing realm..."

# Get admin token
TOKEN=$(curl -s -X POST http://localhost:8080/realms/master/protocol/openid-connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=admin-cli" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" | jq -r '.access_token')

echo "Got admin token"

# Import realm
curl -s -X POST http://localhost:8080/admin/realms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d @/opt/keycloak/data/import/realm-export.json

echo "Realm import completed"
