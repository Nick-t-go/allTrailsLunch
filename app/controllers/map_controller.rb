class MapController < ApplicationController
  def index; end

  def nearby_restaurants
    response = Google::Api.new.nearby_search(nearby_params[:location], nearby_params[:keyword],
                                             nearby_params[:radius])
    return render json: response['results'] if response.ok?

    render json: response
  end

  def center_place
    response = Google::Api.new.reverse_geocode(center_params[:location])
    return render json: response['results'][0] if response.ok?

    render json: response
  end

  private

  def nearby_params
    params.permit(%i[radius keyword location])
  end

  def center_params
    params.permit(:location)
  end
end
