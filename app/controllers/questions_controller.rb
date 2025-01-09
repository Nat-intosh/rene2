class QuestionsController < ApplicationController
  before_action :set_question, only: %i[ show edit update destroy ]

  # GET /questions or /questions.json
  def index
    @questions = Question.all
  end

  # GET /questions/1 or /questions/1.json
  def show
  end

  # GET /questions/new
  def new
    @question = Question.new
  end

  # GET /questions/1/edit
  def edit
  end

  def new_question
      @question = Question.order('RANDOM()').first
      # Ajoute la peinture de la question et 3 autres aléatoires
      @paintings = Painting.where.not(id: @question.painting_id).order('RANDOM()').limit(3).to_a
      @paintings << @question.painting
      @paintings.shuffle! # Mélange les peintures pour que la bonne réponse ne soit pas toujours au même endroit
  end

  def submit_answer
    @question = Question.find(params[:id])
    @selected_painting = Painting.find(params[:painting_id])

    if @selected_painting == @question.painting
      @result_message = "Bravo ! Malinx, le lynx. On continue ?"
      @success = true
    else
      @result_message = "Ah, mince... Mauvaise réponse..."
      @success = false
    end

    render :result
  end

  # POST /questions or /questions.json
  def create
    @question = Question.new(question_params)

    respond_to do |format|
      if @question.save
        format.html { redirect_to @question, notice: "Question was successfully created." }
        format.json { render :show, status: :created, location: @question }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /questions/1 or /questions/1.json
  def update
    respond_to do |format|
      if @question.update(question_params)
        format.html { redirect_to @question, notice: "Question was successfully updated." }
        format.json { render :show, status: :ok, location: @question }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /questions/1 or /questions/1.json
  def destroy
    @question.destroy!

    respond_to do |format|
      format.html { redirect_to questions_path, status: :see_other, notice: "Question was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def question_params
      params.expect(question: [ :painting_id, :emoji1_id, :emoji2_id, :emoji3_id ])
    end

end
