source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


gem 'rails', '~> 5.1.5'
gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'redis', '~> 4.0'
gem 'pg', '~> 0.21.0'
gem 'devise', '~> 4.4.0'
gem 'simple_form', '~> 3.5.0'
gem 'annotate', '~> 2.7', '>= 2.7.1'
gem 'slim', '~> 3.0.7'
gem 'slim-rails', '~> 3.1.0'
gem 'bootstrap-sass', '~> 3.3.5'
gem 'font-awesome-rails', '~> 4.6'
gem 'jquery-ui-rails', '~> 5.0.5'
gem 'jquery-rails'
gem 'simple_form', '~> 3.5.0'
gem 'bootstrap', '~> 4.0.0'
gem 'codemirror-rails'
gem 'markdownjs-rails'
gem 'redcarpet'
gem 'albino'
gem 'nokogiri'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry', '~> 0.11'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :production do
  gem 'rails_12factor'
end
