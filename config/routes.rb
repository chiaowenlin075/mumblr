Rails.application.routes.draw do
  root "root#root"

  resources :users, only: [:new, :create, :edit, :update, :destroy] do
    collection do
      get :current_user_show, defaults: { format: :json }
    end
    member do
      get :show, defaults: { format: :json }
    end
  end
  resource :session, only: [:new, :create, :destroy]

  namespace :api , defaults: { format: :json } do
    resources :blogs, only: [:create, :update, :destroy, :show] do
      resources :posts, only: [:new, :create, :show, :update, :destroy, :index]
    end
  end
end
