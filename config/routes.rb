Rails.application.routes.draw do
  root "root#root"

  namespace :api , defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:show, :index, :create, :update, :destroy]
    resources :blogs, only: [:create, :index, :update, :destroy, :show] do
      collection do
        get :current_user_blog
      end
    end
    resources :posts, only: [:create, :show, :update, :destroy, :index]
    resources :followings, only: [:create, :index, :destroy]
    resources :likings, only: [:create, :index, :destroy]
    resources :taggings, only: [:create, :index, :destroy]
  end
end
