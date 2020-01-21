var frames;
var start;
var statischFana = true;
var statischFrost = true;
var statischIAS = true;
var mIAS = 1; // IAS drop down interval
var statischWaffe = true;
var statischZweitwaffe = true;
var fenster = true;
var WSMprimaer;
var WSMsekundaer;
var IASprimaer;
var IASsekundaer;
var EIASprimaer;
var EIASsekundaer;
var SIAS
var rollback1;
var rollback2;
var rollback3;
var rollback4;
var rollback5;
var rollbackframe;
var tempSkill; // store selected skill when rebuilding skill options
var tempWaffe;
var tempZweitwaffe;
var tempForm;
var tempBarbschwert;
var isMaxIas = true; // true if further ias is useless
var cap = 1;
var breakpoints = new Array();
var breakpoints1 = new Array();
var breakpoints2 = new Array();
var breakpointsAPS = new Array();

/// Calc FPA
function berechneFPA(FramesPerDirection, Acceleration, StartingFrame) {
    console.debug('calc FPA');
    console.debug(FramesPerDirection);
    console.debug(Acceleration);
    console.debug(StartingFrame);
    var Acceleration;
    var AnimationSpeed = 256;
    var attackSkill = data.attack[document.myform.skill.value];
    // Assassin && Battle Cestus, Blade Talons, Cestus, Claws, Fascia, Feral Claws, Greater Claws, Greater Talons, Hand Scythe, Hatchet Hands, Katar, Quhab, Runic Talons, Scissors Katar, Scissors Quhab, Scissors Suwayyah, Suwayyah, War Fist, Wrist Blade, Wrist Spike, Wrist Sword
    if ((document.myform.char.value == 1) && (lookupWeapon[document.myform.waffe.value][2] == 1)) {
        AnimationSpeed = 208;
    }
    // Dragon Tail, Dragon Talon || Impale, Jab, Fists of Fire, Claws of Thunder, Blades of Ice, Dragon Claw, Double Swing, Frenzy, Double Throw, Whirlwind && not Whirlwind
    console.debug("attack skill");
    if (((attackSkill.animation == 3) || (attackSkill.animation == 7)) && (attackSkill.title !== "Whirlwind")) {
        AnimationSpeed = 256;
    }
    // Laying Traps
    if (attackSkill.animation == 5) {
        AnimationSpeed = 128;
    }
    // Bear
    if (document.myform.charform.value == 1) {
        if (lookupWeapon[document.myform.waffe.value][2] == 3) { // 2-hand swords
            FramesPerDirection = waffengattung[2][document.myform.char.value][0]; //1-hand swinging weapon
        }
        AnimationSpeed = Math.floor(256 * 10 / Math.floor(256 * FramesPerDirection / Math.floor((100 + IASprimaer - parseInt(document.myform.IAS.value) - lookupWeapon[document.myform.waffe.value][1]) * AnimationSpeed / 100)));
        FramesPerDirection = 12;
        if (attackSkill.animation == 6) {
            FramesPerDirection = 10;
        }
        StartingFrame = 0;
    }
    // Wolf
    if (document.myform.charform.value == 2) {
        if (lookupWeapon[document.myform.waffe.value][2] == 3) { // 2-hand swords
            FramesPerDirection = waffengattung[2][document.myform.char.value][0]; //1-hand swinging weapon
        }
        AnimationSpeed = Math.floor(256 * 9 / Math.floor(256 * FramesPerDirection / Math.floor((100 + IASprimaer - parseInt(document.myform.IAS.value) - lookupWeapon[document.myform.waffe.value][1]) * AnimationSpeed / 100)));
        FramesPerDirection = 13;
        if ((document.myform.skill.value == 29) && (StartingFrame == 0)) { // Fury
            FramesPerDirection = 7;
        }
        if (attackSkill.animation == 6) {
            FramesPerDirection = 10;
        }
        StartingFrame = 0;
    }
    FPA = Math.ceil(256 * (FramesPerDirection - StartingFrame) / Math.floor(AnimationSpeed * Acceleration / 100)) - 1;
    FPAmax = Math.ceil(256 * (FramesPerDirection - StartingFrame) / Math.floor(AnimationSpeed * 175 / 100)) - 1;
    if (document.myform.skill.value == 19) { // whirlwind
        FPA = Math.floor(256 * FramesPerDirection / Math.floor(AnimationSpeed * Acceleration / 100));
        FPAmax = 0;
    }
    if (document.myform.skill.value == 26) { // Feral Rage
        FPA = Math.ceil(256 * 7 / Math.floor(AnimationSpeed * Acceleration / 100)) + Math.ceil((256 * 13 - Math.floor(AnimationSpeed * Acceleration / 100) * Math.ceil(256 * 7 / Math.floor(AnimationSpeed * Acceleration / 100))) / (2 * Math.floor(AnimationSpeed * Acceleration / 100))) - 1;
        FPAmax = Math.ceil(256 * 7 / Math.floor(AnimationSpeed * 175 / 100)) + Math.ceil((256 * 13 - Math.floor(AnimationSpeed * 175 / 100) * Math.ceil(256 * 7 / Math.floor(AnimationSpeed * 175 / 100))) / (2 * Math.floor(AnimationSpeed * 175 / 100))) - 1;
    }
    if (cap == 1) {
        document.myform.AnzMax.value = "";
        if ((attackSkill.rollback == 100) && (attackSkill.animation != 1) && (FPA <= FPAmax)) {
            document.myform.AnzMax.value = "further IAS useless";
        }
    }
    return FPA;
}

/// Calculate breakpoints
function berechneWerte() {
    var ergebnis; // "result"
    var temp;
    var attackSkill = data.attack[document.myform.skill.value];
    console.debug('Calculating breakpoints for: ' + attackSkill.title);
    berechneSIAS();
    berechneEIAS();
    berechneWSM();
    var acceleration = Math.max(Math.min(100 + SIAS + EIASprimaer - WSMprimaer, 175), 15);
    var acceleration2 = Math.max(Math.min(100 + SIAS + EIASsekundaer - WSMsekundaer, 175), 15);
    start = 0;
    if (((document.myform.char.value == 0) || (document.myform.char.value == 6)) && (attackSkill.animation < 2)) {
        start = startframe[lookupWeapon[document.myform.waffe.value][2]];
    }
    if (((attackSkill.animation == 0) || (attackSkill.animation == 6)) && (attackSkill.rollback == 100)) {
        frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][0];
        if ((lookupWeapon[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
            frames = 16;
        }
        ergebnis = berechneFPA(frames, acceleration, start);
    }
    // standard attack
    if ((attackSkill.animation == 1) && (attackSkill.rollback == 100)) {
        console.debug('standard attack');
        frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][0];
        if ((lookupWeapon[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
            frames = 16;
        }
        ergebnis = berechneFPA(frames, acceleration, start);
        if (ergebnis > berechneFPA(frames, 175, start)) {
            isMaxIas = false;
        }
        // Unshifted
        if (document.myform.charform.value == 0) {
            console.debug('unshifted');
            temp = ergebnis;
            var weaponTypeNum = lookupWeapon[document.myform.waffe.value][2];
            console.debug(weaponTypeNum);
            frames = waffengattung[weaponTypeNum][document.myform.char.value][1];
            console.debug(frames);
            if ((lookupWeapon[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
                frames = 16;
            }
            ergebnis = berechneFPA(frames, acceleration, start);
            if (ergebnis > berechneFPA(frames, 175, start)) {
                isMaxIas = false;
            }
            ergebnis = (ergebnis + temp) / 2;
        }
        // act 5 merc
        if (document.myform.char.value == 9) {
            ergebnis = ergebnis / 2;
        }
        if (document.myform.zweitwaffe.value > 0) {
            temp = ergebnis;
            ergebnis = berechneFPA(12, acceleration2, 0);
            if (ergebnis > berechneFPA(12, 175, 0)) {
                isMaxIas = false;
            }
            ergebnis = (ergebnis + temp) / 2;
        }
        if (isMaxIas) {
            document.myform.AnzMax.value = "further IAS useless";
        }
        isMaxIas = true;
    }
    if ((attackSkill.animation >= 2)
        && (attackSkill.animation <= 5) 
        && (attackSkill.rollback == 100)) {
        if (attackSkill.animation == 2) { // Throw
            frames = waffengattung[9][document.myform.char.value];
        }
        if (attackSkill.animation == 3) {
            frames = 13;
        }
        if (attackSkill.animation == 4) {
            frames = 12;
        }
        if (attackSkill.animation == 5) {
            frames = 8;
        }
        ergebnis = berechneFPA(frames, acceleration, start);
    }
    if ((attackSkill.animation == 7) && (document.myform.skill.value != 19) && (attackSkill.rollback == 100)) {
        frames = sequences[attackSkill.sequence][lookupWeapon[document.myform.waffe.value][2]];
        if ((document.myform.skill.value > 8) && (document.myform.skill.value < 13) && (document.myform.zweitwaffe.value > 0)) {
            frames = 16;
        }
        if (document.myform.char.value == 8) {
            frames = 14;
        }
        start = 0;
        ergebnis = berechneFPA(frames, acceleration, start);
        ergebnis++;
        if ((document.myform.skill.value == 3) && (document.myform.char.value < 7)) {
            ergebnis = parseInt(100 * ergebnis / 3) / 100;
        }
        if (document.myform.char.value == 8) {
            ergebnis = ergebnis / 2;
        }
        if ((document.myform.skill.value > 15) && (document.myform.skill.value < 19)) {
            ergebnis = ergebnis / 2;
        }
        if ((document.myform.skill.value > 8) && (document.myform.skill.value < 13) && (document.myform.zweitwaffe.value > 0)) {
            ergebnis = ergebnis / 2;
        }
    }
    // Whirlwind
    if (document.myform.skill.value == 19) {
        ergebnis = 4; // uses classic whirlwind locked at 4 frame attack for all weapons
        isMaxIas = true;
        if (isMaxIas) {
            document.myform.AnzMax.value = "further IAS useless";
        }
    }
    // Dragon Talon, Zeal, Fury
    if (attackSkill.rollback == 0) {
        // Dragon Talon
        if (document.myform.skill.value == 14) {
            rollback1 = berechneFPA(4, acceleration, 0);
            rollback1++;
            rollback3 = berechneFPA(13, acceleration, 0);
            if (rollback3 == 7) {
                document.myform.AnzMax.value = "further IAS useless";
            }
            document.myform.AnzFPA.value = rollback1 + "/" + rollback1 + "/" + rollback1 + "/" + rollback1 + "/" + rollback3 + " frames per attack";
            document.myform.AnzFre.value = parseInt(100 * 25 / ((rollback1 * 4 + rollback3) / 5)) / 100 + " attacks per second";
        }
        // Fury
        if (document.myform.skill.value == 29) {
            frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][0];
            rollback1 = berechneFPA(frames, acceleration, 0);
            if (rollback1 > berechneFPA(frames, 175, 0)) {
                isMaxIas = false;
            }
            rollback1++;
            rollback3 = berechneFPA(frames, acceleration, 1);
            if (rollback3 > berechneFPA(frames, 175, 1)) {
                isMaxIas = false;
            }
            if (isMaxIas) {
                document.myform.AnzMax.value = "further IAS useless";
            }
            isMaxIas = true;
            document.myform.AnzFPA.value = rollback1 + "/" + rollback1 + "/" + rollback1 + "/" + rollback1 + "/" + rollback3 + " frames per attack";
            document.myform.AnzFre.value = parseInt(100 * 25 / ((rollback1 * 4 + rollback3) / 5)) / 100 + " attacks per second";
        }
        // Zeal
        if (document.myform.skill.value == 24) {
            var weaponTypeNum = lookupWeapon[document.myform.waffe.value][2];
            console.debug(weaponTypeNum);
            frames = aktionsframe[weaponTypeNum][document.myform.char.value];
            // 2-h sword && barb single handed
            var isBarbTwoHandedSwordAsOneHanded = false;
            if ((weaponTypeNum == 3) && (document.myform.barbschwert.value == 1)) {
                isBarbTwoHandedSwordAsOneHanded = true;
                frames = 7;
            }
            console.debug(frames);
            rollback1 = berechneFPA(frames, acceleration, start);
            if (rollback1 > berechneFPA(frames, 175, start)) {
                isMaxIas = false;
            }
            rollback1++;
            rollback2 = berechneFPA(frames, acceleration, 0);
            if (rollback2 > berechneFPA(frames, 175, 0)) {
                isMaxIas = false;
            }
            rollback2++;
            frames = waffengattung[weaponTypeNum][document.myform.char.value][0];
            console.debug(frames);
            if (isBarbTwoHandedSwordAsOneHanded) {
                frames = 16;
            }
            rollback3 = berechneFPA(frames, acceleration, 0);
            if (rollback3 > berechneFPA(frames, 175, 0)) {
                isMaxIas = false;
            }
            if (isMaxIas) {
                document.myform.AnzMax.value = "further IAS useless";
            }
            isMaxIas = true;
            document.myform.AnzFPA.value = rollback1 + "/" + rollback2 + "/" + rollback2 + "/" + rollback2 + "/" + rollback3 + " frames per attack";
            // Zeal
            if (document.myform.skill.value == 24) {
                document.myform.AnzFre.value = parseInt(100 * 25 / ((rollback1 + rollback2 * 3 + rollback3) / 5)) / 100 + " attacks per second";
            }
        }
    }
    // Strafe
    if (attackSkill.rollback == 50) {
        frames = aktionsframe[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value];
        if (acceleration > 149) {
            acceleration = 149;
        }
        rollback1 = berechneFPA(frames, acceleration, start);
        if (rollback1 > berechneFPA(frames, 149, start)) {
            isMaxIas = false;
        }
        rollback1++;
        rollbackframe = Math.floor(Math.floor((256 * start + Math.floor(256 * acceleration / 100) * rollback1) / 256) * attackSkill.rollback / 100);
        rollback2 = berechneFPA(frames, acceleration, rollbackframe);
        if (rollback2 > berechneFPA(frames, 149, rollbackframe)) {
            isMaxIas = false;
        }
        rollback2++;
        rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * rollback2) / 256) * attackSkill.rollback / 100);
        rollback3 = berechneFPA(frames, acceleration, rollbackframe);
        if (rollback3 > berechneFPA(frames, 149, rollbackframe)) {
            isMaxIas = false;
        }
        rollback3++;
        rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * rollback3) / 256) * attackSkill.rollback / 100);
        rollback4 = berechneFPA(frames, acceleration, rollbackframe);
        if (rollback4 > berechneFPA(frames, 149, rollbackframe)) {
            isMaxIas = false;
        }
        rollback4++;
        frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][0];
        rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * rollback4) / 256) * attackSkill.rollback / 100);
        rollback5 = berechneFPA(frames, acceleration, rollbackframe);
        if (rollback5 > berechneFPA(frames, 149, rollbackframe)) {
            isMaxIas = false;
        }
        if ((rollback2 == 5) && (rollback3 == 4)) {
            rollback3 = 5;
            rollback5 = 13;
        }
        if (isMaxIas) {
            document.myform.AnzMax.value = "further IAS useless";
        }
        isMaxIas = true;
        document.myform.AnzFPA.value = rollback1 + "/" + rollback2 + "/" + rollback3 + "/" + rollback4 + "/" + rollback5 + " frames per attack";
        document.myform.AnzFre.value = parseInt(100 * 25 / ((rollback1 + rollback2 + rollback3 * 4 + rollback4 * 3 + rollback5) / 10)) / 100 + " attacks per second";
    }
    // Fend
    if (attackSkill.rollback == 40) {
        frames = aktionsframe[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value];
        rollback1 = berechneFPA(frames, acceleration, start);
        if (rollback1 > berechneFPA(frames, 175, start)) {
            isMaxIas = false;
        }
        rollback1++;
        rollbackframe = Math.floor(Math.floor((256 * start + Math.floor(256 * acceleration / 100) * rollback1) / 256) * attackSkill.rollback / 100);
        rollback2 = berechneFPA(frames, acceleration, rollbackframe);
        if (rollback2 > berechneFPA(frames, 175, rollbackframe)) {
            isMaxIas = false;
        }
        rollback2++;
        frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][0];
        rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * rollback2) / 256) * attackSkill.rollback / 100);
        rollback3 = berechneFPA(frames, acceleration, rollbackframe);
        if (rollback3 > berechneFPA(frames, 175, rollbackframe)) {
            isMaxIas = false;
        }
        if (isMaxIas) {
            document.myform.AnzMax.value = "further IAS useless";
        }
        isMaxIas = true;
        document.myform.AnzFPA.value = rollback1 + "/" + rollback2 + "/" + rollback3 + " frames per attack";
        document.myform.AnzFre.value = parseInt(100 * 25 / ((rollback1 + rollback2 + rollback3) / 2)) / 100 + " attacks per second";
    }
    // Most attacks
    if (attackSkill.rollback == 100) {
        document.myform.AnzFPA.value = ergebnis + " frames per attack";
        document.myform.AnzFre.value = parseInt(100 * 25 / ergebnis) / 100 + " attacks per second";
        if (document.myform.char.value > 6) {
            document.myform.AnzFre.value = parseInt(100 * 25 / (ergebnis + 2)) / 100 + " attacks per second";
        }
        if (((document.myform.char.value == 8) && (document.myform.skill.value == 3)) || ((document.myform.char.value == 9) && (document.myform.skill.value == 0))) {
            document.myform.AnzFre.value = parseInt(100 * 25 / (ergebnis + 1)) / 100 + " attacks per second";
        }
        // Shape Shifted && off-hand weapon not unarmed && standard attack
        if ((document.myform.charform.value > 0) && (document.myform.zweitwaffe.value > 0) && (document.myform.skill.value == 0)) {
            document.myform.AnzFPA.value = "Calculation makes no sense";
            document.myform.AnzFre.value = "";
        }
    }
}

/// Show breakpoints popup
function berechneBreakpoints() {
    console.log('show table');
    var ergebnis;
    var RBframe;
    var temp;
    var temp1;
    var OIAS = document.myform.IAS.value;
    var WIAS = document.myform.wIAS1.value;
    var attackSkill = data.attack[document.myform.skill.value];
    if (fenster == false) {
        TabFenster.close();
    }
    fenster = false;
    // Shape Shifted && (|| &&)
    if ((document.myform.charform.value > 0) && ((document.myform.waffe.value == 0) || ((document.myform.zweitwaffe.value > 0) && (document.myform.skill.value == 0)))) {
        fenster = true;
    }
    cap = 0;
    // Unshifted
    if (document.myform.charform.value == 0) {
        while (breakpoints.length > 0) {
            breakpoints.length = breakpoints.length - 1;
        }
        while (breakpoints1.length > 0) {
            breakpoints1.length = breakpoints1.length - 1;
        }
        while (breakpoints2.length > 0) {
            breakpoints2.length = breakpoints2.length - 1;
        }
        while (breakpointsAPS.length > 0) {
            breakpointsAPS.length = breakpointsAPS.length - 1;
        }
        temp1 = 0;
        if (((attackSkill.animation == 0) 
            || (attackSkill.animation == 2) 
            || (attackSkill.animation == 3) 
            || (attackSkill.animation == 4) 
            || (attackSkill.animation == 5)
            ) && (attackSkill.rollback == 100)) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                ergebnis = berechneFPA(frames, i, start);
                if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMprimaer < 120)) {
                    breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), ergebnis];
                    temp1 = ergebnis;
                }
            }
        }
        if ((attackSkill.animation == 1) && (document.myform.zweitwaffe.value == 0) && (attackSkill.rollback == 100)) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][0];
                if ((lookupWeapon[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
                    frames = 16;
                }
                ergebnis = berechneFPA(frames, i, start);
                frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][1];
                if ((lookupWeapon[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
                    frames = 16;
                }
                temp = berechneFPA(frames, i, start);
                ergebnis = (ergebnis + temp) / 2;
                if (document.myform.char.value == 9) {
                    ergebnis = ergebnis / 2;
                }
                if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMprimaer < 120)) {
                    breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), ergebnis];
                    temp1 = ergebnis;
                }
            }
        }
        if ((attackSkill.animation == 1) && (document.myform.zweitwaffe.value > 0) && (attackSkill.rollback == 100)) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][0];
                if ((lookupWeapon[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
                    frames = 16;
                }
                ergebnis = berechneFPA(frames, i, 0);
                frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][1];
                if ((lookupWeapon[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
                    frames = 16;
                }
                temp = berechneFPA(frames, i, 0);
                ergebnis = (ergebnis + temp) / 2;
                if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMprimaer < 120)) {
                    breakpoints1[breakpoints1.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))) - IASprimaer, ergebnis];
                    temp1 = ergebnis;
                }
                if ((breakpoints1.length > 1) && (breakpoints1[1][0] < 0) && (breakpoints1[0][0] == 0)) {
                    breakpoints1.reverse();
                    breakpoints1.length = breakpoints1.length - 1;
                    breakpoints1.reverse();
                }
                if ((breakpoints1.length > 0) && (breakpoints1[0][0] < 0)) {
                    breakpoints1[0][0] = 0;
                }
            }
            temp1 = 0;
            for (i = Math.max(100 + SIAS - WSMsekundaer, 15); i <= 175; i++) {
                ergebnis = berechneFPA(12, i, 0);
                if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMsekundaer < 120)) {
                    breakpoints2[breakpoints2.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMsekundaer) / (120 - (i - 100 - SIAS + WSMsekundaer))) - IASsekundaer, ergebnis];
                    temp1 = ergebnis;
                }
                if ((breakpoints2.length > 1) && (breakpoints2[1][0] < 0) && (breakpoints2[0][0] == 0)) {
                    breakpoints2.reverse();
                    breakpoints2.length = breakpoints2.length - 1;
                    breakpoints2.reverse();
                }
                if ((breakpoints2.length > 0) && (breakpoints2[0][0] < 0)) {
                    breakpoints2[0][0] = 0;
                }
            }
            var IASmax1 = breakpoints1[breakpoints1.length - 1][0]
            var IASmax2 = breakpoints2[breakpoints2.length - 1][0]
            for (i = 0; i <= Math.max(IASmax1, IASmax2); i++) {
                if ((breakpoints1.length > 1) && (breakpoints1[1][0] == i)) {
                    breakpoints1.reverse();
                    breakpoints1.length = breakpoints1.length - 1;
                    breakpoints1.reverse();
                }
                if ((breakpoints2.length > 1) && (breakpoints2[1][0] == i)) {
                    breakpoints2.reverse();
                    breakpoints2.length = breakpoints2.length - 1;
                    breakpoints2.reverse();
                }
                if ((breakpoints1[0][0] == i) || (breakpoints2[0][0] == i)) {
                    breakpoints[breakpoints.length] = [i, (breakpoints1[0][1] + breakpoints2[0][1]) / 2];
                }
            }
        }
        if ((attackSkill.animation == 7) && (document.myform.skill.value != 19)) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                ergebnis = berechneFPA(frames, i, 0);
                ergebnis++;
                if ((document.myform.skill.value == 3) && (document.myform.char.value < 7)) {
                    ergebnis = parseInt(100 * ergebnis / 3) / 100;
                }
                if (document.myform.char.value == 8) {
                    ergebnis = ergebnis / 2;
                }
                if ((document.myform.skill.value > 15) && (document.myform.skill.value < 19)) {
                    ergebnis = ergebnis / 2;
                }
                if ((document.myform.skill.value > 8) && (document.myform.skill.value < 13) && (document.myform.zweitwaffe.value > 0)) {
                    ergebnis = ergebnis / 2;
                }
                if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMprimaer < 120)) {
                    breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), ergebnis];
                    temp1 = ergebnis;
                }
            }
        }
        if (document.myform.skill.value == 19) {
            for (i = 100 + IASprimaer - OIAS - WSMprimaer; i <= 175; i++) {
                var temp = berechneFPA(frames, i, 0);
                ergebnis = wirbelwind(temp);
                if (temp1 != ergebnis) {
                    breakpoints[breakpoints.length] = [i - 100 + WSMprimaer, ergebnis];
                    temp1 = ergebnis;
                }
            }
        }
        if (attackSkill.rollback == 0) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                if (document.myform.skill.value == 14) {
                    frames = 4;
                }
                // Zeal
                if (document.myform.skill.value == 24) {
                    frames = aktionsframe[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value];
                }
                if ((lookupWeapon[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
                    frames = 7;
                }
                rollback1 = berechneFPA(frames, i, start);
                rollback1++;
                rollback2 = berechneFPA(frames, i, 0);
                rollback2++;
                if (document.myform.skill.value == 14) {
                    frames = 13;
                }
                // Zeal
                if (document.myform.skill.value == 24) {
                    frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][0];
                }
                if ((lookupWeapon[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
                    frames = 16;
                }
                rollback3 = berechneFPA(frames, i, 0);
                ergebnis = rollback1 + rollback2 + rollback3;
                if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMprimaer < 120)) {
                    breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), rollback1 + "/" + rollback2 + "/" + rollback2 + "/" + rollback2 + "/" + rollback3];
                    breakpointsAPS[breakpointsAPS.length] = parseInt(2500 / ((rollback1 + rollback2 * 3 + rollback3) / 5)) / 100;
                    temp1 = ergebnis;
                }
            }
        }
        // Strafe
        if (attackSkill.rollback == 50) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 149; i++) {
                frames = aktionsframe[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value];
                rollback1 = berechneFPA(frames, i, start);
                rollback1++;
                RBframe = Math.floor(Math.floor((256 * start + Math.floor(256 * i / 100) * rollback1) / 256) * attackSkill.rollback / 100);
                rollback2 = berechneFPA(frames, i, RBframe);
                rollback2++;
                RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback2) / 256) * attackSkill.rollback / 100);
                rollback3 = berechneFPA(frames, i, RBframe);
                rollback3++;
                RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback3) / 256) * attackSkill.rollback / 100);
                rollback4 = berechneFPA(frames, i, RBframe);
                rollback4++;
                frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][0];
                RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback4) / 256) * attackSkill.rollback / 100);
                rollback5 = berechneFPA(frames, i, RBframe);
                if ((rollback2 == rollback3) || (rollback3 == rollback4)) {
                    ergebnis = rollback1 + rollback2 + rollback3 + rollback4 + rollback5;
                }
                if (temp1 != ergebnis) {
                    breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), rollback1 + "/" + rollback2 + "/" + rollback3 + "/" + rollback4 + "/" + rollback5];
                    breakpointsAPS[breakpointsAPS.length] = parseInt(2500 / ((rollback1 + rollback2 + rollback3 * 4 + rollback4 * 3 + rollback5) / 10)) / 100;
                    temp1 = ergebnis;
                }
            }
        }
        // Fend
        if (attackSkill.rollback == 40) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                frames = aktionsframe[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value];
                rollback1 = berechneFPA(frames, i, start);
                rollback1++;
                RBframe = Math.floor(Math.floor((256 * start + Math.floor(256 * i / 100) * rollback1) / 256) * attackSkill.rollback / 100);
                rollback2 = berechneFPA(frames, i, RBframe);
                rollback2++;
                frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][0];
                RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback2) / 256) * attackSkill.rollback / 100);
                rollback3 = berechneFPA(frames, i, RBframe);
                ergebnis = rollback1 + rollback2 + rollback3;
                if (temp1 != ergebnis) {
                    breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), rollback1 + "/" + rollback2 + "/" + rollback3];
                    breakpointsAPS[breakpointsAPS.length] = parseInt(2500 / ((rollback1 + rollback2 + rollback3) / 3)) / 100;
                    temp1 = ergebnis;
                }
            }
        }
        TabFenster = window.open("", "Tabelle", "width=420,height=520,screenX=80,screenY=150,dependent=yes,scrollbars=yes,resizable=no")
        SchreibeDaten();
        TabFenster.document.write('</table><br><table align="center" cellpadding="0" cellspacing="0"><tr class="title"><td height="30" width="70" align="center">IAS</td><td width="150" align="center">attack speed [ticks]</td><td width="180" align="center">attacks per second</td></tr>');
        var aidel = 0;
        if (document.myform.char.value > 6) {
            aidel = 2;
        }
        if (((document.myform.char.value == 8) && (document.myform.skill.value == 3)) || ((document.myform.char.value == 9) && (document.myform.skill.value == 0))) {
            aidel = 1;
        }
        if (attackSkill.rollback == 100) {
            for (i = 0; i < breakpoints.length; i++) {
                TabFenster.document.write('<tr><td height="30" align="center">' + breakpoints[i][0] + '</td><td align="center">' + breakpoints[i][1] + '</td><td align="center">' + parseInt(2500 / (aidel + breakpoints[i][1])) / 100 + '</td></tr>');
            }
        } else {
            for (i = 0; i < breakpoints.length; i++) {
                TabFenster.document.write('<tr><td height="30" align="center">' + breakpoints[i][0] + '</td><td align="center">' + breakpoints[i][1] + '</td><td align="center">' + breakpointsAPS[i] + '</td></tr>');
            }
        }
        TabFenster.document.write('</table><script type="text/javascript">window.setTimeout("stop()", 1000);</script');
        TabFenster.document.write('>');
    }
    // wereform table
    if (document.myform.charform.value > 0) {
        while (parseInt(OIAS / 5) != parseFloat(OIAS / 5)) {
            OIAS--;
        }
        while (breakpoints.length > 0) {
            breakpoints.length = breakpoints.length - 1;
        }
        while (breakpoints2.length > 0) {
            breakpoints2.length = breakpoints2.length - 1;
        }
        if ((document.myform.waffe.value == 0) || ((document.myform.zweitwaffe.value > 0) && (document.myform.skill.value == 0))) {
            if ((document.myform.skill.value == 0) && (document.myform.zweitwaffe.value > 0)) {
                alert("There&lsquo;s a problem regarding the standard attack while using two weapons in wereform, so that speed won&lsquo;t be calculated here.");
            }
            if (document.myform.waffe.value == 0) {
                alert("Please choose a weapon to use.");
            }
        } else {
            frames = waffengattung[lookupWeapon[document.myform.waffe.value][2]][document.myform.char.value][0];
            if (lookupWeapon[document.myform.waffe.value][2] == 3) {
                frames = waffengattung[2][document.myform.char.value][0];
            }
            var AnimSpeed = 256;
            if (lookupWeapon[document.myform.waffe.value][2] == 1) { // assasin claws?
                AnimSpeed = 208;
            }
            var iasRows = 32; // x + 1 rows shown. increased from 24 to show higher ias values
            for (i = 0; i <= iasRows; i++) {
                for (j = 0; j <= 14; j++) {
                    if (document.myform.skill.value == 26) {
                        breakpoints[breakpoints.length] = Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) + Math.ceil((256 * 13 - Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100) * Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100))) / (2 * Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100))) - 1;
                        if ((OIAS > 70) && (j == 0)) {
                            breakpoints2[breakpoints2.length] = Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) + Math.ceil((256 * 13 - Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100) * Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100))) / (2 * Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100))) - 1;
                        }
                    }
                    if (document.myform.skill.value == 29) {
                        temp = (Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) * 4 + Math.ceil(256 * 13 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) - 1) / 5;
                        if (parseInt(temp) == parseFloat(temp)) {
                            temp = temp + ".0";
                        }
                        breakpoints[breakpoints.length] = temp;
                        if ((OIAS > 70) && (j == 0)) {
                            temp = (Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) * 4 + Math.ceil(256 * 13 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) - 1) / 5;
                            if (parseInt(temp) == parseFloat(temp)) {
                                temp = temp + ".0";
                            }
                            breakpoints2[breakpoints2.length] = temp;
                        }
                    }
                    if ((document.myform.skill.value != 26) && (document.myform.skill.value != 29)) {
                        var tempframe = 12;
                        var tempframe2 = 10;
                        // Bear
                        if (document.myform.charform.value == 2) {
                            tempframe = 13;
                            tempframe2 = 9;
                        }
                        if (attackSkill.animation == 6) {
                            tempframe = 10;
                        }
                        breakpoints[breakpoints.length] = Math.ceil(256 * tempframe / Math.floor(Math.floor(256 * tempframe2 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * AnimSpeed / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) - 1;
                        if ((OIAS > 70) && (j == 0)) {
                            breakpoints2[breakpoints2.length] = Math.ceil(256 * tempframe / Math.floor(Math.floor(256 * tempframe2 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * AnimSpeed / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) - 1;
                        }
                    }
                }
            }
            for (k = 0; k <= 14; k++) {
                if ((parseInt(WIAS / 5) != parseFloat(WIAS / 5)) && (document.myform.skill.value == 26)) {
                    breakpoints[breakpoints.length] = Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100)) + Math.ceil((256 * 13 - Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100) * Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100))) / (2 * Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100))) - 1;
                }
                if ((parseInt(WIAS / 5) != parseFloat(WIAS / 5)) && (document.myform.skill.value == 29)) {
                    temp = (Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 175) / 100)) * 4 + Math.ceil(256 * 13 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 175) / 100)) - 1) / 5;
                    if (parseInt(temp) == parseFloat(temp)) {
                        temp = temp + ".0";
                    }
                    breakpoints[breakpoints.length] = temp;
                }
                if ((parseInt(WIAS / 5) != parseFloat(WIAS / 5)) && (document.myform.skill.value != 26) && (document.myform.skill.value != 29)) {
                    breakpoints[breakpoints.length] = Math.ceil(256 * tempframe / Math.floor(Math.floor(256 * tempframe2 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * AnimSpeed / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100)) - 1;
                }
            }
            TabFenster = window.open("", "Tabelle", "width=900,height=650,screenX=110,screenY=80,dependent=yes,scrollbars=yes")
            SchreibeDaten();
            TabFenster.document.write('</table><p align="center">Your primary weapon&rsquo;s WIAS is plotted vertically, your equipment&rsquo;s IAS is plotted horizontally.</p>');
            TabFenster.document.write('<table style="border-collapse:collapse" align="center" border="1" cellpadding="0" cellspacing="0"><tr><td style="border-width:1px; border-style:solid; border-color:#FFFFFF" class="wertitle" width="60" align="center">---</td>');
            for (i = 0; i <= 14; i++) {
                TabFenster.document.write('<td style="border-width:1px; border-style:solid; border-color:#FFFFFF" class="wertitle" width="40" align="center">' + 5 * i + '</td>');
            }
            if (OIAS > 70) {
                TabFenster.document.write('<td style="border-width:1px; border-style:solid; border-color:#FFFFFF" class="wertitle" width="40" align="center">' + OIAS + '</td>');
            }
            TabFenster.document.write('</tr><tr>');
            // table rows
            for (j = 0; j <= iasRows; j++) {
                TabFenster.document.write('<td style="border-width:1px; border-style:solid; border-color:#FFFFFF" class="wertitle" align="center">' + 5 * j + '</td>');
                for (i = 15 * j; i <= 15 * (j + 1) - 1; i++) {
                    if ((OIAS == (i - 15 * j) * 5) && (WIAS == j * 5)) {
                        TabFenster.document.write('<td style="border-width:1px; border-style:solid; border-color:#FFFFFF" class="auswahl" align="center"><b>' + breakpoints[i] + '</b></td>');
                    } else {
                        if ((OIAS == (i - 15 * j) * 5) || (WIAS == j * 5)) {
                            TabFenster.document.write('<td style="border-width:1px; border-style:solid; border-color:#FFFFFF" class="iaswahl" align="center">' + breakpoints[i] + '</td>');
                        } else {
                            TabFenster.document.write('<td style="border-width:1px; border-style:solid; border-color:#FFFFFF" align="center">' + breakpoints[i] + '</td>');
                        }
                    }
                }
                if (OIAS > 70) {
                    TabFenster.document.write('<td style="border-width:1px; border-style:solid; border-color:#FFFFFF" class="iaswahl" align="center">' + breakpoints2[j] + '</td>');
                }
                if (j < iasRows) {
                    TabFenster.document.write('</tr><tr>');
                }
                if ((parseInt(WIAS / 5) != parseFloat(WIAS / 5)) && (WIAS > j * 5) && (WIAS < (j + 1) * 5)) {
                    TabFenster.document.write('<td style="border-width:1px; border-style:solid; border-color:#FFFFFF" class="wertitle" align="center">' + WIAS + '</td>');
                    for (k = 0; k <= 14; k++) {
                        if (OIAS == k * 5) {
                            TabFenster.document.write('<td style="border-width:1px; border-style:solid; border-color:#FFFFFF" class="auswahl" align="center"><b>' + breakpoints[breakpoints.length - 15 + k] + '</b></td>');
                        } else {
                            TabFenster.document.write('<td style="border-width:1px; border-style:solid; border-color:#FFFFFF" class="iaswahl" align="center">' + breakpoints[breakpoints.length - 15 + k] + '</td>');
                        }
                    }
                    TabFenster.document.write('</tr><tr>');
                }
            }
            TabFenster.document.write('</tr></table><script type="text/javascript">window.setTimeout("stop()", 1000);</script');
            TabFenster.document.write('>');
        }
    }
    cap = 1;
}

/// Write Data
function SchreibeDaten() {
    TabFenster.document.write('<html><head><style type="text/css">');
    TabFenster.document.write('body { background-color:#000000; color:#FFFFFF; } .title { background-color:#45070E; color:#FFFFFF; font-weight:bold; } .wertitle { background-color:EBBE00; color:FFFFFF; font-weight:bold; } .auswahl { background-color:#BEBEBE; color:#FFFFFF; } .iaswahl { background-color:#45070E; color:#FFFFFF; }');
    TabFenster.document.write('</style></head><body><br><table align="center" border="0" cellpadding="0" cellspacing="5">');
    TabFenster.document.write('<tr><td class="title" colspan="2" align="center"><b>Data:</b></td></tr><tr><td width="130">Character:</td><td>' + document.myform.char.options[document.myform.char.selectedIndex].text + '</td></tr>');
    // Unshifted
    if (document.myform.charform.value > 0) {
        TabFenster.document.write('<tr><td>Wereform:</td><td>' + document.myform.charform.options[document.myform.charform.selectedIndex].text + '</td></tr>');
    }
    TabFenster.document.write('<tr><td>Primary Weapon:</td><td>' + document.myform.waffe.options[document.myform.waffe.selectedIndex].text + '</td></tr>');
    if (document.myform.zweitwaffe.value > 0) {
        TabFenster.document.write('<tr><td>Secondary Weapon:</td><td>' + document.myform.zweitwaffe.options[document.myform.zweitwaffe.selectedIndex].text + '</td></tr>');
    }
    TabFenster.document.write('<tr><td>Skill:</td><td>' + document.myform.skill.options[document.myform.skill.selectedIndex].text + '</td></tr>');
    TabFenster.document.write('<tr><td>IAS:</td><td>' + document.myform.IAS.options[document.myform.IAS.selectedIndex].text + '</td></tr>');
    if ((document.myform.waffe.value > 0) && (document.myform.zweitwaffe.value == 0)) {
        TabFenster.document.write('<tr><td>Weapon-IAS:</td><td>' + document.myform.wIAS1.options[document.myform.wIAS1.selectedIndex].text + '</td></tr>');
    }
    if ((document.myform.waffe.value > 0) && (document.myform.zweitwaffe.value > 0)) {
        TabFenster.document.write('<tr><td>Weapon-IAS:</td><td>' + document.myform.wIAS1.options[document.myform.wIAS1.selectedIndex].text + ' / ' + document.myform.wIAS2.options[document.myform.wIAS2.selectedIndex].text + '</td></tr>');
    }
    if (document.myform.fana.selectedIndex > 0) {
        TabFenster.document.write('<tr><td>Fanaticism:</td><td> Level ' + document.myform.fana.options[document.myform.fana.selectedIndex].text + '</td></tr>');
    }
    if (document.myform.frenzy.selectedIndex > 0) {
        TabFenster.document.write('<tr><td>Frenzy:</td><td> Level ' + document.myform.frenzy.options[document.myform.frenzy.selectedIndex].text + '</td></tr>');
    }
    // Werewolf
    if ((document.myform.charform.value == 2) && (document.myform.wolf.selectedIndex > 0)) {
        TabFenster.document.write('<tr><td>Werewolf:</td><td> Level ' + document.myform.wolf.options[document.myform.wolf.selectedIndex].text + '</td></tr>');
    }
    if (document.myform.tempo.selectedIndex > 0) {
        TabFenster.document.write('<tr><td>Burst of Speed:</td><td> Level ' + document.myform.tempo.options[document.myform.tempo.selectedIndex].text + '</td></tr>');
    }
}

/// Whirlwind
function wirbelwind(temp) {
    var temp;
    var ergebnis = 4;
    if (temp > 11) {
        ergebnis = 6;
    }
    if (temp > 14) {
        ergebnis = 8;
    }
    if (temp > 17) {
        ergebnis = 10;
    }
    if (temp > 19) {
        ergebnis = 12;
    }
    if (temp > 22) {
        ergebnis = 14;
    }
    if (temp > 25) {
        ergebnis = 16;
    }
    return ergebnis;
}

/// Calc WSM
function berechneWSM() {
    if ((document.myform.char.value != 1) && (document.myform.char.value != 2)) {
        WSMprimaer = lookupWeapon[document.myform.waffe.value][1];
    }
    if (((document.myform.char.value == 1) || (document.myform.char.value == 2)) && (document.myform.zweitwaffe.selectedIndex == 0)) {
        WSMprimaer = lookupWeapon[document.myform.waffe.value][1];
    }
    if (((document.myform.char.value == 1) || (document.myform.char.value == 2)) && (document.myform.zweitwaffe.value > 0)) {
        if (document.myform.primaerwaffe[0].checked == true) {
            WSMprimaer = parseInt((lookupWeapon[document.myform.waffe.value][1] + lookupWeapon[document.myform.zweitwaffe.value][1]) / 2);
            WSMsekundaer = parseInt((lookupWeapon[document.myform.waffe.value][1] + lookupWeapon[document.myform.zweitwaffe.value][1]) / 2) + lookupWeapon[document.myform.zweitwaffe.value][1] - lookupWeapon[document.myform.waffe.value][1];
        } else {
            WSMprimaer = parseInt((lookupWeapon[document.myform.waffe.value][1] + lookupWeapon[document.myform.zweitwaffe.value][1]) / 2) + lookupWeapon[document.myform.waffe.value][1] - lookupWeapon[document.myform.zweitwaffe.value][1];
            WSMsekundaer = parseInt((lookupWeapon[document.myform.waffe.value][1] + lookupWeapon[document.myform.zweitwaffe.value][1]) / 2);
        }
    }
}

/// Calc Effective IAS
function berechneEIAS() {
    if (document.myform.waffe.value == 0) {
        IASprimaer = parseInt(document.myform.IAS.value);
    }
    if ((document.myform.waffe.value > 0) && (document.myform.zweitwaffe.value == 0)) {
        IASprimaer = parseInt(document.myform.IAS.value) + parseInt(document.myform.wIAS1.value);
    }
    if (document.myform.zweitwaffe.value > 0) {
        IASprimaer = parseInt(document.myform.IAS.value) + parseInt(document.myform.wIAS1.value);
        IASsekundaer = parseInt(document.myform.IAS.value) + parseInt(document.myform.wIAS2.value);
    }
    EIASprimaer = Math.floor(120 * IASprimaer / (120 + IASprimaer));
    EIASsekundaer = Math.floor(120 * IASsekundaer / (120 + IASsekundaer));
}

/// Calc Skill IAS
function berechneSIAS() {
    var fana = parseInt(document.myform.fana.value);
    var frenzy = parseInt(document.myform.frenzy.value);
    var wolf = parseInt(document.myform.wolf.value);
    var tempo = parseInt(document.myform.tempo.value);
    var holyfrost = parseInt(document.myform.holyfrost.value);
    var attackSkill = data.attack[document.myform.skill.value];
    // != Wolf
    if (document.myform.charform.value != 2) wolf = 0;
    SIAS = fana + frenzy + wolf + tempo - holyfrost;
    if (document.myform.skill.value == 16) {
        SIAS = SIAS + 50;
    }
    if (document.myform.skill.value == 13) {
        SIAS = SIAS - 40;
    }
    if (document.myform.altern.checked == true) {
        SIAS = SIAS - 50;
    }
    if ((attackSkill.animation == 7) && (document.myform.char.value < 7)) {
        SIAS = SIAS - 30;
    }
}

/// init after character selection
function neuChar() {
    setzeCharform();
    setzeWaffe();
    setzeBarbschwert();
    setzeZweitwaffe();
    setzeSIAS();
    setzeSkill();
    setzeIAS();
    waffenInfo();
    berechneWerte();
}

/// init after shape shift form selection
function neuCharform() {
    setzeSkill();
    berechneWerte();
}

/// 
function neuWaffe() {
    setzeBarbschwert();
    setzeZweitwaffe();
    setzeSkill();
    waffenInfo();
    berechneWerte();
}

/// barb 1 or 2 handed
function neuBarbschwert() {
    setzeZweitwaffe();
    waffenInfo();
    berechneWerte();
}

/// 
function neuZweitwaffe() {
    setzeSkill();
    waffenInfo();
    berechneWerte();
}

/// <summary> change interval</summary>
function setzeIASstufen() {
    IASabstufung();
    berechneWerte();
}

/// update shape shift options
function setzeCharform() {
    tempForm = document.myform.charform.value;
    while (document.myform.charform.length > 0) document.myform.charform.options[0] = null;
    if (document.myform.char.value < 7) {
        for (i = 0; i < werform.length; i++) {
            neuElement = new Option(unescape(werform[i]), i);
            document.myform.charform.options[document.myform.charform.length] = neuElement;
        }
        if ((document.myform.char.value != 2) && (document.myform.char.value != 3)) document.myform.charform.options[document.myform.charform.length - 1] = null;
    } else {
        neuElement = new Option(werform[0], 0);
        document.myform.charform.options[document.myform.charform.length] = neuElement;
    }
    for (i = 0; i < document.myform.charform.length; i++) {
        if (document.myform.charform.options[i].value == tempForm) {
            document.myform.charform.selectedIndex = i;
        }
    }
}

/// set primary weapon options
function setzeWaffe() {
    console.debug('set primary weapon options');
    tempWaffe = document.myform.waffe.value;
    while (document.myform.waffe.length > 0) document.myform.waffe.options[0] = null;
    for (i = 0; i < lookupWeapon.length; i++) {
        if ((lookupWeapon[i][3] < 0) || (lookupWeapon[i][3] == document.myform.char.value)) {
            if (
                    (document.myform.char.value < 7) // player characters
                || ((document.myform.char.value == 7) && (lookupWeapon[i][2] == 7 || lookupWeapon[i][2] == 8)) // Act 1 Merc
                || ((document.myform.char.value == 8) && ((lookupWeapon[i][4] == 8) || (lookupWeapon[i][4] == 2))) // Act 2 Merc
                || ((document.myform.char.value == 9) && (lookupWeapon[i][4] == 9)) // Act 5 Merc
                || ((document.myform.char.value == 10) && (lookupWeapon[i][4] == 9) && (lookupWeapon[i][2] == 2)) // Act 3 Merc
                ) {
                neuElement = new Option(unescape(lookupWeapon[i][0]), i);
                document.myform.waffe.options[document.myform.waffe.length] = neuElement;
            }
        }
    }
    for (i = 0; i < document.myform.waffe.length; i++) {
        if (document.myform.waffe.options[i].value == tempWaffe) {
            document.myform.waffe.selectedIndex = i;
        }
    }
}

/// 
function setzeBarbschwert() {
    tempBarbschwert = document.myform.barbschwert.value;
    while (document.myform.barbschwert.length > 0) document.myform.barbschwert.options[0] = null;
    if ((document.myform.char.value == 2) && (lookupWeapon[document.myform.waffe.value][2] == 3)) {
        neuElement = new Option("two-handed", 0);
        document.myform.barbschwert.options[document.myform.barbschwert.length] = neuElement;
        neuElement = new Option("single-handed", 1);
        document.myform.barbschwert.options[document.myform.barbschwert.length] = neuElement;
    } else {
        neuElement = new Option("-", -1);
        document.myform.barbschwert.options[document.myform.barbschwert.length] = neuElement;
    }
    for (i = 0; i < document.myform.barbschwert.length; i++) {
        if (document.myform.barbschwert.options[i].value == tempBarbschwert) {
            document.myform.barbschwert.selectedIndex = i;
        }
    }
}

/// set secondary weapon options
function setzeZweitwaffe() {
    tempZweitwaffe = document.myform.zweitwaffe.value;
    while (document.myform.zweitwaffe.length > 0) document.myform.zweitwaffe.options[0] = null;
    switch (document.myform.char.value) {
        case "1":
            if (lookupWeapon[document.myform.waffe.value][2] == 1) {
                for (i = 0; i < lookupWeapon.length; i++) {
                    if ((lookupWeapon[i][3] == 1) || (lookupWeapon[i][2] == 0)) {
                        neuElement = new Option(unescape(lookupWeapon[i][0]), i);
                        document.myform.zweitwaffe.options[document.myform.zweitwaffe.length] = neuElement;
                    }
                }
            } else {
                neuElement = new Option("-", "0");
                document.myform.zweitwaffe.options[document.myform.zweitwaffe.length] = neuElement;
            }
            break;
        case "2":
            if (((lookupWeapon[document.myform.waffe.value][2] == 2) || (lookupWeapon[document.myform.waffe.value][2] == 4)) || ((lookupWeapon[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1))) {
                for (i = 0; i < lookupWeapon.length; i++) {
                    if ((lookupWeapon[i][2] == 0) || (lookupWeapon[i][2] == 3) || (((lookupWeapon[i][2] == 2) || (lookupWeapon[i][2] == 4)) && (lookupWeapon[i][3] == -1))) {
                        neuElement = new Option(unescape(lookupWeapon[i][0]), i);
                        document.myform.zweitwaffe.options[document.myform.zweitwaffe.length] = neuElement;
                    }
                }
            } else {
                neuElement = new Option("-", "0");
                document.myform.zweitwaffe.options[document.myform.zweitwaffe.length] = neuElement;
            }
            break;
        default:
            neuElement = new Option("-", "0");
            document.myform.zweitwaffe.options[document.myform.zweitwaffe.length] = neuElement;
            break;
    }
    for (i = 0; i < document.myform.zweitwaffe.length; i++) {
        if (document.myform.zweitwaffe.options[i].value == tempZweitwaffe) {
            document.myform.zweitwaffe.selectedIndex = i;
        }
    }
}

/// Updates the weapon info box with weapon type and wsm
function waffenInfo() {
    document.myform.infoWaffe1.value = unescape(waffengattung[lookupWeapon[document.myform.waffe.value][2]][11]) + " [" + lookupWeapon[document.myform.waffe.value][1] + "]";
    if (document.myform.zweitwaffe.value > 0) {
        document.myform.infoWaffe2.value = unescape(waffengattung[lookupWeapon[document.myform.zweitwaffe.value][2]][11]) + " [" + lookupWeapon[document.myform.zweitwaffe.value][1] + "]";
    } else {
        document.myform.infoWaffe2.value = "";
    }
}

/// set weapon ias options
function setzeIAS() {
    var weaponIasOptionCount = 32; // up from 24
    if (statischIAS == true) { // is ias unset bool
        statischIAS = false;
        while (document.myform.IAS.length > 0) document.myform.IAS.options[0] = null;
        for (i = 0; i <= 30 * mIAS; i++) {
            if (mIAS == 1) {
                neuElement = new Option(5 * i, 5 * i)
            };
            if (mIAS == 5) {
                neuElement = new Option(i, i)
            };
            document.myform.IAS.options[document.myform.IAS.length] = neuElement;
        }
        while (document.myform.wIAS1.length > 0) document.myform.wIAS1.options[0] = null;
        for (i = 0; i <= weaponIasOptionCount * mIAS; i++) {
            if (mIAS == 1) {
                neuElement = new Option(5 * i, 5 * i)
            };
            if (mIAS == 5) {
                neuElement = new Option(i, i)
            };
            document.myform.wIAS1.options[document.myform.wIAS1.length] = neuElement;
        }
        while (document.myform.wIAS2.length > 0) document.myform.wIAS2.options[0] = null;
        for (i = 0; i <= weaponIasOptionCount * mIAS; i++) {
            if (mIAS == 1) {
                neuElement = new Option(5 * i, 5 * i)
            };
            if (mIAS == 5) {
                neuElement = new Option(i, i)
            };
            document.myform.wIAS2.options[document.myform.wIAS2.length] = neuElement;
        }
    }
}

function isAssasinClaw(weaponId) {
    var weap = lookupWeapon[weaponId];
    return weap[2] == 1;
}

function skillOptionElement(title)
{
    var skill = data.attack.find(a => a.title === title);
    return new Option(skill.title, skill.index);
}

/// update available attack skills
function setzeSkill() {
    tempSkill = document.myform.skill.value; // save current skill selection
    while (document.getElementsByName("skill")[0].hasChildNodes()) document.getElementsByName("skill")[0].removeChild(document.getElementsByName("skill")[0].firstChild);
    var optgroup1 = document.createElement("optgroup");
    var optgroup2 = document.createElement("optgroup");
    optgroup1.label = "native attacks";
    optgroup2.label = "non-class skills";

    switch (document.myform.char.value) {
        case "0": // Amazon
            optgroup1.appendChild(skillOptionElement("Standard"));
            if (document.myform.charform.value == 0) {
                if ((lookupWeapon[document.myform.waffe.value][4] == 2) || (lookupWeapon[document.myform.waffe.value][4] == 3)) {
                    optgroup1.appendChild(skillOptionElement("Throw"));
                }
                if (lookupWeapon[document.myform.waffe.value][4] == 1) {
                    optgroup1.appendChild(skillOptionElement("Strafe"));
                }
                if ((lookupWeapon[document.myform.waffe.value][4] == 2) || (lookupWeapon[document.myform.waffe.value][2] == 5)) {
                    optgroup1.appendChild(skillOptionElement("Impale"));
                    optgroup1.appendChild(skillOptionElement("Jab"));
                    optgroup1.appendChild(skillOptionElement("Fend"));
                }
                if (lookupWeapon[document.myform.waffe.value][5] == 1) {
                    optgroup2.appendChild(skillOptionElement("Zeal"));
                }
            }
            break;
        case "1": // Assassin
            optgroup1.appendChild(skillOptionElement("Standard"));
            // not shapeshifted
            if (document.myform.charform.value == 0) {
                if ((lookupWeapon[document.myform.waffe.value][4] == 2) || (lookupWeapon[document.myform.waffe.value][4] == 3)) {
                    optgroup1.appendChild(skillOptionElement("Throw"));
                }
                optgroup1.appendChild(skillOptionElement("Laying Traps"));
                if (lookupWeapon[document.myform.waffe.value][4] != 1) {
                    optgroup1.appendChild(skillOptionElement("Tiger Strike"));
                    optgroup1.appendChild(skillOptionElement("Cobra Strike"));
                    optgroup1.appendChild(skillOptionElement("Phoenix Strike"));
                }
                if ((lookupWeapon[document.myform.waffe.value][2] == 1) || (lookupWeapon[document.myform.waffe.value][2] == 0)) {
                    optgroup1.appendChild(skillOptionElement("Fists of Fire"));
                    optgroup1.appendChild(skillOptionElement("Claws of Thunder"));
                    optgroup1.appendChild(skillOptionElement("Blades of Ice"));
                }
                if ((lookupWeapon[document.myform.waffe.value][2] == 1) && (lookupWeapon[document.myform.zweitwaffe.value][2] == 1)) {
                    optgroup1.appendChild(skillOptionElement("Dragon Claw"));
                }
                optgroup1.appendChild(skillOptionElement("Dragon Tail"));
                optgroup1.appendChild(skillOptionElement("Dragon Talon"));
                // should be weapons that can be passion runeword || POD chaos, any sin claw
                if (lookupWeapon[document.myform.waffe.value][5] == 1 || isAssasinClaw(document.myform.waffe.value)) {
                    optgroup2.appendChild(skillOptionElement("Zeal"));
                }
            }
            break;
        case "2": // Barbarian
            optgroup1.appendChild(skillOptionElement("Standard"));
            if (document.myform.charform.value == 0) {
                // primary throwing weapon
                if ((lookupWeapon[document.myform.waffe.value][4] == 2) || (lookupWeapon[document.myform.waffe.value][4] == 3)) {
                    optgroup1.appendChild(skillOptionElement("Throw"));
                }
                // offhand weapon
                if (document.myform.zweitwaffe.value > 0) {
                    optgroup1.appendChild(skillOptionElement("Double Swing"));
                    optgroup1.appendChild(skillOptionElement("Frenzy"));
                }
                // primary throwing and offhand throwing
                if (((lookupWeapon[document.myform.waffe.value][4] == 2) || (lookupWeapon[document.myform.waffe.value][4] == 3)) && ((lookupWeapon[document.myform.zweitwaffe.value][4] == 2) || (lookupWeapon[document.myform.zweitwaffe.value][4] == 3))) {
                    optgroup1.appendChild(skillOptionElement("Double Throw"));
                }
                // not bow or xbow
                if (lookupWeapon[document.myform.waffe.value][4] != 1) {
                    optgroup1.appendChild(skillOptionElement("Whirlwind"));
                    optgroup1.appendChild(skillOptionElement("Concentrate"));
                    optgroup1.appendChild(skillOptionElement("Berserk"));
                    optgroup1.appendChild(skillOptionElement("Bash"));
                    optgroup1.appendChild(skillOptionElement("Stun"));
                    //optgroup1.appendChild(skillOptionElement("Cleave"));
                }
                // can zeal
                if ((lookupWeapon[document.myform.waffe.value][5] == 1) || (lookupWeapon[document.myform.zweitwaffe.value][5] == 1)) {
                    optgroup2.appendChild(skillOptionElement("Zeal"));
                }
            }
            // wolf barb
            if (document.myform.charform.value == 2) {
                optgroup1.appendChild(skillOptionElement("Feral Rage"));
                optgroup1.appendChild(skillOptionElement("Cleave"));
            }
            break;
        case "3": // Druid
            optgroup1.appendChild(skillOptionElement("Standard"));
            if (document.myform.charform.value == 0) {
                if ((lookupWeapon[document.myform.waffe.value][4] == 2) || (lookupWeapon[document.myform.waffe.value][4] == 3)) {
                    optgroup1.appendChild(skillOptionElement("Throw"));
                }
                if (lookupWeapon[document.myform.waffe.value][5] == 1) {
                    optgroup2.appendChild(skillOptionElement("Zeal"));
                }
            }
            if (document.myform.charform.value == 1) {
                optgroup1.appendChild(skillOptionElement("Hunger"));
            }
            if (document.myform.charform.value == 2) {
                optgroup1.appendChild(skillOptionElement("Feral Rage"));
                optgroup1.appendChild(skillOptionElement("Hunger"));
                optgroup1.appendChild(skillOptionElement("Rabies"));
                optgroup1.appendChild(skillOptionElement("Fury"));
            }
            break;
        case "5": // Paladin
            optgroup1.appendChild(skillOptionElement("Standard"));
            if (document.myform.charform.value == 0) {
                if ((lookupWeapon[document.myform.waffe.value][4] == 2) || (lookupWeapon[document.myform.waffe.value][4] == 3)) {
                    optgroup1.appendChild(skillOptionElement("Throw"));
                }
                // not bow or xbow
                if (lookupWeapon[document.myform.waffe.value][4] != 1) {
                    optgroup1.appendChild(skillOptionElement("Zeal"));
                    optgroup1.appendChild(skillOptionElement("Sacrifice"));
                    optgroup1.appendChild(skillOptionElement("Vengeance"));
                    optgroup1.appendChild(skillOptionElement("Conversion"));
                }
                if ((lookupWeapon[document.myform.waffe.value][2] == 0) || (lookupWeapon[document.myform.waffe.value][2] == 2) || (lookupWeapon[document.myform.waffe.value][2] == 4)) {
                    optgroup1.appendChild(skillOptionElement("Smite"));
                }
            }
            break;
        case "7": // Merc - Rogue
            optgroup1.appendChild(skillOptionElement("Standard"));
            break;
        case "8": // Merc - Town Guard
            optgroup1.appendChild(skillOptionElement("Jab"));
            optgroup1.appendChild(skillOptionElement("Standard"));
            break;
        case "9": // Merc - Barbarian
            optgroup1.appendChild(skillOptionElement("Bash"));
            break;
        case "10": // Merc - Iron Wolves
            optgroup1.appendChild(skillOptionElement("Vengeance"));
            break;
        default: // Necromancer & Sorceress
            optgroup1.appendChild(skillOptionElement("Standard"));
            if (document.myform.charform.value == 0) {
                if ((lookupWeapon[document.myform.waffe.value][4] == 2) || (lookupWeapon[document.myform.waffe.value][4] == 3)) {
                    optgroup1.appendChild(skillOptionElement("Throw"));
                }
                if (lookupWeapon[document.myform.waffe.value][5] == 1) {
                    optgroup2.appendChild(skillOptionElement("Zeal"));
                }
            }
            break;
    }
    // add options
    if (optgroup1.hasChildNodes()) {
        document.myform.skill.appendChild(optgroup1);
    }
    if (optgroup2.hasChildNodes()) {
        document.myform.skill.appendChild(optgroup2);
    }
    // retain selected skill if still available
    for (i = 0; i < document.myform.skill.length; i++) {
        if ((document.myform.skill.options[i].value == tempSkill) && (document.myform.char.value != 8)) {
            document.myform.skill.selectedIndex = i;
        }
    }
}

/// set skill ias
function setzeSIAS() {
    // fanaticisim
    if (statischFana == true) { 
        statischFana = false;
        while (document.myform.fana.length > 0) document.myform.fana.options[0] = null;
        updateFanaValues();
    }
    // frenzy
    while (document.myform.frenzy.length > 0) document.myform.frenzy.options[0] = null;
    if (document.myform.char.value == 2) {
        updateFrenzyValues();
    } else {
        neuElement = new Option("-", 0);
        document.myform.frenzy.options[document.myform.frenzy.length] = neuElement;
    }
    // wearwolf
    while (document.myform.wolf.length > 0) document.myform.wolf.options[0] = null;
    if ((document.myform.char.value == 2) || (document.myform.char.value == 3)) {
        updateWolfValues();
    } else {
        neuElement = new Option("-", 0);
        document.myform.wolf.options[document.myform.wolf.length] = neuElement;
    }
    // burst of speed
    while (document.myform.tempo.length > 0) document.myform.tempo.options[0] = null;
    if (document.myform.char.value == 1) {
        for (i = 0; i <= 50; i++) {
            neuElement = new Option(i, Math.floor(Math.floor((110 * i) / (6 + i)) * (60 - 15) / 100) + 15);
            document.myform.tempo.options[document.myform.tempo.length] = neuElement;
            if (i == 0) {
                document.myform.tempo.options[document.myform.tempo.length - 1].value = 0;
            }
        }
    } else {
        neuElement = new Option("-", 0);
        document.myform.tempo.options[document.myform.tempo.length] = neuElement;
    }
    // holy freeze
    if (statischFrost == true) {
        statischFrost = false;
        while (document.myform.holyfrost.length > 0) document.myform.holyfrost.options[0] = null;
        updateHolyFreezeValues();
    }
}

function replaceSkillSelectOptions($select, values) {
    $select.empty();
    for (let i = 0; i < values.length; i++) {
        $select.append('<option value="' + values[i] + '">' + i + '</option>');
    }
}

function updateFanaValues() {
    var values = [];
    for (i = 0; i <= 50; i++) {
        var v = Math.floor(Math.floor((110 * i) / (6 + i)) * (40 - 10) / 100) + 10;
        if (i == 0) { 
            v = 0;
        }
        values.push(v);
    }
    var $select = jQuery("select[name=fana]");
    replaceSkillSelectOptions($select, values);
}

function updateFrenzyValues() {
    var values = [0,9,13,15,18,20,21,22,23,24,25,26,26,27,28,28,29,29,29,29,30];
    var $select = jQuery("select[name=frenzy]");
    replaceSkillSelectOptions($select, values);
}

function updateWolfValues() {
    var values = [0,36,45,52,58,62,66,69,71,74,76,78,79,81,82,83,85,85,86,87,88];
    var $select = jQuery("select[name=wolf]");
    replaceSkillSelectOptions($select, values);
}

function updateHolyFreezeValues() {
    var values = [0,14,18,20,23,25,26,27,28,29,30,31,31,32,33,33,34,34,34,34,35];
    var $select = jQuery("select[name=holyfrost]");
    replaceSkillSelectOptions($select, values);
}

/// changes the interval of ias selection drop downs between 1 and 5 
function IASabstufung() {
    statischIAS = true;
    if (mIAS == 1) {
        mIAS = 5;
    } else {
        mIAS = 1;
    }
    setzeIAS();
}

var werform = ["unchanged", "Werebear", "Werewolf"]
var startframe = [1, 0, 2, 2, 2, 2, 2, 0, 0]
// first level is weapon type number
// second level is char value
// third level: first value is "FramesPerDirection" (shape shifted frames? Zeal rollback3), second value is "frames" (full animation frames?)
var waffengattung = [
    [
        [13, 13],
        [11, 12],
        [12, 12],
        [16, 16],
        [15, 15],
        [14, 14],
        [16, 16], 0, 0, 0, 0, "unarmed"
    ],
    [
        [0, 0],
        [11, 12],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0], 0, 0, 0, 0, "claw"
    ],
    [
        [16, 16],
        [15, 15],
        [16, 16],
        [19, 19],
        [19, 19],
        [15, 15],
        [20, 20], 0, 0, [16, 16], [15, 15], "one-handed swinging weapon"
    ],
    [
        [20, 20],
        [23, 23],
        [18, 18],
        [21, 21],
        [23, 23],
        [18, 19],
        [24, 24], 0, 0, [16, 16], 0, "two-handed sword"
    ],
    [
        [15, 15],
        [15, 15],
        [16, 16],
        [19, 19],
        [19, 19],
        [17, 17],
        [19, 19], 0, [16, 16], 0, 0, "one-handed thrusting weapon"
    ],
    [
        [18, 18],
        [23, 23],
        [19, 19],
        [23, 23],
        [24, 24],
        [20, 20],
        [23, 23], 0, [16, 16], 0, 0, "spear"
    ],
    [
        [20, 20],
        [19, 19],
        [19, 19],
        [17, 17],
        [20, 20],
        [18, 18],
        [18, 18], 0, [16, 16], 0, 0, "two-handed weapon"
    ],
    [
        [14, 14],
        [16, 16],
        [15, 15],
        [16, 16],
        [18, 18],
        [16, 16],
        [17, 17],
        [15, 15], 0, 0, 0, "bow"
    ],
    [
        [20, 20],
        [21, 21],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20], [15, 15], 0, 0, 0, "crossbow"
    ],
    [16, 16, 16, 18, 20, 16, 20] // Throw
]
// used by zeal, strafe, and fend
// first level is the weapon type
// second level is the character class
var aktionsframe = [
    [8, 6, 6, 8, 8, 7, 9],
    [0, 6, 0, 0, 0, 0, 0], // claws
    [10, 7, 7, 9, 9, 7, 12],
    [12, 11, 8, 10, 11, 8, 14],
    [9, 7, 7, 8, 9, 8, 11],
    [11, 10, 9, 9, 10, 8, 13],
    [12, 9, 9, 9, 11, 9, 11],
    [6, 7, 7, 8, 9, 8, 9],
    [9, 10, 10, 10, 11, 10, 11]
]

var sequences = [
    [0, 0, 0, 0, 21, 24, 0, 0, 0],
    [0, 0, 0, 0, 18, 21, 0, 0, 0],
    [12, 12, 16, 0, 0, 0, 0, 0, 0],
    [0, 0, 17, 17, 17, 0, 0, 0, 0],
    [0, 0, 12, 0, 12, 0, 0, 0, 0]
]
// name, speed, weapon type, , weapon class, passion zeal
/* weapon types:
 * 0 = unarmed
 * 1 = claw
 * 2 = one-handed swinging weapon
 * 3 = two-handed sword
 * 4 = one-handed thrusting weapon
 * 5 = spear
 * 6 = two-handed weapon
 * 7 = bow
 * 8 = crossbow
 */
var lookupWeapon = [
    ["[unarmed]", 0, 0, -1, 0, 0],
    ["Ancient Axe", 10, 6, -1, 0, 1],
    ["Ancient Sword", 0, 2, -1, 9, 0],
    ["Arbalest", -10, 8, -1, 1, 0],
    ["Archon Staff", 10, 6, -1, 0, 1],
    ["Ashwood Bow", 0, 7, 0, 1, 0],
    ["Ataghan", -20, 2, -1, 9, 0],
    ["Axe", 10, 2, -1, 0, 1],
    ["Balanced Axe", -10, 2, -1, 3, 0],
    ["Balanced Knife", -20, 4, -1, 3, 0],
    ["Ballista", 10, 8, -1, 1, 0],
    ["Balrog Blade", 0, 3, -1, 9, 1],
    ["Balrog Spear", 10, 4, -1, 2, 0],
    ["Barbed Club", 0, 2, -1, 0, 0],
    ["Bardiche", 10, 6, -1, 8, 0],
    ["Bastard Sword", 10, 3, -1, 9, 1],
    ["Battle Axe", 10, 6, -1, 0, 1],
    ["Battle Cestus", -10, 1, 1, 0, 0],
    ["Battle Dart", 0, 4, -1, 3, 0],
    ["Battle Hammer", 20, 2, -1, 0, 1],
    ["Battle Scythe", -10, 6, -1, 8, 1],
    ["Battle Staff", 0, 6, -1, 0, 1],
    ["Battle Sword", 0, 2, -1, 9, 1],
    ["Bearded Axe", 0, 6, -1, 0, 1],
    ["Bec-de-Corbin", 0, 6, -1, 8, 1],
    ["Berserker Axe", 0, 2, -1, 0, 1],
    ["Bill", 0, 6, -1, 8, 1],
    ["Blade Bow", -10, 7, -1, 1, 0],
    ["Blade Talons", -20, 1, 1, 0, 0],
    ["Blade", -10, 4, -1, 0, 0],
    ["Bone Knife", -20, 4, -1, 0, 0],
    ["Bone Wand", -20, 2, -1, 0, 0],
    ["Brandistock", -20, 5, -1, 8, 1],
    ["Broad Axe", 0, 6, -1, 0, 1],
    ["Broad Sword", 0, 2, -1, 9, 1],
    ["Burnt Wand", 0, 2, -1, 0, 0],
    ["Caduceus", -10, 2, -1, 0, 1],
    ["Cedar Bow", 0, 7, -1, 1, 0],
    ["Cedar Staff", 10, 6, -1, 0, 1],
    ["Ceremonial Bow", 10, 7, 0, 1, 0],
    ["Ceremonial Javelin", -10, 4, 0, 2, 0],
    ["Ceremonial Pike", 20, 5, 0, 8, 1],
    ["Ceremonial Spear", 0, 5, 0, 8, 1],
    ["Cestus", 0, 1, 1, 0, 0],
    ["Champion Axe", -10, 6, -1, 0, 1],
    ["Champion Sword", -10, 3, -1, 9, 1],
    ["Chu-Ko-Nu", -60, 8, -1, 1, 0],
    ["Cinquedeas", -20, 4, -1, 0, 0],
    ["Clasped Orb", 0, 2, 6, 0, 0],
    ["Claws", -10, 1, 1, 0, 0],
    ["Claymore", 10, 3, -1, 9, 1],
    ["Cleaver", 10, 2, -1, 0, 1],
    ["Cloudy Sphere", 0, 2, 6, 0, 0],
    ["Club", -10, 2, -1, 0, 0],
    ["Colossus Blade", 5, 3, -1, 9, 1],
    ["Colossus Crossbow", 10, 8, -1, 1, 0],
    ["Colossus Sword", 10, 3, -1, 9, 1],
    ["Colossus Voulge", 10, 6, -1, 8, 1],
    ["Composite Bow", -10, 7, -1, 1, 0],
    ["Conquest Sword", 0, 2, -1, 9, 1],
    ["Crossbow", 0, 8, -1, 1, 0],
    ["Crowbill", -10, 2, -1, 0, 1],
    ["Crusader Bow", 10, 7, -1, 1, 0],
    ["Cryptic Axe", 10, 6, -1, 8, 1],
    ["Cryptic Sword", -10, 2, -1, 9, 1],
    ["Crystal Sword", 0, 2, -1, 9, 1],
    ["Crystalline Globe", -10, 2, 6, 0, 0],
    ["Cudgel", -10, 2, -1, 0, 0],
    ["Cutlass", -30, 2, -1, 9, 0],
    ["Dacian Falx", 10, 3, -1, 9, 1],
    ["Dagger", -20, 4, -1, 0, 0],
    ["Decapitator", 10, 6, -1, 0, 1],
    ["Demon Crossbow", -60, 8, -1, 1, 0],
    ["Demon Heart", 0, 2, 6, 0, 0],
    ["Devil Star", 10, 2, -1, 0, 0],
    ["Diamond Bow", 0, 7, -1, 1, 0],
    ["Dimensional Blade", 0, 2, -1, 9, 1],
    ["Dimensional Shard", 10, 2, 6, 0, 0],
    ["Dirk", 0, 4, -1, 0, 0],
    ["Divine Scepter", -10, 2, -1, 0, 1],
    ["Double Axe", 10, 2, -1, 0, 1],
    ["Double Bow", -10, 7, -1, 1, 0],
    ["Eagle Orb", -10, 2, 6, 0, 0],
    ["Edge Bow", 5, 7, -1, 1, 0],
    ["Elder Staff", 0, 6, -1, 0, 1],
    ["Eldritch Orb", -10, 2, 6, 0, 0],
    ["Elegant Blade", -10, 2, -1, 9, 0],
    ["Espandon", 0, 3, -1, 9, 0],
    ["Ettin Axe", 10, 2, -1, 0, 1],
    ["Executioner Sword", 10, 3, -1, 9, 1],
    ["Falcata", 0, 2, -1, 9, 0],
    ["Falchion", 20, 2, -1, 9, 0],
    ["Fanged Knife", -20, 4, -1, 0, 0],
    ["Fascia", 10, 1, 1, 0, 0],
    ["Feral Axe", -15, 6, -1, 0, 1],
    ["Feral Claws", -20, 1, 1, 0, 0],
    ["Flail", -10, 2, -1, 0, 1],
    ["Flamberge", -10, 3, -1, 9, 1],
    ["Flanged Mace", 0, 2, -1, 0, 0],
    ["Flying Axe", 10, 2, -1, 3, 0],
    ["Francisca", 10, 2, -1, 3, 0],
    ["Fuscina", 0, 5, -1, 8, 1],
    ["Ghost Glaive", 20, 4, -1, 2, 0],
    ["Ghost Spear", 0, 5, -1, 8, 1],
    ["Ghost Wand", 10, 2, -1, 0, 0],
    ["Giant Axe", 10, 6, -1, 0, 1],
    ["Giant Sword", 0, 3, -1, 9, 1],
    ["Giant Thresher", -10, 6, -1, 8, 1],
    ["Gladius", 0, 2, -1, 9, 0],
    ["Glaive", 20, 4, -1, 2, 0],
    ["Glorious Axe", 10, 6, -1, 0, 1],
    ["Glowing Orb", -10, 2, 6, 0, 0],
    ["Gnarled Staff", 10, 6, -1, 0, 1],
    ["Gorgon Crossbow", 0, 8, -1, 1, 0],
    ["Gothic Axe", -10, 6, -1, 0, 1],
    ["Gothic Bow", 10, 7, -1, 1, 0],
    ["Gothic Staff", 0, 6, -1, 0, 1],
    ["Gothic Sword", 10, 3, -1, 9, 1],
    ["Grand Matron Bow", 10, 7, 0, 1, 0],
    ["Grand Scepter", 10, 2, -1, 0, 0],
    ["Grave Wand", 0, 2, -1, 0, 0],
    ["Great Axe", -10, 6, -1, 0, 1],
    ["Great Bow", -10, 7, -1, 1, 0],
    ["Great Maul", 20, 6, -1, 0, 1],
    ["Great Pilum", 0, 4, -1, 2, 0],
    ["Great Poleaxe", 0, 6, -1, 8, 1],
    ["Great Sword", 10, 3, -1, 9, 1],
    ["Greater Claws", -20, 1, 1, 0, 0],
    ["Greater Talons", -30, 1, 1, 0, 0],
    ["Grim Scythe", -10, 6, -1, 8, 1],
    ["Grim Wand", 0, 2, -1, 0, 0],
    ["Halberd", 0, 6, -1, 8, 1],
    ["Hand Axe", 0, 2, -1, 0, 0],
    ["Hand Scythe", -10, 1, 1, 0, 0],
    ["Harpoon", -10, 4, -1, 2, 0],
    ["Hatchet Hands", 10, 1, 1, 0, 0],
    ["Hatchet", 0, 2, -1, 0, 0],
    ["Heavenly Stone", -10, 2, 6, 0, 0],
    ["Heavy Crossbow", 10, 8, -1, 1, 0],
    ["Highland Blade", -5, 3, -1, 9, 1],
    ["Holy Water Sprinkler", 10, 2, -1, 0, 0],
    ["Hunter's Bow", -10, 7, -1, 1, 0],
    ["Hurlbat", -10, 2, -1, 3, 0],
    ["Hydra Bow", 10, 7, -1, 1, 0],
    ["Hydra Edge", 10, 2, -1, 9, 0],
    ["Hyperion Javelin", -10, 4, -1, 2, 0],
    ["Hyperion Spear", -10, 5, -1, 8, 0],
    ["Jagged Star", 10, 2, -1, 0, 0],
    ["Jared's Stone", 10, 2, 6, 0, 0],
    ["Javelin", -10, 4, -1, 2, 0],
    ["Jo Staff", -10, 6, -1, 0, 0],
    ["Katar", -10, 1, 1, 0, 0],
    ["Knout", -10, 2, -1, 0, 1],
    ["Kris", -20, 4, -1, 0, 0],
    ["Lance", 20, 5, -1, 8, 1],
    ["Large Axe", -10, 6, -1, 0, 1],
    ["Large Siege Bow", 10, 7, -1, 1, 0],
    ["Legend Spike", -10, 4, -1, 0, 0],
    ["Legend Sword", -15, 3, -1, 9, 0],
    ["Legendary Mallet", 20, 2, -1, 0, 1],
    ["Lich Wand", -20, 2, -1, 0, 0],
    ["Light Crossbow", -10, 8, -1, 1, 0],
    ["Lochaber Axe", 10, 6, -1, 8, 0],
    ["Long Battle Bow", 10, 7, -1, 1, 0],
    ["Long Bow", 0, 7, -1, 1, 0],
    ["Long Staff", 0, 6, -1, 0, 0],
    ["Long Sword", -10, 2, -1, 9, 1],
    ["Long War Bow", 10, 7, -1, 1, 0],
    ["Mace", 0, 2, -1, 0, 0],
    ["Maiden Javelin", -10, 4, 0, 2, 0],
    ["Maiden Pike", 10, 5, 0, 8, 1],
    ["Maiden Spear", 0, 5, 0, 8, 1],
    ["Mancatcher", -20, 5, -1, 8, 1],
    ["Martel de Fer", 20, 6, -1, 0, 1],
    ["Matriarchal Bow", -10, 7, 0, 1, 0],
    ["Matriarchal Javelin", -10, 4, 0, 2, 0],
    ["Matriarchal Pike", 20, 5, 0, 8, 1],
    ["Matriarchal Spear", 0, 5, 0, 8, 1],
    ["Maul", 10, 6, -1, 0, 1],
    ["Mighty Scepter", 0, 2, -1, 0, 0],
    ["Military Axe", -10, 6, -1, 0, 1],
    ["Military Pick", -10, 2, -1, 0, 1],
    ["Mithril Point", 0, 4, -1, 0, 0],
    ["Morning Star", 10, 2, -1, 0, 0],
    ["Mythical Sword", 0, 2, -1, 9, 0],
    ["Naga", 0, 2, -1, 0, 1],
    ["Ogre Axe", 0, 6, -1, 8, 0],
    ["Ogre Maul", 10, 6, -1, 0, 1],
    ["Partizan", 10, 6, -1, 8, 1],
    ["Pellet Bow", -10, 8, -1, 1, 0],
    ["Petrified Wand", 10, 2, -1, 0, 0],
    ["Phaseblade", -30, 2, -1, 9, 1],
    ["Pike", 20, 5, -1, 8, 1],
    ["Pilum", 0, 4, -1, 2, 0],
    ["Poignard", -20, 4, -1, 0, 0],
    ["Poleaxe", 10, 6, -1, 8, 1],
    ["Polished Wand", 0, 2, -1, 0, 0],
    ["Quarterstaff", 0, 6, -1, 0, 0],
    ["Quhab", 0, 1, 1, 0, 0],
    ["Razor Bow", -10, 7, -1, 1, 0],
    ["Reflex Bow", 10, 7, 0, 1, 0],
    ["Reinforced Mace", 0, 2, -1, 0, 0],
    ["Repeating Crossbow", -40, 8, -1, 1, 0],
    ["Rondel", 0, 4, -1, 0, 0],
    ["Rune Bow", 0, 7, -1, 1, 0],
    ["Rune Scepter", 0, 2, -1, 0, 0],
    ["Rune Staff", 20, 6, -1, 0, 1],
    ["Rune Sword", -10, 2, -1, 9, 1],
    ["Runic Talons", -30, 1, 1, 0, 0],
    ["Sabre", -10, 2, -1, 9, 0],
    ["Sacred Globe", -10, 2, 6, 0, 0],
    ["Scepter", 0, 2, -1, 0, 0],
    ["Scimitar", -20, 2, -1, 9, 0],
    ["Scissors Katar", -10, 1, 1, 0, 0],
    ["Scissors Quhab", 0, 1, 1, 0, 0],
    ["Scissors Suwayyah", 0, 1, 1, 0, 0],
    ["Scourge", -10, 2, -1, 0, 1],
    ["Scythe", -10, 6, -1, 8, 1],
    ["Seraph Rod", 10, 2, -1, 0, 0],
    ["Shadow Bow", 0, 7, -1, 1, 0],
    ["Shamshir", -10, 2, -1, 9, 0],
    ["Shillelagh", 0, 6, -1, 0, 1],
    ["Short Battle Bow", 0, 7, -1, 1, 0],
    ["Short Bow", 5, 7, -1, 1, 0],
    ["Short Siege Bow", 0, 7, -1, 1, 0],
    ["Short Spear", 10, 4, -1, 2, 0],
    ["Short Staff", -10, 6, -1, 0, 0],
    ["Short Sword", 0, 2, -1, 9, 0],
    ["Short War Bow", 0, 7, -1, 1, 0],
    ["Siege Crossbow", 0, 8, -1, 1, 0],
    ["Silver-edged Axe", 0, 6, -1, 0, 1],
    ["Simbilan", 10, 4, -1, 2, 0],
    ["Small Crescent", 10, 2, -1, 0, 1],
    ["Smoked Sphere", 0, 2, 6, 0, 0],
    ["Sparkling Ball", 0, 2, 6, 0, 0],
    ["Spear", -10, 5, -1, 8, 0],
    ["Spetum", 0, 5, -1, 8, 1],
    ["Spiculum", 20, 4, -1, 2, 0],
    ["Spider Bow", 5, 7, -1, 1, 0],
    ["Spiked Club", 0, 2, -1, 0, 0],
    ["Stag Bow", 0, 7, 0, 1, 0],
    ["Stalagmite", 10, 6, -1, 0, 0],
    ["Stiletto", -10, 4, -1, 0, 0],
    ["Stygian Pike", 0, 5, -1, 8, 1],
    ["Stygian Pilum", 0, 4, -1, 2, 0],
    ["Suwayyah", 0, 1, 1, 0, 0],
    ["Swirling Crystal", 10, 2, 6, 0, 0],
    ["Tabar", 10, 6, -1, 0, 1],
    ["Thresher", -10, 6, -1, 8, 1],
    ["Throwing Axe", 10, 2, -1, 3, 0],
    ["Throwing Knife", 0, 4, -1, 3, 0],
    ["Throwing Spear", -10, 4, -1, 2, 0],
    ["Thunder Maul", 20, 6, -1, 0, 1],
    ["Tomahawk", 0, 2, -1, 0, 0],
    ["Tomb Wand", -20, 2, -1, 0, 0],
    ["Trident", 0, 5, -1, 8, 1],
    ["Truncheon", -10, 2, -1, 0, 0],
    ["Tulwar", 20, 2, -1, 9, 0],
    ["Tusk Sword", 0, 3, -1, 9, 1],
    ["Twin Axe", 10, 2, -1, 0, 1],
    ["Two-Handed Sword", 0, 3, -1, 9, 0],
    ["Tyrant Club", 0, 2, -1, 0, 0],
    ["Unearthed Wand", 0, 2, -1, 0, 0],
    ["Vortex Orb", 0, 2, 6, 0, 0],
    ["Voulge", 0, 6, -1, 8, 1],
    ["Walking Stick", -10, 6, -1, 0, 0],
    ["Wand", 0, 2, -1, 0, 0],
    ["War Axe", 0, 2, -1, 0, 1],
    ["War Club", 10, 6, -1, 0, 0],
    ["War Dart", -20, 4, -1, 3, 0],
    ["War Fist", 10, 1, 1, 0, 0],
    ["War Fork", -20, 5, -1, 8, 1],
    ["War Hammer", 20, 2, -1, 0, 1],
    ["War Javelin", -10, 4, -1, 2, 0],
    ["War Pike", 20, 5, -1, 8, 1],
    ["War Scepter", -10, 2, -1, 0, 1],
    ["War Scythe", -10, 6, -1, 8, 1],
    ["War Spear", -10, 5, -1, 8, 0],
    ["War Spike", -10, 2, -1, 0, 1],
    ["War Staff", 20, 6, -1, 0, 1],
    ["War Sword", 0, 2, -1, 9, 0],
    ["Ward Bow", 0, 7, -1, 1, 0],
    ["Winged Axe", -10, 2, -1, 3, 0],
    ["Winged Harpoon", -10, 4, -1, 2, 0],
    ["Winged Knife", -20, 4, -1, 3, 0],
    ["Wrist Blade", 0, 1, 1, 0, 0],
    ["Wrist Spike", -10, 1, 1, 0, 0],
    ["Wrist Sword", -10, 1, 1, 0, 0],
    ["Yari", 0, 5, -1, 8, 1],
    ["Yew Wand", 10, 2, -1, 0, 0],
    ["Zweihander", -10, 3, -1, 9, 1]
]

var data = {
    attack: [
        {
            title: "Standard",
            index: 0,
            animation: 1,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Throw",
            index: 1,
            animation: 2,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Impale",
            index: 2,
            animation: 7,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Jab",
            index: 3,
            animation: 7,
            sequence: 1,
            rollback: 100
        },
        {
            title: "Strafe",
            index: 4,
            animation: 0,
            sequence: 0,
            rollback: 50
        },
        {
            title: "Fend",
            index: 5,
            animation: 0,
            sequence: 0,
            rollback: 40
        },
        {
            title: "Tiger Strike",
            index: 6,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Cobra Strike",
            index: 7,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Phoenix Strike",
            index: 8,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Fists of Fire",
            index: 9,
            animation: 7,
            sequence: 2,
            rollback: 100
        },
        {
            title: "Claws of Thunder",
            index: 10,
            animation: 7,
            sequence: 2,
            rollback: 100
        },
        {
            title: "Blades of Ice",
            index: 11,
            animation: 7,
            sequence: 2,
            rollback: 100
        },
        {
            title: "Dragon Claw",
            index: 12,
            animation: 7,
            sequence: 2,
            rollback: 100
        },
        {
            title: "Dragon Tail",
            index: 13,
            animation: 3,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Dragon Talon",
            index: 14,
            animation: 3,
            sequence: 0,
            rollback: 0
        },
        {
            title: "Laying Traps",
            index: 15,
            animation: 5,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Double Swing",
            index: 16,
            animation: 7,
            sequence: 3,
            rollback: 100
        },
        {
            title: "Frenzy",
            index: 17,
            animation: 7,
            sequence: 3,
            rollback: 100
        },
        {
            title: "Double Throw",
            index: 18,
            animation: 7,
            sequence: 4,
            rollback: 100
        },
        {
            title: "Whirlwind",
            index: 19,
            animation: 7,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Concentrate",
            index: 20,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Berserk",
            index: 21,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Bash",
            index: 22,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Stun",
            index: 23,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Zeal",
            index: 24,
            animation: 0,
            sequence: 0,
            rollback: 0
        },
        {
            title: "Smite",
            index: 25,
            animation: 4,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Feral Rage",
            index: 26,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Hunger",
            index: 27,
            animation: 6,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Rabies",
            index: 28,
            animation: 6,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Fury",
            index: 29,
            animation: 0,
            sequence: 0,
            rollback: 0
        },
        {
            title: "Sacrifice",
            index: 30,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Vengeance",
            index: 31,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Conversion",
            index: 32,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Cleave",
            index: 33,
            animation: 0,
            sequence: 0,
            rollback: 100
        }
    ]
};
