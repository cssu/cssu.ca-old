module ExcludeExpired
  class Generator < Jekyll::Generator

    def generate(site)

      # Delete posts if their `expiry_date` in their frontmatter is today or earlier
      site.posts.delete_if do |post|
        expiry_date = post.data['expiry_date']
        expiry_date <= Date.today if expiry_date
      end

    end

  end
end
