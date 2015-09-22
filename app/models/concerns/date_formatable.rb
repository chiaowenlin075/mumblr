module DateFormatable
  extend ActiveSupport::Concern

  def created_at
    super.strftime("%Y %B %d %a")
  end

  def updated_at
    super.strftime("%Y %B %d %a")
  end
end
