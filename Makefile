clean:
	rm -rd astro/src/content
	rm -rd astro/dist
	rm -rd astro/.astro
	rm -rd astro/.netlify

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