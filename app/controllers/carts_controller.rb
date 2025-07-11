class CartsController < ApplicationController
  def show
    @cart = Cart.new
    session[:cart_items]&.each { |code| @cart.add_item(code) }
    @products = Product.all
  end

  def add
    session[:cart_items] ||= []
    session[:cart_items] << params[:product_code]
    redirect_to cart_path, notice: 'Item added to cart'
  end
end