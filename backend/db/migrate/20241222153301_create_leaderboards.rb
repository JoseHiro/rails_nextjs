class CreateLeaderboards < ActiveRecord::Migration[7.1]
  def change
    create_table :leaderboards do |t|
      t.integer :user_id
      t.string :username
      t.integer :high_streak

      t.timestamps
    end
  end
end
