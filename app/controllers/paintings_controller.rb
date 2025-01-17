class PaintingsController < ApplicationController
  before_action :set_painting, only: %i[ show edit update destroy ]

  def index
    @paintings = Painting.all
  end

  def show
  end

  def new
    @painting = Painting.new
  end

  def edit
  end

  def create
    @painting = Painting.new(painting_params)

    respond_to do |format|
      if @painting.save
        format.html { redirect_to @painting, notice: "Painting was successfully created." }
        format.json { render :show, status: :created, location: @painting }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @painting.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @painting.update(painting_params)
        format.html { redirect_to @painting, notice: "Painting was successfully updated." }
        format.json { render :show, status: :ok, location: @painting }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @painting.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @painting.destroy!

    respond_to do |format|
      format.html { redirect_to paintings_path, status: :see_other, notice: "Painting was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

    def set_painting
      @painting = Painting.find(params.expect(:id))
    end

    def painting_params
      params.expect(painting: [ :name, :author, :image, :date, :rebus ])
    end

end
