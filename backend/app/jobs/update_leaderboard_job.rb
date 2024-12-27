class UpdateLeaderboardJob < ApplicationJob
  queue_as :default

  def perform(user_id, streak)
    # Rails.logger.info("Starting UpdateLeaderboardJob for user_id: #{user_id}, streak: #{streak}")
    user = User.find_by(id: user_id)
    if user.nil?
      Rails.logger.error("User not found with ID: #{user_id}")
      return
    end
    leaderboard_entry = Leaderboard.find_or_initialize_by(user_id: user.id)
    if leaderboard_entry.high_streak.nil? || streak > leaderboard_entry.high_streak
      leaderboard_entry.update(username: user.name, high_streak: streak)
      Rails.logger.info("Leaderboard updated for user_id: #{user_id}")
    end
  rescue => e
    Rails.logger.error("Error in UpdateLeaderboardJob: #{e.message}")
    raise
  end

end
