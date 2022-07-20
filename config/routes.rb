Rails.application.routes.draw do
  root 'map#index'
  get '/map/nearby', to: 'map#nearby_restaurants'
  get '/map/center_place', to: 'map#center_place'
end
