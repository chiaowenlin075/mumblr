Rails.application.routes.draw do
  root "root#root"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
  namespace :api , defaults: { format: :json } do
    resources :users, only: [:show, :update, :destroy] do
      collection do
        get :current_user_show, defaults: { format: :json }
      end
    end
    resources :blogs, only: [:create, :update, :destroy, :show] do
      collection do
        get :current_user_blog
      end
      resources :posts, only: [:new, :create, :show, :update, :destroy, :index]
    end
  end
end
