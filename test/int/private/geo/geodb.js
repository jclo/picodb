// ESLint declarations:
/* global */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = {
  jfk: {
    name: 'John F Kennedy Intl',
    type: 'International',
    code: 'JFK',
    loc: {
      type: 'Point',
      coordinates: [-73.778889, 40.639722],
    },
  },
  lax: {
    name: 'Los Angeles International Airport',
    type: 'International',
    code: 'LAX',
    loc: {
      type: 'Point',
      coordinates: [-118.412581, 33.944117],
    },
  },
  sfo: {
    name: 'San Francisco International Airport',
    type: 'International',
    code: 'SFO',
    loc: {
      type: 'Point',
      coordinates: [-122.382674, 37.621642],
    },
  },
  san: {
    name: 'San Diego International Airport',
    type: 'International',
    code: 'SAN',
    loc: {
      type: 'Point',
      coordinates: [-117.189724, 32.733917],
    },
  },
  phx: {
    name: 'Sky Harbor International Airport',
    type: 'International',
    code: 'PHX',
    loc: {
      type: 'Point',
      coordinates: [-112.011559, 33.434539],
    },
  },
  cai: {
    name: 'California Airports',
    type: 'International',
    code: '-',
    loc: {
      type: 'MultiPoint',
      coordinates: [
        [-118.412581, 33.944117],
        [-122.382674, 37.621642],
        [-117.189724, 32.733917],
      ],
    },
  },
  cpai: {
    name: 'California and Arizona Airports',
    type: 'International',
    code: '-',
    loc: {
      type: 'MultiPoint',
      coordinates: [
        [-118.412581, 33.944117],
        [-122.382674, 37.621642],
        [-117.189724, 32.733917],
        [-112.011559, 33.434539],
      ],
    },
  },

  // Boxes surrounding airports:
  sfo_alone: [
    [-122.416865, 37.569838],
    [-122.166926, 37.969322],
  ],
  lax_sfo_san_phx: [
    [-123.422810, 38.859617],
    [-109.675695, 31.867779],
  ],
  lax_phx: [
    [-119.158175, 34.352516],
    [-111.626853, 33.105325],
  ],
  sfo_lax: [
    [-123.379009, 38.285678],
    [-116.984801, 33.550482],
  ],

  // Polygons surrounding airports:
  p_sfo: [
    [-122.791995, 37.735612],
    [-122.407454, 38.069684],
    [-122.290926, 37.603405],
  ],
  p_sfo_san: [
    [-123.464417, 38.010944],
    [-121.040755, 38.161299],
    [-118.820060, 33.169072],
    [-116.229249, 33.059071],
    [-117.148569, 31.351899],
  ],

  cia: {
    name: 'LineString inside California',
    loc: {
      type: 'LineString',
      coordinates: [
        [-117.844126, 35.474386],
        [-115.680319, 34.163808],
      ],
    },
  },

  ciaplus: {
    name: 'Multiple LineString inside California',
    loc: {
      type: 'MultiLineString',
      coordinates: [
        [
          [-117.844126, 35.474386],
          [-115.680319, 34.163808],
        ],
        [
          [-120.461033, 38.304856],
          [-120.233862, 37.408060],
          [-119.268383, 34.582782],
        ],
        [
          [-116.429298, 34.506578],
          [-116.245495, 33.398331],
          [-115.191894, 33.264049],
          [-114.643132, 32.804465],
        ],
      ],
    },
  },

  c2a: {
    name: 'LineString from California to Arizona',
    loc: {
      type: 'LineString',
      coordinates: [
        [-117.844126, 35.474386],
        [-115.680319, 34.163808],
        [-113.054724, 33.241810],
      ],
    },
  },

  c2aplus: {
    name: 'Multiple LineString from California to Arizona',
    loc: {
      type: 'LineString',
      coordinates: [
        [
          [-117.844126, 35.474386],
          [-115.680319, 34.163808],
          [-113.054724, 33.241810],
        ],
        [
          [-120.742173, 37.608024],
          [-119.291514, 35.895264],
          [-116.252764, 34.308765],
          [-114.015695, 33.929515],
        ],
        [
          [-110.191751, 36.313820],
          [-113.584705, 33.992627],
          [-116.084776, 33.204302],
        ],
      ],
    },
  },

  pinc: {
    name: 'Polygon inside California',
    loc: {
      type: 'Polygon',
      coordinates: [
        [
          [-121.145223, 36.328949],
          [-118.701559, 37.589239],
          [-116.035744, 33.060344],
          [-121.145223, 36.328949],
        ],
      ],
    },
  },

  pca: {
    name: 'Polygon straddling California and Arizona',
    loc: {
      type: 'Polygon',
      coordinates: [
        [
          [-123.611111, 39.738829],
          [-121.249398, 40.902991],
          [-117.869706, 35.879994],
          [-113.207358, 34.465468],
          [-116.566692, 33.333281],
          [-123.611111, 39.738829],
        ],
      ],
    },
  },

  pina: {
    name: 'Polygon inside Arizona',
    loc: {
      type: 'Polygon',
      coordinates: [
        [
          [-113.560760, 32.839403],
          [-109.928685, 31.845991],
          [-109.928685, 36.176015],
          [-113.613020, 34.900303],
          [-113.560760, 32.839403],
        ],
      ],
    },
  },
};
