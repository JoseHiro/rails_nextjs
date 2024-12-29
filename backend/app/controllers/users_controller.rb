# class UsersController < ApplicationController
#   def index
#     users = User.all
#     render json: users
#   end

#   def destroy
#     user = User.find(params[:id])
#     if user.destroy
#       render json: {message: "Successfully deleted user"}
#     end
#   end

#   def create
#     user = User.new(user_params)
#     if user.save
#       render json: {message: "Successfully saved data"}
#     else
#       render json: {errors: users.errors.full_messages}, status: :unprocessable_entity
#     end
#   end

#   private
#   def user_params
#     params.require(:user).permit(:name, :email)
#   end
# end
