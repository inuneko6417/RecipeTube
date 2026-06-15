class Api::V1::RecipesController < ApplicationController
  def index
    @recipes = Recipe.all.order(created_at: :desc)
    render json: @recipes.as_json(include: :ingredients)
  end

  def show
    @recipe = Recipe.find(params[:id])
    render json: @recipe.as_json(include: :ingredients)
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Recipe not found" }, status: :not_found
  end

  def create
    @recipe = Recipe.new(recipe_params)

    if @recipe.save
      render json: @recipe.as_json(include: :ingredients), status: :created
    else
      render json: { errors: @recipe.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def preview
    url = params[:youtube_url]
    return render json: { error: "youtube_url is required" }, status: :bad_request if url.blank?

    extractor = ::YoutubeRecipeExtractor.new(url)
    begin
      data = extractor.preview
      if data
        render json: data
      else
        render json: { error: "Failed to extract recipe preview." }, status: :unprocessable_entity
      end
    rescue => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  def youtube_api
    url = params[:youtube_url]
    return render json: { error: "youtube_url is required" }, status: :bad_request if url.blank?

    extractor = ::YoutubeRecipeExtractor.new(url)
    begin
      recipe = extractor.extract_and_save!
      if recipe
        render json: recipe.as_json(include: :ingredients)
      else
        render json: { error: "Failed to extract recipe. Please check Rails logs for details." }, status: :unprocessable_entity
      end
    rescue => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(
      :title, :video_id, :youtube_url, :thumbnail_url, :steps,
      ingredients_attributes: [:name, :quantity]
    )
  end

  def extract_video_id(url)
    uri = URI.parse(url)
    CGI.parse(uri.query)["v"]&.first
  rescue
    nil
  end
end
