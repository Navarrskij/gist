Rails.application.routes.draw do
  devise_for :users

  resources :contents
  root 'contents#index'
end
