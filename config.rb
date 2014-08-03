require 'json'
pkgfile = open("package.json")
pkgJson = pkgfile.read
pkg = JSON.parse(pkgJson)
siteConfig = pkg["siteConfig"]

set :site, { 
	:name => siteConfig["longname"],
	:id => siteConfig["siteID"],
	:version => pkg["version"],
	:sharedPath => siteConfig["sharedPath"],
	:componentPath => siteConfig["componentPath"],
	:imagePath => siteConfig["imagePath"],
	:useModernizr => siteConfig["useModernizr"]
}

################################################################
# Compass
################################################################

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

################################################################
# Page options, layouts, aliases and proxies
################################################################

# page "*" do 
# 	@sitename = siteConfig["longname"]
# 	@siteID = siteConfig["siteID"]
# 	@version = pkg["version"]
# 	@sharedPath = siteConfig["sharedPath"]
# 	@componentPath = siteConfig["componentPath"]
# 	@imagePath = siteConfig["imagePath"]
# 	@useModernizr = siteConfig["useModernizr"]
# 	@sitewideBodyClass = @siteID
# end

# for ajax templates we don't want a layout
page "**/*_ajax*", :layout => false

# Turn off layout for these pages/partials/modules
# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

################################################################
# Helpers
################################################################
require "app/helpers/custom_helpers"
helpers CustomHelpers

set :debug_assets, false

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# let's not process these files
ignore '.svn'
ignore '.svn/*'
ignore '**/.svn/**'
ignore '**/.svn'
ignore 'package.json'
ignore 'gulpfile.js'
ignore 'assets/bower.json'
ignore 'assets/bower_components/**/*'

config[:css_dir] = 'assets/styles'
config[:js_dir] = 'assets/scripts'
config[:images_dir] = 'assets/images'
config[:fonts_dir] = 'assets/fonts'
config[:layouts_dir] = 'layouts'
config[:data_dir] = 'app/data'
config[:helpers_dir] = 'app/helpers'

after_configuration do
	sprockets.append_path 'partials/components'
	sprockets.append_path 'assets/bower_components'
	sprockets.append_path 'assets/scripts'
end

################################################################
# Build-specific configuration
################################################################
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
