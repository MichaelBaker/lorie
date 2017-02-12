require 'sinatra'

class Application < Sinatra::Base
  get '/' do
    "This is not a string."
  end
end
