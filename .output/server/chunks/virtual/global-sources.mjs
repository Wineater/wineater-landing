const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/blog",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/blog"
                    },
                    {
                        "hreflang": "fr",
                        "href": "/fr/blog"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/blog"
                    }
                ]
            },
            {
                "loc": "/fr/blog",
                "_sitemap": "fr",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/blog"
                    },
                    {
                        "hreflang": "fr",
                        "href": "/fr/blog"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/blog"
                    }
                ]
            },
            {
                "loc": "/faq",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/faq"
                    },
                    {
                        "hreflang": "fr",
                        "href": "/fr/faq"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/faq"
                    }
                ]
            },
            {
                "loc": "/fr/faq",
                "_sitemap": "fr",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/faq"
                    },
                    {
                        "hreflang": "fr",
                        "href": "/fr/faq"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/faq"
                    }
                ]
            },
            {
                "loc": "/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/"
                    },
                    {
                        "hreflang": "fr",
                        "href": "/fr"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/fr",
                "_sitemap": "fr",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/"
                    },
                    {
                        "hreflang": "fr",
                        "href": "/fr"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/playground",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/playground"
                    },
                    {
                        "hreflang": "fr",
                        "href": "/fr/playground"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/playground"
                    }
                ]
            },
            {
                "loc": "/fr/playground",
                "_sitemap": "fr",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/playground"
                    },
                    {
                        "hreflang": "fr",
                        "href": "/fr/playground"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/playground"
                    }
                ]
            },
            {
                "loc": "/sitemap.xml",
                "_sitemap": "en"
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
