Rails.application.routes.draw do
  root "root#root"

  namespace :api , defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:show, :index, :create, :update, :destroy]
    resources :blogs, only: [:create, :update, :destroy, :show] do
      collection do
        get :current_user_blog
      end
      resources :posts, only: [:new, :create, :show, :update, :destroy, :index]
    end
    resources :followings, only: [:create, :index, :destroy]
  end
end
