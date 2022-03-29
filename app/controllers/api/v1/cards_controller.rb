class Api::V1::CardsController < ApplicationController
    before_action :set_cards, only: [:show, :update, :destroy]
    skip_before_action :verify_authenticity_token

    def index
        @cards = Card.all
        render json: {cards: @cards}, include: [:column], except: [:column_id]
    end

    def show
        render json: { card:  @card}, status: 200
    end

    def create
        card = Card.new(cards_params)

        if card.save
            render json: { card: card }, status: 201
        else
            render json: card.errors, status: 400
        end
    end

    def update
        if @card.update(cards_params)
            render json: @card, include: [:column], except: [:column_id], status: :created, location: @card
        else
            render json: @card.errors, status: 400
        end
    end

    def destroy
        @card.destroy
        render json: { 'return': 'ok' }, status: 200
    end

    private

    def set_cards
        @card = Card.find(params[:id])
    end

    def cards_params
        params.permit(:title, :column_id)
    end
end
