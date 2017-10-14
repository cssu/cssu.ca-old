#!/usr/bin/env bash
# Strict mode: http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

# Add dbsrv1 to known_hosts
echo "Adding dbsrv1.teach.cs.toronto.edu to ~/.ssh/known_hosts..."
cat << EOF >> ~/.ssh/known_hosts
dbsrv1.teach.cs.toronto.edu ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAydP6bdmyTALluMTn4xEs+Fu8OAFDbyV93owVVNGxerSvNijXRt7BuvaCY13mXtCyJ2BsDzNYZ5kR/+FFCIv5e6/3Y5W4yjkwRZ5/Drt5ZK2fJtmeRYyVOztQHSyWIY9KBJmrcGpDPpK6LY6kseR2djWBfwGLCejSKXWsZ5+Oz/0=
EOF

# Decrypt deploy key
echo "Decrypting deploy key to .travis/deploy_key..."
openssl aes-256-cbc -K $encrypted_d7c771f4f1c5_key -iv $encrypted_d7c771f4f1c5_iv -in .travis/deploy_key.enc -out .travis/deploy_key -d

# Add deploy key to SSH agent
echo "Adding deploy key .travis/deploy_key to ssh-agent..."
eval "$(ssh-agent -s)"
chmod 600 .travis/deploy_key
ssh-add .travis/deploy_key

# Copy the static site to the a temporary location on CS Teaching Labs dbsrv1 server
echo "Copying static site to dbsrv1.teach.cs.toronto.edu:/data/www/cssu/htdocs via rsync..."
rsync \
  --archive \
  --compress \
  --delete \
  --verbose \
  _site/ \
  cssuwww@dbsrv1.teach.cs.toronto.edu:/u/cssuwww/tmpsite

# Copy the files from dbsrv1 to earth (since earth is only accessible from within the CS Teaching Labs network),
# preserving the gallery and wiki directories
ssh cssuwww@dbsrv1.teach.cs.toronto.edu /bin/bash << EOF
  cd /u/cssuwww/tmpsite
  rsync \
    --archive \
    --compress \
    --delete \
    --exclude="/data/" \
    --exclude="/gallery/" \
    --exclude="/w/" \
    --verbose \
    . \
    cssuwww@earth.teach.cs.toronto.edu:/data/www/cssu/htdocs
EOF
