// Monarch syntax highlighting for the fditscenario language.
export default {
    keywords: [
        'ALERT','ALT_DURATION','ALTITUDE','CALLSIGN','EAST_WEST_VELOCITY','EMERGENCY','GROUNDSPEED','ICAO','LATITUDE','LONGITUDE','NORTH_SOUTH_VELOCITY','NUMBER','REC_DURATION','REC_NBR_AIRCRAFT','SPI','SQUAWK','TRACK'
    ],
    operators: [

    ],
    symbols:  //,

    tokenizer: {
        initial: [
            { include: '@whitespace' },
            { regex: /@symbols/, action: { cases: { '@operators': {"token":"operator"}, '@default': {"token":""} }} },
        ],
        whitespace: [
            { regex: /\s+/, action: {"token":"white"} },
        ],
        comment: [
        ],
    }
};
