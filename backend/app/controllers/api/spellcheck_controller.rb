class Api::SpellcheckController < ApplicationController
  def hiragana_check
    # input_text = params[:text]
    render json: {message: "Hello this is hiragana check"}
    # if valid_hiragana?(input_text)
    #   render json: {message: "Valid Hiragana", status:ok}
    # else
    #   render json: { message: "Invalid Hiragana", status: :unprocessable_entity }
    # end
  end

  def katakana_check
    input_text = params[:text]

    if valid_hiragana?(input_text)
      render json: {message: "Valid Hiragana", status:ok}
    else
      render json: { message: "Invalid Hiragana", status: :unprocessable_entity }
    end
  end
end
