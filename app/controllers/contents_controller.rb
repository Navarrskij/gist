class ContentsController < ApplicationController
  before_action :set_gist, only: [:show, :destroy, :edit]

  def index
    @gists = Content.all.order(created_at: :desc)
  end

  def create
    @gist = Content.new(gist_params.merge(user: current_user))
    @gist.save
    redirect_to @gist
  end

  def new
    @content = Content.new
  end

  def show

  end

  def edit

  end

  def destroy
    @gist.destroy
    redirect_to action: :index
  end

  private

  def set_gist
    @gist = Content.includes(:comments).find(params[:id])
  end


  def gist_params
    params.require(:content).permit(:title, :body)
  end

end
