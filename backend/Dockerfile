# Base image
FROM ruby:3.2

# Set working directory inside the container
WORKDIR /app

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs yarn

# Copy the Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy the Rails application code into the container
COPY . .

# Precompile assets (if necessary)
# RUN RAILS_ENV=production bundle exec rails assets:precompile

# Expose the application port
EXPOSE 3000

# Command to run the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
