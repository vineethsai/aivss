#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Get the commit message from the first argument
COMMIT_MESSAGE="$1"

# Check if a commit message was provided
if [ -z "$COMMIT_MESSAGE" ]; then
  echo "Error: No commit message provided."
  echo "Usage: ./deploy.sh \"Your commit message\""
  exit 1
fi

echo "Building the project..."
npm run build

echo "Adding changes to Git..."
git add .

echo "Committing changes with message: $COMMIT_MESSAGE"
git commit -m "$COMMIT_MESSAGE"

echo "Pushing changes to remote..."
# Assuming your main branch is 'main'. Change if it's 'master' or something else.
git push origin main

echo "Deploying to GitHub Pages..."
npm run deploy

echo "Deployment complete!" 