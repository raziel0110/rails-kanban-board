Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :columns, only: [:index, :create, :destroy]
      resources :cards, except: [:show]
    end
  end
  root 'home#index'
end
