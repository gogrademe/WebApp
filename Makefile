NAME=gogrademeweb
VERSION=$(shell cat VERSION)

build:
	mkdir -p build
	docker build -t $(NAME):$(VERSION) .

# push: build/container
# 	docker push gogrademe/webapp

circleci:
	rm ~/.gitconfig
ifneq ($(CIRCLE_BRANCH), release)
	echo build-$$CIRCLE_BUILD_NUM > VERSION
endif
