cssu.cdf.toronto.edu
====================

University of Toronto Computer Science Student Union Website

### Overview

This is a standard [Jekyll](http://jekyllrb.com/) static site.

### Deploying

If you've already added your public key to `authorized_keys`, skip to [Clone this repository and add a remote to deploy to CDF](#clone-this-repository-and-add-a-remote-to-deploy-to-cdf)

##### Login to CDF as _cssuwww_

```bash
ssh -t g4name@dbsrv1.cdf.toronto.edu "sudo -u cssuwww /bin/bash"
```

(Where _g4name_ is your actual CDF username)

##### Add your public SSH key to `authorized_keys`

```bash
nano ~cssuwww/.ssh/authorized_keys
# Paste your public key into a new line in the file
```

##### Clone this repository and add a remote to deploy to CDF

On your local machine:

```bash
git clone git@github.com:cssu/cssu.cdf.toronto.edu.git
git remote add cdf cssuwww@dbsrv1.cdf.toronto.edu:cssu.cdf.toronto.edu.git
git push cdf master  # This will trigger a hook to build & serve the site on CDF
```

_Bonus: Now that you've added your SSH key to the cssuwww account, you can log in via SSH by simply running_ `ssh cssuwww@dbsrv1.cdf.toronto.edu`

### Deploying from scratch

##### Login to CDF as _cssuwww_

```bash
ssh -t g4name@dbsrv1.cdf.toronto.edu "sudo -u cssuwww /bin/bash"
```

(Where _g4name_ is your actual CDF username)

##### Install ruby via [rbenv](https://github.com/sstephenson/rbenv)

```bash
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
rbenv install 2.1.2
```

##### Install Jekyll

```bash
gem install jekyll
```

##### Set up the remote repository

```bash
git clone --bare git@github.com:cssu/cssu.cdf.toronto.edu.git ~/cssu.cdf.toronto.edu.git
cd cssu.cdf.toronto.edu.git/
```

##### Configure the _post-receive_ hook

Paste into `~/cssu.cdf.toronto.edu.git/hooks/post-receive`:

```bash
#!/bin/bash -l
GIT_REPO=$HOME/cssu.cdf.toronto.edu.git
TMP_GIT_CLONE=$HOME/tmp/cssu.cdf.toronto.edu
PUBLIC_WWW=/space/data/www/cssu/htdocs

# Clone the bare repo into a temporary repo with a working copy
git clone $GIT_REPO $TMP_GIT_CLONE

# Use Jekyll to generate the static site
jekyll build --source $TMP_GIT_CLONE --destination $TMP_GIT_CLONE/_site

# Copy the static site to htdocs, overwriting existing files
cp -r $TMP_GIT_CLONE/_site/* $PUBLIC_WWW

# Remove the temporary repo
rm -rf $TMP_GIT_CLONE

exit
```

##### Set the hook to be executable

```bash
chmod u+x ~/cssu.cdf.toronto.edu.git/hooks/post-receive
```

Then see [Deploying](#deploying) to deploy from your local machine.
