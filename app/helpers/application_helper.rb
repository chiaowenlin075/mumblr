module ApplicationHelper

  def show_errors(object)
    return if object.errors.full_messages.empty?
    html = ""
    object.errors.full_messages.each do |msg|
      html += "<li class='error-msg'>#{h(msg)}</li>"
    end

    html.html_safe
  end
end
