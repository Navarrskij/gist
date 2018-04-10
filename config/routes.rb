Rails.application.routes.draw do
  devise_for :users

  resources :contents do
    resources :comments, shallow: true
  end
  root 'contents#index'
end
