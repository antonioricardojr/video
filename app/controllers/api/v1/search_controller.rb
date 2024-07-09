class Api::V1::SearchController < ApplicationController
  def posts
    # if application is using a different DB, it might need to use ILIKE instead LIKE
    @posts = Post.where('title LIKE ? OR body LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%").order(created_at: :desc)

    post_with_images = @posts.map do |post|
      if post.image.attached?
        post.as_json.merge(image_url: url_for(post.image))
      else
        post.as_json.merge(image_url: nil)
      end
    end

    render json: post_with_images
  end
end
