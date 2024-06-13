QUARTO_VERSION="1.5.45"

clean:
	rm -rd src/content
	rm -rd dist
	rm -rd .astro
	rm -rd .netlify

prepare-tarball-quarto:
	wget "https://github.com/quarto-dev/quarto-cli/releases/download/v$(QUARTO_VERSION)/quarto-$(QUARTO_VERSION)-linux-amd64.tar.gz"
	mkdir ~/opt
	tar -C ~/opt -xvzf quarto-$(QUARTO_VERSION)-linux-amd64.tar.gz
	mkdir ~/.local/bin
	ln -s ~/opt/quarto-$(QUARTO_VERSION)/bin/quarto ~/.local/bin/quarto
	~/.local/bin/quarto check

prepare-astro:
	npm install

pre-build-all-local-quarto: prepare-tarball-quarto
	~/.local/bin/quarto render ../
	echo "render done" > .prebulid-lock

pre-build-all-system-quarto:
	quarto render ../
	echo "render done" > .prebulid-lock

build: .prebuild-lock
	npm run build

dev: ./prebuild-lock
	npm run dev

netlify: prepare-tarball-quarto prepare-astro pre-build-all-local-quarto build