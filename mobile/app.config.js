module.exports = ({ config }) => {
  return {
    ...config,
    plugins: [
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsImpl: "mapbox",
          RNMapboxMapsDownloadToken: process.env.EXPO_PUBLIC_MAPBOX_TOKEN,
        },
      ],
    ],
  };
};
