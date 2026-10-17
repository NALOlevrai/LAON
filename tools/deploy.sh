#!/usr/bin/env bash
# Deploy LAON: push local commits, the server pulls and restarts, then check the live site.
set -e
cd "$(dirname "$0")/.."
git push
ssh -o BatchMode=yes oracle 'cd ~/LAON && git pull --ff-only && npm install --omit=dev --silent && pm2 restart laon-studio >/dev/null && pm2 save >/dev/null'
code=$(curl --ssl-no-revoke -s -o /dev/null -w "%{http_code}" https://laon-studio.com)
echo "site: $code"
[ "$code" = 200 ]
