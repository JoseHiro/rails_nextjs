class UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: {message: "Successfully saved data"}
    else
      render json: {errors: users.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end


end
