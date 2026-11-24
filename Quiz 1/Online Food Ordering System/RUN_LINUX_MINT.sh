#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "[1/4] Starting PostgreSQL..."
sudo systemctl start postgresql

echo "[2/4] Setting the project PostgreSQL password..."
sudo -u postgres psql -v ON_ERROR_STOP=1 -c "ALTER USER postgres WITH PASSWORD 'MyNewPassword123';"

echo "[3/4] Creating database if it does not exist..."
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='food_ordering'" | grep -q 1; then
  sudo -u postgres createdb food_ordering
fi

echo "[4/4] Installing Node.js dependencies..."
npm install

echo "Starting the Online Food Ordering System..."
npm run start:dev
