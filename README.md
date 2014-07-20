cssu.cdf.toronto.edu
====================

University of Toronto Computer Science Student Union Website

### Overview

This is a standard [Jekyll][jekyll] static site.

### Development

##### Viewing the site locally

You should have Ruby 2.1.x and Python 2.7.x (for [Pygments][pygments]) installed. I recommend using [rbenv][] and [pyenv][] to manage your Ruby & Python installations.

First, you'll need to install Jekyll:

```bash
gem install jekyll
```

Then clone this repository and serve the site locally:

```bash
git clone git@github.com:cssu/cssu.cdf.toronto.edu.git
cd cssu.cdf.toronto.edu/
jekyll serve
```

You can use the `watch` flag when developing to instantly see the changes that you've made.

```bash
jekyll serve --watch
```

_NOTE: Changes to `config.yml` will not be instantly applied; you'll need to restart the server._

##### Branching

Use the `draft` branch to make any updates to the website. Whenever you want to publish your changes to the website, merge `draft` into `master` and then deploy:

```bash
# After making updates, merge `draft` into `master`
git checkout master
git merge draft

# Deploy to CDF (see 'Deploying' below for steps to set up the cdf remote)
git push cdf master
```

_IMPORTANT: It's okay for commits on_ `draft` _to contain bugs/issues, but_ `master` _should always point to a commit that is ready to be published._

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
```

Finally, to deploy the site, push your changes to the `cdf` remote:

```bash
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
BACKUP_DIR=$HOME/htdocs_backup
PUBLIC_WWW=/space/data/www/cssu/htdocs

# Clone the bare repo into a temporary repo with a working copy
git clone $GIT_REPO $TMP_GIT_CLONE

# Enter the working directory
cd $TMP_GIT_CLONE

# Use Jekyll to generate the static site
jekyll build

# Copy the static site to htdocs, ignoring specific files
rsync --archive --delete --exclude-from=.rsyncexclude --verbose _site/ $PUBLIC_WWW

# Remove the temporary repo
cd ~
rm -rf $TMP_GIT_CLONE

exit
```

##### Set the hook to be executable

```bash
chmod u+x ~/cssu.cdf.toronto.edu.git/hooks/post-receive
```

Then see [Deploying](#deploying) to deploy from your local machine.

[jekyll]:   http://jekyllrb.com/ "Jekyll"
[pygments]: http://pygments.org/ "Pygments"
[rbenv]:    https://github.com/sstephenson/rbenv
[pyenv]:    https://github.com/yyuu/pyenv
