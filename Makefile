QUARTO_VERSION="1.5.45"

clean:
	rm -rd astro/src/content
	rm -rd astro/dist
	rm -rd astro/.astro
	rm -rd astro/.netlify

prepare-tarball-quarto:
	wget "https://github.com/quarto-dev/quarto-cli/releases/download/v$(QUARTO_VERSION)/quarto-$(QUARTO_VERSION)-linux-amd64.tar.gz"
	mkdir ~/opt
	tar -C ~/opt -xvzf quarto-$(QUARTO_VERSION)-linux-amd64.tar.gz
	mkdir ~/.local/bin
	ln -s ~/opt/quarto-$(QUARTO_VERSION)/bin/quarto ~/.local/bin/quarto
	~/.local/bin/quarto check

prepare-astro:
	cd astro
	npm install
	cd ..

pre-build-all: 
	~/.local/bin/quarto render

build:
	cd astro
	npm run build
	cd ..

dev:
	cd astro
	npm run dev
	cd ..