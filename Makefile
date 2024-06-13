QUARTO_VERSION="1.5.45"

clean:
	rm -rd astro/src/content
	rm -rd astro/dist
	rm -rd astro/.astro
	rm -rd astro/.netlify

prepare-tarball-quarto:
	wget "https://github.com/quarto-dev/quarto-cli/releases/download/v1.5.45/quarto-1.5.45-linux-amd64.tar.gz"
	mkdir ~/opt
	tar -C ~/opt -xvzf quarto-1.5.45-linux-amd64.tar.gz
	mkdir ~/.local/bin
	ln -s ~/opt/quarto-1.5.45/bin/quarto ~/.local/bin/quarto
	( echo ""; echo 'export PATH=$PATH:~/.local/bin\n' ; echo "" ) >> ~/.profile
	source ~/.profile
	quarto check

prepare-astro:
	cd astro
	npm install
	cd ..

pre-build-all: 
	quarto render

build:
	cd astro
	npm run build
	cd ..

dev:
	cd astro
	npm run dev
	cd ..