class RootController < ApplicationController
  before_action :require_login
  def root
  end
end
