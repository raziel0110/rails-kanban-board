class Api::V1::ColumnsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_columns, only: [:show, :update, :destroy]
    
    def index
        @columns = Column.order(:id)

        render json: @columns
    end

    def create
        column = Column.new(columns_params)

        if column.save
            render json: column, status: 200
        else
            render json: column.errors, status: unprocessable_entity
        end
    end

    def destroy
        @column.destroy

        render json: {'result': 'ok'}, status: 200
    end

    private

    def columns_params
        params.permit(:label, :value)
    end

    def set_columns
        @column = Column.find(params[:id])
    end
end
