Rails.application.routes.draw do
  root "root#root"
  namespace :api, default: { format: :json } do
  end
  resource :user, only: [:new, :create, :update, :destroy, :show]
  resource :session, only: [:new, :create, :destroy]
end
