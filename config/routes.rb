Rails.application.routes.draw do
  root "root#root"
  resource :user, only: [:new, :create, :edit, :update, :destroy, :show]
  resource :session, only: [:new, :create, :destroy]

  namespace :api do # , defaults: { format: :json } do
    resources :blogs, only: [:create, :update, :destroy, :show] do
      resources :posts, only: [:new, :create, :show, :update, :destroy, :index]
    end
  end
end
