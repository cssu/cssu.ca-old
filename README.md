cssu.cdf.toronto.edu
====================

University of Toronto Computer Science Student Union Website

### Overview

This is a standard [Jekyll](http://jekyllrb.com/) static site.

### Deploying

Clone this repository and add a remote to deploy to CDF:

```bash
git clone git@github.com:cssu/cssu.cdf.toronto.edu.git
git remote add cdf cssuwww@dbsrv1.cdf.toronto.edu:cssu.cdf.toronto.edu.git
git push cdf master  # This will trigger a hook to build & serve the site on CDF
```

### Deploying from scratch

##### Login to CDF as _cssuwww_

```bash
ssh -t g4name@dbsrv1.cdf.toronto.edu "sudo -u cssuwww /bin/bash"
```

##### Install ruby via [rbenv](https://github.com/sstephenson/rbenv)

```bash
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source ~/.bashrc
rbenv install 2.1.2
```

##### Install Jekyll

```bash
gem install jekyll
```

##### Add your public SSH key to `authorized_keys`

```bash
nano ~cssuwww/.ssh/authorized_keys
# Paste your public key into a new line in the file
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

git clone $GIT_REPO $TMP_GIT_CLONE
jekyll build --source $TMP_GIT_CLONE --destination $TMP_GIT_CLONE/_site
cp -r $TMP_GIT_CLONE/_site/* $PUBLIC_WWW
rm -rf $TMP_GIT_CLONE
exit
```

##### Set the hook to be executable

```bash
chmod u+x ~/cssu.cdf.toronto.edu.git/hooks/post-receive
```

Then see [Deploying](#deploying) to deploy from your local machine.
