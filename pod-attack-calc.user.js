// ==UserScript==
// @name         Path of Diablo attack speed helper
// @namespace    http://tampermonkey.net/
// @version      3
// @description  tweak the calc for PoD use.
// @author       mmmpld
// @match        https://diablo3.ingame.de/diablo-2/calculatoren/angriffsgeschwindigkeit/*
// @grant        none
// @updateURL    https://mmmpld.github.io/pod-attack-calc/pod-attack-calc.user.js
// @downloadURL  https://mmmpld.github.io/pod-attack-calc/pod-attack-calc.user.js
// ==/UserScript==

(function() {
    'use strict';
    updateFanaValues();
    replaceIasTable();
    preventReload();
})();

/// don't reload the page when showing ias table
function preventReload() {
    jQuery('form button.btn').attr('type', 'button');
}

function replaceIasTable() {
    berechneBreakpoints = berechneBreakpoints2;
    console.log('replaced ias table function');
}

/// Show breakpoints popup
function berechneBreakpoints2() {
    console.log('show table');
    var ergebnis;
    var RBframe;
    var temp;
    var temp1;
    var OIAS = document.myform.IAS.value;
    var WIAS = document.myform.wIAS1.value;
    if (fenster == false) {
        TabFenster.close();
    }
    fenster = false;
    if ((document.myform.charform.value > 0) && ((document.myform.waffe.value == 0) || ((document.myform.zweitwaffe.value > 0) && (document.myform.skill.value == 0)))) {
        fenster = true;
    }
    cap = 0;
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
        if (((fertigkeiten[document.myform.skill.value][2] == 0) || (fertigkeiten[document.myform.skill.value][2] == 2) || (fertigkeiten[document.myform.skill.value][2] == 3) || (fertigkeiten[document.myform.skill.value][2] == 4) || (fertigkeiten[document.myform.skill.value][2] == 5)) && (fertigkeiten[document.myform.skill.value][4] == 100)) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                ergebnis = berechneFPA(frames, i, start);
                if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMprimaer < 120)) {
                    breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), ergebnis];
                    temp1 = ergebnis;
                }
            }
        }
        if ((fertigkeiten[document.myform.skill.value][2] == 1) && (document.myform.zweitwaffe.value == 0) && (fertigkeiten[document.myform.skill.value][4] == 100)) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                frames = waffengattung[waffen[document.myform.waffe.value][2]][document.myform.char.value][0];
                if ((waffen[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
                    frames = 16;
                }
                ergebnis = berechneFPA(frames, i, start);
                frames = waffengattung[waffen[document.myform.waffe.value][2]][document.myform.char.value][1];
                if ((waffen[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
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
        if ((fertigkeiten[document.myform.skill.value][2] == 1) && (document.myform.zweitwaffe.value > 0) && (fertigkeiten[document.myform.skill.value][4] == 100)) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                frames = waffengattung[waffen[document.myform.waffe.value][2]][document.myform.char.value][0];
                if ((waffen[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
                    frames = 16;
                }
                ergebnis = berechneFPA(frames, i, 0);
                frames = waffengattung[waffen[document.myform.waffe.value][2]][document.myform.char.value][1];
                if ((waffen[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
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
        if ((fertigkeiten[document.myform.skill.value][2] == 7) && (document.myform.skill.value != 19)) {
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
        if (fertigkeiten[document.myform.skill.value][4] == 0) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                if (document.myform.skill.value == 14) {
                    frames = 4;
                }
                if (document.myform.skill.value == 24) {
                    frames = aktionsframe[waffen[document.myform.waffe.value][2]][document.myform.char.value];
                }
                if ((waffen[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
                    frames = 7;
                }
                rollback1 = berechneFPA(frames, i, start);
                rollback1++;
                rollback2 = berechneFPA(frames, i, 0);
                rollback2++;
                if (document.myform.skill.value == 14) {
                    frames = 13;
                }
                if (document.myform.skill.value == 24) {
                    frames = waffengattung[waffen[document.myform.waffe.value][2]][document.myform.char.value][0];
                }
                if ((waffen[document.myform.waffe.value][2] == 3) && (document.myform.barbschwert.value == 1)) {
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
        if (fertigkeiten[document.myform.skill.value][4] == 50) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 149; i++) {
                frames = aktionsframe[waffen[document.myform.waffe.value][2]][document.myform.char.value];
                rollback1 = berechneFPA(frames, i, start);
                rollback1++;
                RBframe = Math.floor(Math.floor((256 * start + Math.floor(256 * i / 100) * rollback1) / 256) * fertigkeiten[document.myform.skill.value][4] / 100);
                rollback2 = berechneFPA(frames, i, RBframe);
                rollback2++;
                RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback2) / 256) * fertigkeiten[document.myform.skill.value][4] / 100);
                rollback3 = berechneFPA(frames, i, RBframe);
                rollback3++;
                RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback3) / 256) * fertigkeiten[document.myform.skill.value][4] / 100);
                rollback4 = berechneFPA(frames, i, RBframe);
                rollback4++;
                frames = waffengattung[waffen[document.myform.waffe.value][2]][document.myform.char.value][0];
                RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback4) / 256) * fertigkeiten[document.myform.skill.value][4] / 100);
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
        if (fertigkeiten[document.myform.skill.value][4] == 40) {
            for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                frames = aktionsframe[waffen[document.myform.waffe.value][2]][document.myform.char.value];
                rollback1 = berechneFPA(frames, i, start);
                rollback1++;
                RBframe = Math.floor(Math.floor((256 * start + Math.floor(256 * i / 100) * rollback1) / 256) * fertigkeiten[document.myform.skill.value][4] / 100);
                rollback2 = berechneFPA(frames, i, RBframe);
                rollback2++;
                frames = waffengattung[waffen[document.myform.waffe.value][2]][document.myform.char.value][0];
                RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback2) / 256) * fertigkeiten[document.myform.skill.value][4] / 100);
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
        if (fertigkeiten[document.myform.skill.value][4] == 100) {
            for (i = 0; i < breakpoints.length; i++) {
                TabFenster.document.write('<tr><td height="30" align="center">' + breakpoints[i][0] + '</td><td align="center">' + breakpoints[i][1] + '</td><td align="center">' + parseInt(2500 / (aidel + breakpoints[i][1])) / 100 + '</td></tr>');
            }
        }
        if (fertigkeiten[document.myform.skill.value][4] != 100) {
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
            frames = waffengattung[waffen[document.myform.waffe.value][2]][document.myform.char.value][0];
            if (waffen[document.myform.waffe.value][2] == 3) {
                frames = waffengattung[2][document.myform.char.value][0];
            }
            var AnimSpeed = 256;
            if (waffen[document.myform.waffe.value][2] == 1) { // assasin claws?
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
                        if (document.myform.charform.value == 2) {
                            tempframe = 13;
                            tempframe2 = 9;
                        }
                        if (fertigkeiten[document.myform.skill.value][2] == 6) {
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

function updateFanaValues() {
    var $fanaSelect = jQuery("select[name=fana]");
    $fanaSelect[0][0].value = 0;
    $fanaSelect[0][1].value = 20;
    $fanaSelect[0][2].value = 24;
    $fanaSelect[0][3].value = 27;
    $fanaSelect[0][4].value = 30;
    $fanaSelect[0][5].value = 32;
    $fanaSelect[0][6].value = 34;
    $fanaSelect[0][7].value = 35;
    $fanaSelect[0][8].value = 36;
    $fanaSelect[0][9].value = 38;
    $fanaSelect[0][10].value = 38;
    $fanaSelect[0][11].value = 39;
    $fanaSelect[0][12].value = 40;
    $fanaSelect[0][13].value = 41;
    $fanaSelect[0][14].value = 41;
    $fanaSelect[0][15].value = 42;
    $fanaSelect[0][16].value = 43;
    $fanaSelect[0][17].value = 43;
    $fanaSelect[0][18].value = 43;
    $fanaSelect[0][19].value = 44;
    $fanaSelect[0][20].value = 44;
//     $fanaSelect[0][21].value =
//     $fanaSelect[0][22].value =
//     $fanaSelect[0][23].value =
//     $fanaSelect[0][24].value =
//     $fanaSelect[0][25].value =
//     $fanaSelect[0][26].value =
//     $fanaSelect[0][27].value =
//     $fanaSelect[0][28].value =
//     $fanaSelect[0][29].value =
//     $fanaSelect[0][30].value =
//     $fanaSelect[0][31].value =
//     $fanaSelect[0][32].value =
//     $fanaSelect[0][33].value =
//     $fanaSelect[0][34].value =
//     $fanaSelect[0][35].value =
//     $fanaSelect[0][36].value =
//     $fanaSelect[0][37].value =
//     $fanaSelect[0][38].value =
//     $fanaSelect[0][39].value =
//     $fanaSelect[0][40].value =
//     $fanaSelect[0][41].value =
//     $fanaSelect[0][42].value =
//     $fanaSelect[0][43].value =
//     $fanaSelect[0][44].value =
//     $fanaSelect[0][45].value =
//     $fanaSelect[0][46].value =
//     $fanaSelect[0][47].value =
//     $fanaSelect[0][48].value =
//     $fanaSelect[0][49].value =
//     $fanaSelect[0][50].value =
}