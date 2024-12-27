Rails.application.routes.draw do


  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  resources :users, only: [:index, :create, :destroy]

  namespace :api do
    get 'hiragana_check', to: 'spellcheck#hiragana_check'
    post 'katakana_check', to: 'spellcheck#katakana_check'

    # leaderboards_controller
    post 'update_ranking', to: 'leaderboard#update'
  end
end
