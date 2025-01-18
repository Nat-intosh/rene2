class QuestionsController < ApplicationController
  before_action :set_question, only: %i[show edit update destroy], except: [:finish]

  def index
    @questions = Question.all
  end

  def show
  end

  def new
    @question = Question.new
  end

  def edit
  end

  def new_question
    asked_questions = session[:asked_questions] || []

    @question = Question.where.not(id: asked_questions).order('RANDOM()').first

    if @question.nil?
      session[:asked_questions] = []
      @question = Question.order('RANDOM()').first
    end

    session[:asked_questions] ||= []
    session[:asked_questions] << @question.id

    @paintings = Painting.where.not(id: @question.painting_id).order('RANDOM()').limit(3).to_a
    @paintings << @question.painting
    @paintings.shuffle!
  end

  def submit_answer
    @question = Question.find(params[:id])
    @selected_painting = Painting.find(params[:selected_painting])

    if @selected_painting == @question.painting
      session[:correct_answers] = session[:correct_answers].to_i + 1
      @result_message = "Bravo ! Malinx, le lynx. On continue ?"
      @success = true
    else
      session[:correct_answers] = 0
      @result_message = "Ah, mince... Pas très futé, le farfadet. Mauvaise réponse..."
      @success = false
    end

    render :result
  end

  def contribute
    contributions_count = session[:contributions_count].to_i || 0

    if contributions_count >= 3
      session[:contributions_count] = 0
      redirect_to home_finish_path
      return
    end

    @painting = Painting.order('RANDOM()').first
    @emojis = Emoji.all
    @selected_emojis = []
  end

  def submit_contribution
    painting = Painting.find(params[:painting_id])
    emoji1 = Emoji.find(params[:emoji1_id])
    emoji2 = Emoji.find(params[:emoji2_id])
    emoji3 = Emoji.find(params[:emoji3_id])

    session[:contributions_count] = (session[:contributions_count] || 0) + 1
    contributions_count = session[:contributions_count].to_i

      Question.create(
        painting: painting,
        emoji1: emoji1,
        emoji2: emoji2,
        emoji3: emoji3
      )

    if contributions_count >= 1
      contributions_count = 0
      render json: { status: 'finished' }
    else
      render json: { status: 'success' }
    end
  end

  def reset_contributions
    session[:contributions_count] = 0
    render json: { status: 'success' }
  end

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

  def finish
    session[:asked_questions] = []
    session[:correct_answers] = 0
  end

  def destroy
    @question.destroy!

    respond_to do |format|
      format.html { redirect_to questions_path, status: :see_other, notice: "Question was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def set_question
    @question = Question.find(params[:id])
  end

  def question_params
    params.require(:question).permit(:painting_id, :emoji1_id, :emoji2_id, :emoji3_id)
  end
end
