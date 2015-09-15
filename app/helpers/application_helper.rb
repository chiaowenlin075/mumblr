module ApplicationHelper

  def show_errors(object)
    return if object.errors.full_messages.empty?
    html = "<ul>"
    object.errors.full_messages.each do |msg|
      html += "<li>#{h(msg)}</li>"
    end
    html += "</ul>"

    html.html_safe
  end
end
