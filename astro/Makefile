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
	mkdir -p ~/.local/bin
	ln -s ~/opt/quarto-$(QUARTO_VERSION)/bin/quarto ~/.local/bin/quarto
	~/.local/bin/quarto check

prepare-astro:
	npm install

npm-fix: prepare-astro
	npm uninstall @netlify/functions
	npm install @netlify/functions@3.0.4

pre-build-all-local-quarto: prepare-tarball-quarto
	~/.local/bin/quarto render ../

pre-build-all-system-quarto:
	quarto render ../

build:
	npm run check-build

dev:
	npm run dev

netlify: npm-fix build