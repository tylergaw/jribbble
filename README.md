# Jribbble

A jQuery plugin to fetch data from the [Dribbble API](http://dribbble.com/api)

Check out the demo site [here](http://tylergaw.com/lab/jribbble)

## Building

I use a Makefile that is pretty much jQuery's Makefile. I've just removed some uneeded
stuff and move things around to fit Jribbble. The make file just adds the version number and
date to the output files. It also creates the Ugly version of Jribbble using [UglifyJS](https://github.com/mishoo/UglifyJS)

NodeJS is required to build an Ugly version of Jribbble.

To build run `make`