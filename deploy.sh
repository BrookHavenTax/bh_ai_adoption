#!/usr/bin/env bash
# Convenience: build + deploy the AI Adoption Hub to EC2.
# Edit EC2_HOST and KEY_PATH below before first use.
set -euo pipefail

EC2_HOST="${BH_EC2_HOST:-ubuntu@PUT-YOUR-EC2-IP-HERE}"
KEY_PATH="${BH_EC2_KEY:-$HOME/.ssh/bh-hub.pem}"
REMOTE_DIR="/var/www/bh-ai-adoption-hub/"

cd "$(dirname "$0")/web"

echo "→ Running tests..."
npm run test --silent

echo "→ Type-checking..."
npm run typecheck

echo "→ Building..."
npm run build

if [[ "$EC2_HOST" == *"PUT-YOUR-EC2-IP-HERE"* ]]; then
  echo
  echo "⚠️  Edit EC2_HOST in deploy.sh (or set BH_EC2_HOST env var) before deploying."
  echo "    Built locally to ./web/dist/ but NOT pushed to EC2."
  exit 0
fi

echo "→ Syncing to ${EC2_HOST}..."
rsync -avz --delete \
  -e "ssh -i ${KEY_PATH}" \
  ./dist/ \
  "${EC2_HOST}:${REMOTE_DIR}"

echo "✓ Deploy complete."
