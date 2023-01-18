grammar AttackScenarioGrammar


entry ASTScenario
: declarations+=ASTDeclaration* instructions+=ASTInstruction+
;

ASTList
: ASTStringList
    | ASTOffsetList
;

ASTStringList
: T_OPEN_BRACE items+=T_STRING_LITERAL (T_COMMA items+=T_STRING_LITERAL)* T_CLOSE_BRACE
;

ASTOffsetList
: T_OPEN_BRACE items+=ASTNumberOffset (T_COMMA items+=ASTNumberOffset)* T_CLOSE_BRACE
;

ASTRange
: ASTIntegerRange |
    ASTDoubleRange
;
ASTIntegerRange
: T_OPEN_SBRACE start=T_INTEGER_LITERAL T_COMMA end=T_INTEGER_LITERAL T_CLOSE_SBRACE 
;
ASTDoubleRange
:  T_OPEN_SBRACE start=T_DOUBLE_LITERAL T_COMMA end=T_DOUBLE_LITERAL T_CLOSE_SBRACE
;

ASTDeclaration
: (ASTListDeclaration  | ASTRangeDeclaration) T_COMMA
;

ASTListDeclaration
: T_LET constant=T_CONSTANT T_EQUAL list=ASTList 
;

ASTRangeDeclaration
: T_LET constant=T_CONSTANT T_EQUAL range=ASTRange

;

ASTInstruction
: ASTHide
    | ASTCreate
    | ASTAlter 
    | ASTTrajectory
    | ASTAlterSpeed
    | ASTSaturate
    | ASTReplay
    | ASTDelay
    | ASTRotate
    | ASTCut
;

ASTHide
: T_HIDE target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? frequency=ASTHideParameter? assertions=ASTAssertions?
;

ASTCreate
: T_CREATE timeScope=ASTTimeScope trajectory=ASTWayPoints parameters=ASTCreationParameters? assertions=ASTAssertions?
;

ASTAlter
: T_ALTER target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? parameters=ASTParameters assertions=ASTAssertions?
;

ASTTrajectory
: T_ALTER target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? trajectory=ASTWayPoints assertions=ASTAssertions?
;

ASTAlterSpeed
: T_ALTER_SPEED target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? parameters=ASTSpeedParameters assertions=ASTAssertions?
;

ASTSaturate
: T_SATURATE target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? parameters=ASTSaturationParameters assertions=ASTAssertions?
;

ASTReplay
: T_REPLAY target=ASTReplayTarget timeScope=ASTTimeScope parameters=ASTParameters? assertions=ASTAssertions?
;

ASTDelay
: T_DELAY target=ASTTarget timeScope=ASTTimeScope delay=ASTDelayParameter assertions=ASTAssertions?
;

ASTRotate
: T_ROTATE target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? angle=ASTRotateParameter assertions=ASTAssertions?
;

ASTCut
: T_CUT target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? assertions=ASTAssertions?
;

ASTAssertions
: items+=ASTAssertion (T_AND items+=ASTAssertion)*
;

ASTAssertion
: T_ASSERT timeScope=ASTTimeScope T_GROOVY_FILE file=T_STRING_LITERAL (T_FILTER filter=T_STRING_LITERAL)?
;

ASTTarget
: ASTPlane
    | ASTAllPlanes 
;

ASTPlane
: T_PLANE filters=ASTFilters
;

ASTAllPlanes
: T_ALL_PLANES (filters=ASTFilters)?
;

ASTReplayTarget:
    ASTPlaneFrom
    | ASTAllPlaneFrom
;

ASTPlaneFrom:
    T_PLANE filters=ASTFilters T_FROM_RECORDING recording=ASTValue
;

ASTAllPlaneFrom:
    T_ALL_PLANES(filters=ASTFilters)? T_FROM_RECORDING recording=ASTValue
;

ASTWayPoints
: T_WITH_WAYPOINTS T_OPEN_SBRACE waypoints+=ASTWayPoint (T_COMMA waypoints+=ASTWayPoint)* T_CLOSE_SBRACE
;

ASTWayPoint
: T_OPEN_PAR latitude=ASTValue T_COMMA longitude=ASTValue T_CLOSE_PAR T_WITH_ALTITUDE altitude=ASTValue T_AT time=ASTTime
;

ASTParameters
: T_WITH_VALUES items+=ASTParameter (T_AND items+=ASTParameter)*
;

ASTDelayParameter
: T_WITH_DELAY value=ASTTime
;

ASTHideParameter
: T_WITH_FREQUENCY value=ASTValue
;

ASTRotateParameter
: T_WITH_ANGLE value=ASTValue
;

ASTParameter
: ASTParamEdit
    | ASTParamOffset
    | ASTParamNoise
    | ASTParamDrift
;

ASTParamEdit
: name=ASTParameterType T_EQUAL value=ASTValue
;

ASTParamOffset
: name=ASTParameterType offset_op=(T_PLUSEQUAL|T_MINUSEQUAL) value=ASTValue
;

ASTParamNoise
: name=ASTParameterType T_MULEQUAL value=ASTValue
;

ASTParamDrift
: name=ASTParameterType drift_op=(T_PLUSPLUSEQUAL|T_MINUSMINUSEQUAL) value=ASTValue
;

ASTSpeedParameters
: T_WITH_VALUES items+=ASTSpeedParameter (T_AND items+=ASTSpeedParameter)?
;

ASTSpeedParameter
: name=ASTSpeedParameterType T_EQUAL value=ASTValue
;

ASTSaturationParameters
: T_WITH_VALUES items+=ASTSaturationParameter (T_AND items+=ASTSaturationParameter)*
;

ASTSaturationParameter
: name=ASTSaturationParameterType T_EQUAL value=ASTValue
;

ASTCreationParameters
: T_WITH_VALUES items+=ASTCreationParameter (T_AND items+=ASTCreationParameter)*
;

ASTCreationParameter
: name=ASTCreationParameterType T_EQUAL value=ASTValue
;

ASTTrigger
: T_TRIGGERED_BY triggername=ASTValue
;

ASTTimeScope
: ASTAt
    | ASTWindow
    | ASTAtFor
;

ASTAt
: T_AT time=ASTTime
;

ASTWindow
: T_FROM start=ASTTime T_UNTIL end=ASTTime
;

ASTAtFor
: T_AT time=ASTTime T_FOR for=ASTTime
;

ASTTime
: realTime=ASTValue T_SECONDS
;

ASTFilters
:  T_SATISFYING filters+=ASTValue (T_AND filters+=ASTValue)*
;

ASTNumberOffset
: ASTNumber
    | ASTLeftShift
    | ASTRightShift
;

ASTLeftShift
: T_LEFTSHIT content=ASTNumber
;

ASTRightShift
: T_RIGHTSHIT content=ASTNumber
;

ASTNumber:
    ASTIntegerValue
    | ASTDoubleValue
    | ASTRecordingValue
;

ASTIntegerValue:
    content=T_INTEGER_LITERAL
;

ASTDoubleValue:
    content=T_DOUBLE_LITERAL
;

ASTRecordingValue:
    ratio=T_DOUBLE_LITERAL T_MUL content=ASTRecordingParameterType
;

ASTValue
: ASTStringValue
    | ASTNumberOffset
    | ASTVariableValue
    | ASTConstantValue
;

ASTStringValue
: content=T_STRING_LITERAL
;
ASTVariableValue
: content=T_VARIABLE
;
ASTConstantValue
: content=T_CONSTANT
;

ASTSaturationParameterType:
    ICAO="ICAO"|
    AIRCRAFT_NUMBER="NUMBER";

ASTCreationParameterType:
    ICAO="ICAO"|
    CALLSIGN="CALLSIGN"|
    SQUAWK="SQUAWK"|
    EMERGENCY="EMERGENCY"|
    ALERT="ALERT"|
    SPI="SPI";

ASTSpeedParameterType:
    EAST_WEST_VELOCITY="EAST_WEST_VELOCITY"|
    NORTH_SOUTH_VELOCITY="NORTH_SOUTH_VELOCITY";

ASTParameterType:
    ALTITUDE="ALTITUDE"|
    CALLSIGN="CALLSIGN"|
    EMERGENCY="EMERGENCY"|
    GROUND_SPEED="GROUNDSPEED"|
    ICAO="ICAO"|
    LATITUDE="LATITUDE"|
    LONGITUDE="LONGITUDE"|
    SPI="SPI"|
    SQUAWK="SQUAWK"|
    TRACK="TRACK";

ASTRecordingParameterType:
    REC_DURATION = "REC_DURATION"|
    ALT_DURATION = "ALT_DURATION"|
    REC_NBR_AIRCRAFT = "REC_NBR_AIRCRAFT";

terminal T_AREA            : 'area';
terminal T_ALL_PLANES      : 'all_planes';
terminal T_PLANES          : 'planes';
terminal T_ALTER_SPEED     : 'alter_speed';
terminal T_ALTER           : 'alter';
terminal T_ALTITUDE        : 'altitude';
terminal T_AND             : 'and';
terminal T_ASSERT          : 'assert';
terminal T_AT              : 'at';
terminal T_CIRCLE          : 'circle';
terminal T_CUT             : 'cut';
terminal T_DO              : 'do';
terminal T_EACH            : 'each';
terminal T_POLYGON         : 'polygon';
terminal T_CENTERED        : 'centered';
terminal T_COMMA           : ',';
terminal T_CREATE          : 'create';
terminal T_DOT             : '.';
terminal T_DIFFERENT       : '<>';
terminal T_EQUAL           : '=';
terminal T_MULEQUAL        : '*=';
terminal T_PLUSEQUAL       : '+=';
terminal T_MINUSEQUAL      : '-=';
terminal T_PLUSPLUSEQUAL   : '++=';
terminal T_MINUSMINUSEQUAL : '--=';
terminal T_LEFTSHIT        : '<<';
terminal T_RIGHTSHIT       : '>>';
terminal T_FOR             : 'for';
terminal T_FROM_RECORDING  : 'from_recording';
terminal T_FROM            : 'from';
terminal T_GLOBAL          : 'global';
terminal T_OPEN_PAR        : '(';
terminal T_CLOSE_PAR       : ')';
terminal T_OPEN_BRACE      : '{';
terminal T_CLOSE_BRACE     : '}';
terminal T_OPEN_SBRACE     : '[';
terminal T_CLOSE_SBRACE    : ']';
terminal T_LET             : 'let';
terminal T_LT              : '<';
terminal T_GT              : '>';
terminal T_LTE             : '<=';
terminal T_GTE             : '>=';
terminal T_MUL             : '*';
terminal T_IN              : 'in';
terminal T_HIDE            : 'hide';
terminal T_REPLAY          : 'replay';
terminal T_DELAY           : 'delay';
terminal T_ROTATE          : 'rotate';
terminal T_WITH_DELAY      : 'with_delay';
terminal T_WITH_FREQUENCY  : 'with_frequency';
terminal T_WITH_ANGLE      : 'with_angle';
terminal T_PLANE           : 'plane';
terminal T_RADIUS          : 'radius';
terminal T_SATURATE        : 'saturate';
terminal T_SATISFYING      : 'satisfying';
terminal T_TRIGGERED_BY    : 'triggered_by';
terminal T_SECONDS         : 'seconds';
terminal T_TO              : 'to';
terminal T_UNTIL           : 'until';
terminal T_VERTICES        : 'vertices';
terminal T_WITH            : 'with';
terminal T_WITH_VALUES     : 'with_values';
terminal T_WITH_ALTITUDE   : 'with_altitude';
terminal T_WITH_WAYPOINTS  : 'with_waypoints';
terminal T_GROOVY_FILE     : 'groovy_file';
terminal T_FILTER          : 'filter';

terminal fragment T_CONSTANT_BEGIN : '$';
terminal fragment T_VARIABLE_BEGIN : '#';

terminal T_CONSTANT : T_CONSTANT_BEGIN IDENTIFIER;
terminal T_VARIABLE : T_VARIABLE_BEGIN IDENTIFIER;

terminal T_INTEGER_LITERAL returns number : (('-'?) '1'..'9' '0'..'9'*) | '0';

terminal T_DOUBLE_LITERAL returns number : (('-'? '1'..'9' '0'..'9'*) | '0') '.' '0'..'9' '0'..'9'*;

terminal T_STRING_LITERAL
:  '"' ( ESCAPE_SEQUENCE | !('\\'|'"') )* '"'
;

terminal fragment DIGIT                : '0'..'9' ;
terminal fragment IDENTIFIER_FIRST    : 'a'..'z' | 'A'..'Z' | '_' | '*' ;
terminal fragment IDENTIFIER_BODY    : 'a'..'z' | 'A'..'Z' | DIGIT | '_' | '/' | '*' ;
terminal fragment IDENTIFIER                    : IDENTIFIER_FIRST IDENTIFIER_BODY* ;

hidden terminal SPACE_ESCAPE
:   /\s+/;

terminal fragment ESCAPE_SEQUENCE
:   '\\' ('b'|'t'|'n'|'f'|'r'|'\"'|"\'"|'\\')
    |   UNICODE_ESCAPE
    |   OCTAL_ESCAPE
;

terminal fragment OCTAL_ESCAPE
:   '\\' ('0'..'3') ('0'..'7') ('0'..'7')
    |   '\\' ('0'..'7') ('0'..'7')
    |   '\\' ('0'..'7')
;

terminal fragment UNICODE_ESCAPE
:   '\\' 'u' HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT
;

terminal fragment HEX_DIGIT
: ('0'..'9'|'a'..'f'|'A'..'F')
;








