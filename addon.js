const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    id: "sawthub.example",
    version: "1.0.0",
    name: "Sawt Hub",
    description: "Simple Stremio add-on",
    types: ["movie"],
    catalogs: [
        { type: "movie", id: "sawt_catalog", name: "Sawt Movies" }
    ],
    resources: ["catalog", "stream"]
};

const builder = new addonBuilder(manifest);

// SAMPLE DATA
const movies = [
    {
        id: "test_movie_1",
        type: "movie",
        name: "Test Movie",
        poster: "https://via.placeholder.com/300x450",
        streams: [
            { url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" }
        ]
    }
];

// CATALOG HANDLER
builder.defineCatalogHandler(({ type }) => {
    if (type !== "movie") return { metas: [] };

    const metas = movies.map(m => ({
        id: m.id,
        type: m.type,
        name: m.name,
        poster: m.poster
    }));

    return { metas };
});

// STREAM HANDLER
builder.defineStreamHandler(({ id }) => {
    const movie = movies.find(m => m.id === id);
    return movie ? { streams: movie.streams } : { streams: [] };
});

module.exports = builder.getInterface();
