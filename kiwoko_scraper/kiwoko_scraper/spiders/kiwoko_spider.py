import scrapy


class KiwokoSpider(scrapy.Spider):
    name = "kiwoko_spider"
    allowed_domains = ["kiwoko.com"]
    start_urls = ["https://www.kiwoko.com/gatos/comida-para-gatos/"]

    def parse(self, response):
        productos = response.css("div.isk-product-card")

        for producto in productos:
            # Nombre
            marca = producto.css(
                "span.isk-product-card__headline-brand::text").get(default="").strip()
            descripcion = producto.css(
                "span.isk-product-card__headline::text").getall()
            descripcion = " ".join(t.strip() for t in descripcion if t.strip())
            nombre = f"{marca} {descripcion}".strip()

            url = producto.css(
                "a.isk-product-card__headline-link::attr(href)").get()
            url = response.urljoin(url)

            precio = producto.css(
                "div.isk-product-card__pum span[aria-hidden='true']::text").get(default="").strip()

            imagen = producto.css(
                "img.isk-product-card__image::attr(src)").get()

            yield {
                "nombre": nombre,
                "url": url,
                "precio": precio,
                "imagen": imagen,
            }
        #     next_page = response.css("a.pagination__next::attr(href)").get()
        # if next_page:
        #     yield response.follow(next_page, callback=self.parse)
