class CommentsController < ApplicationController
  before_action :set_comment, only: [:destroy, :edit]

  def create
    @gist = Content.find(params[:content_id])
    @comment = @gist.comments.new(comment_params.merge(user: current_user))
    @comment.save
    # render json:  @comment

  end

  def edit
  end

  def update
  end

  def destroy
    @comment.destroy
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body, :gist_row)
  end
end
