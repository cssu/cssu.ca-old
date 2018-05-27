#!/usr/bin/env bash
# Strict mode: http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

SOURCE_BRANCH="master"
TARGET_BRANCH="master"
TARGET_REPO="git@github.com:cssu/cssu.ca.git"
SHA="$(git rev-parse --verify HEAD)"

# Decrypt deploy key
echo "Decrypting deploy key to .travis/deploy_key..."
openssl aes-256-cbc -K $encrypted_d7c771f4f1c5_key -iv $encrypted_d7c771f4f1c5_iv -in .travis/deploy_key.enc -out .travis/deploy_key -d

# Add deploy key to SSH agent
echo "Adding deploy key .travis/deploy_key to ssh-agent..."
eval "$(ssh-agent -s)"
chmod 600 .travis/deploy_key
ssh-add .travis/deploy_key

# Clone the existing gh-pages for this repo into out/
git clone "$TARGET_REPO" gh_pages_repo
cd gh_pages_repo
git checkout "$TARGET_BRANCH"
cd ..

echo  Clean out existing contents
rm -rf gh_pages_repo/**/* || true
rm -f gh_pages_repo/.gitignore || true

echo Copy in jekyll site
cp -r _site/ gh_pages_repo/

# Now let's go have some fun with the cloned repo
cd gh_pages_repo
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
git push origin "$TARGET_BRANCH"
