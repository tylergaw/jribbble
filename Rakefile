require 'find'

## Rake file for building jquery.jribbble.js
prefix   = File.dirname(__FILE__)
src_dir  = File.join(prefix, 'src')
dist_dir = File.join(prefix, 'dist')

filename      = 'jquery.jribbble.js'
filename_ugly = 'jquery.jribbble.ugly.js'

# This is not really necessary, but it's working so we'll leave it
base_files = %w{
  jribbble
}.map { |js| File.join(src_dir, "#{js}.js")}

# Distribution files
jribbble      = File.join(dist_dir, filename)
jribbble_ugly = File.join(dist_dir, filename_ugly)

# Tasks
task :default => "all"

desc "Builds Jribbble; Makes an ugliy copy"
task :all => [:clean, jribbble, jribbble_ugly] do
  puts "Jribbble build complete"
end

desc "Remove any files from the dist directory before building"
task :clean do
  puts "Cleaning distribution directory"
  Find.find(dist_dir) do |f|    
    # If this is not a directory, delete it
    if(!File.directory?(f))
      rm(f, :verbose => false)
    end
    
  end
end

# File and Directory Dependencies
directory dist_dir

# Create the uncompressed, single file of all the base library files
file jribbble => [dist_dir, base_files].flatten do
  puts "Building #{filename}..."

  File.open(jribbble, 'w') do |f|
    f.write cat(base_files)
  end
end

# Create a compressed version of the library using uglifyJS
# TODO: Don't hard code the pathnames
file jribbble_ugly => jribbble do
  puts "Building #{filename_ugly}..."
  system "uglifyjs -o dist/#{filename_ugly} dist/#{filename}"
end

def cat(files)
  files.map do |file|
    File.read(file)
  end.join('')
end