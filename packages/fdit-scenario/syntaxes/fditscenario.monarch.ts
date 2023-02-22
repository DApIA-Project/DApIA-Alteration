// Monarch syntax highlighting for the fditscenario language.
export default {
    keywords: [
        'ALERT','all_planes','ALT_DURATION','alter','alter_speed','ALTITUDE','and','assert','at','CALLSIGN','create','cut','delay','EAST_WEST_VELOCITY','EMERGENCY','filter','for','from','from_recording','groovy_file','GROUNDSPEED','hide','ICAO','LATITUDE','let','LONGITUDE','NORTH_SOUTH_VELOCITY','NUMBER','plane','REC_DURATION','REC_NBR_AIRCRAFT','replay','rotate','satisfying','saturate','seconds','SPI','SQUAWK','TRACK','triggered_by','until','with_altitude','with_angle','with_delay','with_frequency','with_values','with_waypoints'
    ],
    operators: [
        '--=','-=',',','*','*=','++=','+=','<<','=','>>'
    ],
    symbols:  /--=|-=|,|\(|\)|\[|\]|\{|\}|\*|\*=|\+\+=|\+=|<<|=|>>/,

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
