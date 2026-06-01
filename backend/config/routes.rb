Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  namespace :api do
    get 'time', to: 'time#index'
    post 'recipe/extract', to: 'recipe#extract'

    namespace :v1 do
      resources :recipes, only: [:index, :show, :create]
      post "recipes/preview", to: "recipes#preview"
      post "recipes/youtube_api", to: "recipes#youtube_api"
    end
  end
end
