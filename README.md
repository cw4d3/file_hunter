## file_hunter

### Overview
This is a little script to help some of the manual monotony when auditing a web application for information disclosure. When performing various types of security testing, we want to ensure no files with potentially sensitive information are accessible from the browser. Manually completing this process is tedious. This script will get the directory contents for a given directory (recursively) on a (Unix-based) server where you have SSH access. Next it will make requests to each path, and save the results to a txt file containing the response code, content-length, relative path, requested URL, and redirection location (where applicable). 

Two files are created upon completion: 
1. `final_results.txt`, which is a tab delimited file that can be imported to Excel to view and sort the results
2. `urls.txt`, which contains each URL that was requested

The urls.txt file can be imported using the results_browser. This tool will load the URLs and let you step through each result, where you can view the response in an iframe. 

**Disclaimer:** This little suite was hacked together really quickly, and furthermore, I have pretty horrible JavaScript skills. There's lots of (bugs! and) room for improvement/refactoring, and that may come some other day! Until then, be gentle. :)

### Usage
1. `gem install typhoeus`
2. Make necessary changes to `file_hunter.rb` and include the proper paths, host, etc.
3. `ruby file_hunter.rb`
4. Import `final_results.txt` into Excel, or load up the `urls.txt` file into the results browser (open index.html in your browser)