Rails.application.routes.draw do

  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :api do
    get 'hiragana_check', to: 'spellcheck#hiragana_check'
    post 'katakana_check', to: 'spellcheck#katakana_check'

    # leaderboards_controller
    post 'update_ranking', to: 'leaderboard#update'
  end
end
