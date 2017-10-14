#!/usr/bin/env bash
# Strict mode: http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

# Add dbsrv1 to known_hosts
echo "Adding dbsrv1.teach.cs.toronto.edu to ~/.ssh/known_hosts..."
cat << EOF >> ~/.ssh/known_hosts
dbsrv1.teach.cs.toronto.edu ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAydP6bdmyTALluMTn4xEs+Fu8OAFDbyV93owVVNGxerSvNijXRt7BuvaCY13mXtCyJ2BsDzNYZ5kR/+FFCIv5e6/3Y5W4yjkwRZ5/Drt5ZK2fJtmeRYyVOztQHSyWIY9KBJmrcGpDPpK6LY6kseR2djWBfwGLCejSKXWsZ5+Oz/0=
EOF

# Add earth to known_hosts
echo "Adding earth.teach.cs.toronto.edu to ~/.ssh/known_hosts..."
cat << EOF >> ~/.ssh/known_hosts
earth.teach.cs.toronto.edu ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAydP6bdmyTALluMTn4xEs+Fu8OAFDbyV93owVVNGxerSvNijXRt7BuvaCY13mXtCyJ2BsDzNYZ5kR/+FFCIv5e6/3Y5W4yjkwRZ5/Drt5ZK2fJtmeRYyVOztQHSyWIY9KBJmrcGpDPpK6LY6kseR2djWBfwGLCejSKXWsZ5+Oz/0=
EOF

# Decrypt deploy key
echo "Decrypting deploy key to .travis/deploy_key..."
openssl aes-256-cbc -K $encrypted_d7c771f4f1c5_key -iv $encrypted_d7c771f4f1c5_iv -in .travis/deploy_key.enc -out .travis/deploy_key -d

# Add deploy key to SSH agent
echo "Adding deploy key .travis/deploy_key to ssh-agent..."
eval "$(ssh-agent -s)"
chmod 600 .travis/deploy_key
ssh-add .travis/deploy_key

# Copy the static site to the CS Teaching Labs, preserving the gallery and wiki directories
# We proxy through dbsrv1 to earth since earth isn't accessible outside of the Teaching Labs network
# For more info on proxying, see: https://superuser.com/a/1115998
echo "Copying static site to earth.teach.cs.toronto.edu:/data/www/cssu/htdocs via rsync..."
rsync \
  -e 'ssh -o "ProxyCommand ssh -A cssuwww@dbsrv1.teach.cs.toronto.edu -W %h:%p"' \
  --archive \
  --compress \
  --delete \
  --exclude="/data/" \
  --exclude="/gallery/" \
  --exclude="/w/" \
  --verbose \
  _site/ \
  cssuwww@earth.teach.cs.toronto.edu:/data/www/cssu/htdocs
