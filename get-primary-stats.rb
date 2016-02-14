require 'nokogiri'
require 'open-uri'
require 'json'

page = Nokogiri::HTML(open('http://voteforbernie.org/'))
states = page.css(".state")

messages = {}

states.each do |state|
  state_data = {}

  state_name = state.css(".state-title").text.strip

  state_type_match = state.css(".state-content").text.match(state_name + ' .* has (.*?) (primaries|caucuses)')
  state_data["openness"] = state_type_match[1]
  state_data["type"] = state_type_match[2]

  state_resources = state.css(".resources div")
  state_data["date"] = state_resources[0].text.match('(Primary|Caucus) On(.*)')[2]
  if !state_resources[1].nil?
    state_data["registrationDeadline"] = state_resources[1].text.match('Register By(.*)')[1]
  else
    state_data["registrationDeadline"] = nil
  end

  state_data["onlineAvailable"] = state.css(".extra").text.include? "Online Registration Available!"

  messages[state_name] = state_data
end

File.open("primary_stats.json", 'w') do |file| 
  file.write(messages.to_json)
end