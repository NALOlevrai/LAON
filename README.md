# LAON Studio

Run locally:
    npm install
    npm start        # http://localhost:3000

Deploy: commit on the PC, then `tools/deploy.sh` (Git Bash): push, server pulls,
`pm2 restart laon-studio`, checks https://laon-studio.com returns 200.
The server (~/LAON) only pulls: never edit there.

You can also open public/index.html directly: it is a static page.
