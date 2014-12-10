#!/usr/bin/env ruby

# file_hunter Version 1.1

# Get the directory contents of a server where you have ssh access.
# Make HTTP requests relative to web root to check for accessible files.
# Works only with Unix based servers. (Someone wanna to write a WIN version???)
# Manually review the results for files that may contain sensitive info.

require 'typhoeus'

host = "192.168.1.153" # dojo vm, for instance
ssh_username = "dojo"
server_base_path = "/var/www/dvwa" # absolute path to directory to pull from
web_base_path = "/dvwa" # use empty for web root; path is relative to web root
results = []
urls = []

# get the directory contents from the server_base_path
directory_contents = `ssh #{ssh_username}@#{host} "cd #{server_base_path} && find ."`.split("\n").drop(1)

# clean the directory_contents paths
directory_contents.collect {|x| x.gsub!(/^\./, "")}

# create requests for each path
directory_contents.each do |r|
	url = host + web_base_path + r
	puts "Getting: #{url}"
	response = Typhoeus.get(url)
	results.push "#{response.code}\t" + "#{response.headers["Content-Length"]}\t" + "#{r}\t" + "#{response.headers[:location]}\t" + "#{url}"
	urls.push url
	
	# throttle requests if necessary
	#sleep 0.2
end

# create a tab delimited file that can be imported into excel for manual analysis
File.open("final_results.txt", "w") do |f|
  f.puts "Results for Target:\t"
  f.puts "#{host}#{web_base_path}\t"
  f.puts ""
  f.puts "Response Code\t" + "Content-Length\t" + "Relative Path\t" + "Redirect Location\t" + "Full URL"
  f.puts results
  f.close
end

# create a file of just the URLs to use with the File Hunter Browser
File.open("urls.txt", "w") do |f|
  f.puts urls
  f.close
end