module DateFormatable
  extend ActiveSupport::Concern

  def created_at
    super.strftime("%Y %B %d")
  end

  def updated_at
    super.strftime("%Y %B %d")
  end
end
