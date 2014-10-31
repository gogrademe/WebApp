NAME=GoGradeMeWeb
HARDWARE=$(shell uname -m)
VERSION=0.1.0

build/$(NAME):
	gulp build --release

build/container: build/$(NAME)
	docker build -t gogrademe/webapp .
	touch build/container

push: build/container
	docker push gogrademe/webapp
# release:
# 	rm -rf release
# 	mkdir release
# 	GOOS=linux go build -o release/$(NAME)
# 	cd release && tar -zcf $(NAME)_$(VERSION)_linux_$(HARDWARE).tgz $(NAME)
# 	GOOS=darwin go build -o release/$(NAME)
# 	cd release && tar -zcf $(NAME)_$(VERSION)_darwin_$(HARDWARE).tgz $(NAME)
# 	rm release/$(NAME)
# 	echo "$(VERSION)" > release/version
# 	echo "gogrademe/$(NAME)" > release/repo
# 	gh-release

.PHONY: push
