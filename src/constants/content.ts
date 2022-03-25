export const STATIC_CONTENT = {
  MOT_DU_MARDI: {
    key: 'MOT_DU_MARDI',
    title: 'Le Mot du Mardi',
    type: 'channel',
    channelIds: [334412],
    style: 'card',
  },
  A_LA_UNE: {
    key: 'A_LA_UNE',
    title: 'Actus Métier',
    type: 'channel',
    channelIds: [334414, 334418, 334419, 334422, 334426, 334431],
    style: 'card',
  },
  NEWS: {
    key: 'NEWS',
    title: 'Actus Air France',
    type: 'channel',
    channelIds: [334443, 334444, 334446, 334448, 334449, 334450],
    style: 'horizontal',
  },
  MEDIA: {
    key: 'MEDIA',
    title: 'Médias Récents',
  },
  LATEST: {
    key: 'LATEST',
    title: 'Contenus Récents',
    tabIds: [41530],
    type: 'tab',
    style: 'latest',
  },
} as const;
