SRC_DIR = src
DIST_DIR = ./dist

DATE = $(shell git log -1 --pretty=format:%ad)
VERSION = $(shell echo "v$$(cat package.json | grep '"version"' | sed 's/[^0-9\.\-]//g')")

BASE_FILES = ${SRC_DIR}/jribbble.js
JB = ${DIST_DIR}/jribbble.js
JB_MIN = ${DIST_DIR}/jribbble.min.js
UGLIFIER = $(shell uglifyjs -o ${JB_MIN} ${JB} -c -m --comments)

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
		sed "s/@VERSION/${VERSION}/" > ${JB};

min: ${JB_MIN}

${JB_MIN}: ${JB}
	@@echo "Minifying Jribbble" ${JB_MIN}
	${UGLIFIER}

test:
	node-qunit-phantomjs tests/index.html --verbose

release:
	git tag -a $(VERSION) -m "Releasing version: $(VERSION)"
	git push origin $(VERSION)
	npm publish

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}
