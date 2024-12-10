class UsersController < ApplicationController
  def index
    render json: {message: "This is the user index"}
  end
end
