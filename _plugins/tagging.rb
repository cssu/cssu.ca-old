require 'jekyll/tagging'

module Jekyll

  ##
  # Custom tag to generate a tag cloud for the given post category
  # e.g. {% category_tag_cloud events %} will generate a tag cloud for
  #      the 'events' category of posts
  class CategoryTagCloud < Liquid::Tag

    include Jekyll::Filters

    def initialize(tag_name, category, tokens)
      super
      @category = category.strip
    end

    def render(context)
      site = context.registers[:site]
      category_posts = site.categories[@category]

      active_tag_data.select { |tag, _|
        category_posts.any? { |post| post.data['tags'].include? tag }
      }.map { |tag, set|
        tag_link(tag, tag_url(tag), :class => "set-#{set}")
      }.join(' ')
    end

  end
end

Liquid::Template.register_tag('category_tag_cloud', Jekyll::CategoryTagCloud)
