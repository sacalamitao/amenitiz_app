# config/initializers/react_rails.rb
Rails.application.config.react.variant = :development # or :production for production
Rails.application.config.react.addons = true
Rails.application.config.react.jsx_transform_options = {
  optional: ['es7']
}