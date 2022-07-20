class Google::Api
  include HTTParty
  base_uri 'https://maps.googleapis.com/maps/api'
  default_timeout 10

  def initialize
    @options = { key: ENV['GOOGLE_API_KEY'] }
  end

  def nearby_search(location, keyword, radius)
    lat_lng = JSON.parse(location)
    options = { **@options, location: "#{lat_lng['lat']},#{lat_lng['lng']}", radius: radius, keyword: keyword }
    self.class.get('/place/nearbysearch/json', query: options)
  end

  def reverse_geocode(location)
    self.class.get('/geocode/json',
                   query: { **@options, location_type: 'APPROXIMATE', latlng: location })
  end
end
