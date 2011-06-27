SRC_DIR = src
TEST_DIR = test

PREFIX = .
DIST_DIR = ${PREFIX}/dist

JB_VER = $(shell cat version.txt)

JS_ENGINE ?= `which node nodejs`
UGLIFIER = $(shell uglifyjs -o ${JB_MIN} ${JB})

BASE_FILES = ${SRC_DIR}/jribbble.js

JB = ${DIST_DIR}/jquery.jribbble-${JB_VER}.js
JB_MIN = ${DIST_DIR}/jquery.jribbble-${JB_VER}.ugly.js

VER = sed "s/@VERSION/${JB_VER}/"

DATE=$(shell git log -1 --pretty=format:%ad)

all: core

core: clean jribbble min
	@@echo "Build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

jribbble: ${JB}

${JB}: ${BASE_FILES} | ${DIST_DIR}
	@@echo "Building" ${JB}

	@@cat ${BASE_FILES} | \
		sed 's/@DATE/'"${DATE}"'/' | \
		${VER} > ${JB};

min: ${JB_MIN}

${JB_MIN}: ${JB}
	@@echo "Uglifying Jribbble" ${JB_MIN}
	${UGLIFIER}

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}