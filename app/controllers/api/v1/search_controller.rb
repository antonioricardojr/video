class Api::V1::SearchController < ApplicationController
  def posts
    posts_per_page = 2;
    # if application is using a different DB, it might need to use ILIKE instead LIKE
    @posts = Post.where('title LIKE ? OR body LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%").order(created_at: :desc)
    post_with_images = paginate_posts(@posts, posts_per_page)
    total_posts_count = @posts.count

    render json: {
      posts: post_with_images,
      total_count: total_posts_count,
      per_page: posts_per_page
    }
  end
end
