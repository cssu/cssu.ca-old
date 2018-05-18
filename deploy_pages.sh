#!/usr/bin/env bash
# Strict mode: http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

SOURCE_BRANCH="master"
TARGET_BRANCH="master"
TARGET_REPO="git@github.com:cssu/cssu.github.io.git"
SHA="$(git rev-parse --verify HEAD)"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
openssl aes-256-cbc -K $encrypted_79f4b640b727_key -iv $encrypted_79f4b640b727_iv -in .travis/deploy_pages_key.enc -out .travis/deploy_pages_key -d

eval "$(ssh-agent -s)"
chmod 600 .travis/deploy_pages_key
ssh-add .travis/deploy_pages_key

# Clone the existing gh-pages for this repo into out/
git clone "$TARGET_REPO" out
cd out
git checkout "$TARGET_BRANCH"
cd ..

# Clean out existing contents
rm -rf out/**/* || exit 0

# Copy in jekyll site
cp -r _site/ out/

# Now let's go have some fun with the cloned repo
cd out
git config user.name "Travis CI"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if git diff --quiet; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add -A .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Now that we're all set up, we can push.
git push "$TARGET_REPO" "$TARGET_BRANCH"
