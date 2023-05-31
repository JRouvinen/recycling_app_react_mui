
export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'recycling',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#0fab46', 100, '#0a7830', 750, '#053d19'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
  }
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'recycling',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'recycling',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#11da57 ',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};



