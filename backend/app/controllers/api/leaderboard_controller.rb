class Api::LeaderboardController < ApplicationController
  def update
    user_id = params[:user_id]
    streak = params[:streak]
    puts user_id
    puts streak

    if user_id.present? && streak.present?
      UpdateLeaderboardJob.perform_later(user_id, streak.to_i)
      render json: {status: "Job enqueued"}, status: :ok
    else
      render json: {error:"Invalid parameters"}, status: :unprocessable_entity
    end
  end
end
