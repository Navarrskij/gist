class ContentsController < ApplicationController
  before_action :set_gist, only: [:show, :destroy, :edit]

  def index
    @gists = Content.content_public.or(Content.content_private(current_user)).order(created_at: :desc)
  end

  def create
    @gist = Content.new(gist_params.merge(user: current_user))
    if @gist.save
      @gist.reload
      flash[:success] = "Content successfully created"
      redirect_to content_path(id: @gist.uuid)
    else
      render :new
    end
  end

  def new
    @gist = Content.new
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
    @gist = Content.includes(:comments).find_by(uuid: params[:id])
  end


  def gist_params
    params.require(:content).permit(:title, :body, :mode, :is_secret)
  end

end
