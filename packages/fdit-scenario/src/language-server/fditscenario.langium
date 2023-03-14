grammar AttackScenarioGrammar


entry ASTScenario
: declarations+=ASTDeclaration* instructions+=ASTInstruction+
;

ASTList
: keyword=T_OPEN_BRACE list=(ASTStringList | ASTOffsetList)
;

ASTStringList
: items+=T_STRING_LITERAL (keyword=T_COMMA items+=T_STRING_LITERAL)* keyword=T_CLOSE_BRACE
;

ASTOffsetList
: items+=ASTNumberOffset (keyword=T_COMMA items+=ASTNumberOffset)* keyword=T_CLOSE_BRACE
;

ASTRange
: keyword=T_OPEN_SBRACE range=(ASTIntegerRange | ASTDoubleRange)
;
ASTIntegerRange
: start=T_INTEGER_LITERAL keyword=T_COMMA end=T_INTEGER_LITERAL keyword=T_CLOSE_SBRACE
;
ASTDoubleRange
: start=T_DOUBLE_LITERAL keyword=T_COMMA end=T_DOUBLE_LITERAL keyword=T_CLOSE_SBRACE
;

ASTDeclaration
: keyword=T_LET constant=T_CONSTANT keyword=T_EQUAL (ASTListDeclaration  | ASTRangeDeclaration) keyword=T_COMMA
;

ASTListDeclaration
: list=ASTList
;

ASTRangeDeclaration
: range=ASTRange

;

ASTInstruction
: ASTHide
    | ASTCreate
    | ASTAlterAndTrajectory
    | ASTAlterSpeed
    | ASTSaturate
    | ASTReplay
    | ASTDelay
    | ASTRotate
    | ASTCut
;

ASTHide
: keyword=T_HIDE target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? frequency=ASTHideParameter? assertions=ASTAssertions?
;

ASTAlterAndTrajectory
: keyword=T_ALTER target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? (ASTAlter | ASTTrajectory)
;

ASTCreate
: keyword=T_CREATE timeScope=ASTTimeScope trajectory=ASTWayPoints parameters=ASTCreationParameters? assertions=ASTAssertions?
;

ASTAlter
: parameters=ASTParameters assertions=ASTAssertions?
;

ASTTrajectory
: trajectory=ASTWayPoints assertions=ASTAssertions?
;

ASTAlterSpeed
: keyword=T_ALTER_SPEED target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? parameters=ASTSpeedParameters assertions=ASTAssertions?
;

ASTSaturate
: keyword=T_SATURATE target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? parameters=ASTSaturationParameters assertions=ASTAssertions?
;

ASTReplay
: keyword=T_REPLAY target=ASTReplayTarget timeScope=ASTTimeScope parameters=ASTParameters? assertions=ASTAssertions?
;

ASTDelay
: keyword=T_DELAY target=ASTTarget timeScope=ASTTimeScope delay=ASTDelayParameter assertions=ASTAssertions?
;

ASTRotate
: keyword=T_ROTATE target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? angle=ASTRotateParameter assertions=ASTAssertions?
;

ASTCut
: keyword=T_CUT target=ASTTarget timeScope=ASTTimeScope trigger=ASTTrigger? assertions=ASTAssertions?
;

ASTAssertions
: items+=ASTAssertion (keyword=T_AND items+=ASTAssertion)*
;

ASTAssertion
: keyword=T_ASSERT timeScope=ASTTimeScope keyword=T_GROOVY_FILE file=T_STRING_LITERAL (keyword=T_FILTER filter=T_STRING_LITERAL)?
;

ASTTarget
: ASTPlane
    | ASTAllPlanes 
;

ASTPlane
: keyword=T_PLANE filters=ASTFilters
;

ASTAllPlanes
: keyword=T_ALL_PLANES (filters=ASTFilters)?
;

ASTReplayTarget:
    ASTPlaneFrom
    | ASTAllPlaneFrom
;

ASTPlaneFrom:
    keyword=T_PLANE filters=ASTFilters keyword=T_FROM_RECORDING recording=ASTValue
;

ASTAllPlaneFrom:
    keyword=T_ALL_PLANES(filters=ASTFilters)? keyword=T_FROM_RECORDING recording=ASTValue
;

ASTWayPoints
: keyword=T_WITH_WAYPOINTS keyword=T_OPEN_SBRACE waypoints+=ASTWayPoint (keyword=T_COMMA waypoints+=ASTWayPoint)* keyword=T_CLOSE_SBRACE
;

ASTWayPoint
: keyword=T_OPEN_PAR latitude=ASTValue keyword=T_COMMA longitude=ASTValue keyword=T_CLOSE_PAR keyword=T_WITH_ALTITUDE altitude=ASTValue keyword=T_AT time=ASTTime
;

ASTParameters
: keyword=T_WITH_VALUES items+=ASTParameter (keyword=T_AND items+=ASTParameter)*
;

ASTDelayParameter
: keyword=T_WITH_DELAY value=ASTTime
;

ASTHideParameter
: keyword=T_WITH_FREQUENCY value=ASTValue
;

ASTRotateParameter
: keyword=T_WITH_ANGLE value=ASTValue
;

ASTParameter
: name=ASTParameterType (ASTParamEdit | ASTParamOffset | ASTParamNoise | ASTParamDrift) value=ASTValue
;

ASTParamEdit
:  keyword=T_EQUAL
;

ASTParamOffset
:  offset_op=(T_PLUSEQUAL|T_MINUSEQUAL)
;

ASTParamNoise
:  keyword=T_MULEQUAL
;

ASTParamDrift
:  drift_op=(T_PLUSPLUSEQUAL|T_MINUSMINUSEQUAL)
;

ASTSpeedParameters
: keyword=T_WITH_VALUES items+=ASTSpeedParameter (keyword=T_AND items+=ASTSpeedParameter)?
;

ASTSpeedParameter
: name=ASTSpeedParameterType keyword=T_EQUAL value=ASTValue
;

ASTSaturationParameters
: keyword=T_WITH_VALUES items+=ASTSaturationParameter (keyword=T_AND items+=ASTSaturationParameter)*
;

ASTSaturationParameter
: name=ASTSaturationParameterType keyword=T_EQUAL value=ASTValue
;

ASTCreationParameters
: keyword=T_WITH_VALUES items+=ASTCreationParameter (keyword=T_AND items+=ASTCreationParameter)*
;

ASTCreationParameter
: name=ASTCreationParameterType keyword=T_EQUAL value=ASTValue
;

ASTTrigger
: keyword=T_TRIGGERED_BY triggername=ASTValue
;

ASTTimeScope
: ASTAt
    | ASTWindow
;


ASTAt
: keyword=T_AT time=ASTTime (for=ASTAtFor)?
;

ASTWindow
: keyword=T_FROM start=ASTTime keyword=T_UNTIL end=ASTTime
;

ASTAtFor
: keyword=T_FOR for=ASTTime
;

ASTTime
: realTime=ASTValue keyword=T_SECONDS
;

ASTFilters
:  keyword=T_SATISFYING filters+=ASTValue (keyword=T_AND filters+=ASTValue)*
;

ASTNumberOffset
: ASTNumber
    | ASTLeftShift
    | ASTRightShift
;

ASTLeftShift
: keyword=T_LEFTSHIT content=ASTNumber
;

ASTRightShift
: keyword=T_RIGHTSHIT content=ASTNumber
;

ASTNumber:
    ASTIntegerValue
    | ASTDoubleValue
;

ASTIntegerValue:
    content=T_INTEGER_LITERAL
;

ASTDoubleValue:
    content=T_DOUBLE_LITERAL (record=ASTRecordingValue)?
;

ASTRecordingValue:
    keyword=T_MUL content=ASTRecordingParameterType
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

T_AREA            returns string: 'area';
T_ALL_PLANES      returns string: 'all_planes';
T_PLANES          returns string: 'planes';
T_ALTER_SPEED     returns string: 'alter_speed';
T_ALTER           returns string: 'alter';
T_ALTITUDE        returns string: 'altitude';
T_AND             returns string: 'and';
T_ASSERT          returns string: 'assert';
T_AT              returns string: 'at';
T_CIRCLE          returns string: 'circle';
T_CUT             returns string: 'cut';
T_DO              returns string: 'do';
T_EACH            returns string: 'each';
T_POLYGON         returns string: 'polygon';
T_CENTERED        returns string: 'centered';
T_COMMA           returns string: ',';
T_CREATE          returns string: 'create';
T_DOT             returns string: '.';
T_DIFFERENT       returns string: '<>';
T_EQUAL           returns string: '=';
T_MULEQUAL        returns string: '*=';
T_PLUSEQUAL       returns string: '+=';
T_MINUSEQUAL      returns string: '-=';
T_PLUSPLUSEQUAL   returns string: '++=';
T_MINUSMINUSEQUAL returns string: '--=';
T_LEFTSHIT        returns string: '<<';
T_RIGHTSHIT       returns string: '>>';
T_FOR             returns string: 'for';
T_FROM_RECORDING  returns string: 'from_recording';
T_FROM            returns string: 'from';
T_GLOBAL          returns string: 'global';
T_OPEN_PAR        returns string: '(';
T_CLOSE_PAR       returns string: ')';
T_OPEN_BRACE      returns string: '{';
T_CLOSE_BRACE     returns string: '}';
T_OPEN_SBRACE     returns string: '[';
T_CLOSE_SBRACE    returns string: ']';
T_LET             returns string: 'let';
T_LT              returns string: '<';
T_GT              returns string: '>';
T_LTE             returns string: '<=';
T_GTE             returns string: '>=';
T_MUL             returns string: '*';
T_IN              returns string: 'in';
T_HIDE            returns string: 'hide';
T_REPLAY          returns string: 'replay';
T_DELAY           returns string: 'delay';
T_ROTATE          returns string: 'rotate';
T_WITH_DELAY      returns string: 'with_delay';
T_WITH_FREQUENCY  returns string: 'with_frequency';
T_WITH_ANGLE      returns string: 'with_angle';
T_PLANE           returns string: 'plane';
T_RADIUS          returns string: 'radius';
T_SATURATE        returns string: 'saturate';
T_SATISFYING      returns string: 'satisfying';
T_TRIGGERED_BY    returns string: 'triggered_by';
T_SECONDS         returns string: 'seconds';
T_TO              returns string: 'to';
T_UNTIL           returns string: 'until';
T_VERTICES        returns string: 'vertices';
T_WITH            returns string: 'with';
T_WITH_VALUES     returns string: 'with_values';
T_WITH_ALTITUDE   returns string: 'with_altitude';
T_WITH_WAYPOINTS  returns string: 'with_waypoints';
T_GROOVY_FILE     returns string: 'groovy_file';
T_FILTER          returns string: 'filter';

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








