airfront-site
=============

airfront.co.uk - frontend skeleton. A combination of ruby (middleman) & nodejs (gulp+bower).

Intro
-------------

Straight from the off I'm going to declare that I'm not a total expert on the most of the technologies/frameworks I'm employing here. I'm cobbling together the knowledge and experience I do have in order to achieve my perfect front-end framework for writing HTML+CSS+Javascript.

If you see something you think can be re-factored then feel free to explain why and make a pull request. I'm always happy when somebody teaches me a better or new way of doing things.

Getting started
-------------

Clone this repo onto your machine and browse to it's root working directory. For example:

```
cd ~/sites
git clone https://github.com/paulmsmith/airfront-site.git demo
cd demo
```

Requirements:

###Ruby 1.9.3+

To check what version you have you can do:

```
ruby -v
```

If you don't have ruby (command not recognised) or the wrong version. Have a look at using RVM (http://rvm.io/) and come back.

Assuming you have Ruby and RubyGems you can install bundler with:

```
gem install bundler
```

Now from within / of where-ever you have cloned this repo you can install all the ruby dependencies with this command:

```
bundle install
```

All being well, this will have placed middleman and it's dependancies on your system. Now move onto Node

###NodeJS v0.10.26+



