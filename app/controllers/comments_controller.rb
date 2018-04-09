class CommentsController < ApplicationController
  def create
    @gist = Content.find(params[:content_id])
    @comment = @gist.comments.new(comment_params.merge(user: current_user))
    @comment.save
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
