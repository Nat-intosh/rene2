Rails.application.routes.draw do
  get "home/index"
  resources :emojis
  resources :paintings
  resources :questions do
    collection do
      get 'new_question'
      post 'submit_answer'
      get 'contribute'
      post 'submit_contribution'
      post 'reset_contributions'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
  root "home#index"
  get 'questions/finish', to: 'questions#finish', as: 'finish'
  get 'home/intro', to: 'home#intro', as: 'home_intro'
    get 'home/credits', to: 'home#credits', as: 'home_credits'
    get 'home/finish', to: 'home#finish', as: 'home_finish'

end
