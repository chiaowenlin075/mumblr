module DateFormatable
  extend ActiveSupport::Concern

  def created_at
    super.strftime("%Y %B %d %a %H:%M")
  end

  def updated_at
    super.strftime("%Y %B %d %a %H:%M")
  end
end
