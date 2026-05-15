"use strict";

//-------------------------------------------------------------- General definitions

const DEBUG = false;

const ANIMATE = 1;

const ALL_KEYS = ['hh', 'hl', 'hn', 'nv'];

//const ALL_ELEMENTS = [
//  'H', 'He',
//  'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne','Na', 'Mg', "Al", "Si", 'P', 'S', 'Cl', 'Ar',
//  'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr',
//  'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe',
//  'Cs', 'Ba',
//  'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er','Tm','Yb', 'Lu',
//  'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn',
//  "Fr", "Ra",
//  "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr",
//  "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
//  //"Uue", "Ubn"
function humanize(size) {
        var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var ord = Math.floor(Math.log(size) / Math.log(1024));
        ord = Math.min(Math.max(0, ord), units.length - 1);
        var s = Math.round((size / Math.pow(1024, ord)) * 100) / 100;
        return s + ' ' + units[ord];
}

const COLORS = {
  "bg_hydrogen": "#C5CEFF",
  "bg_alkali": "#A3B2D7",
  "bg_alkaline": "#A7C0D2",
  "bg_transition_metal":"#BBECE2",
  "bg_post_transition_metal": "#C7E1C2",
  "bg_metalloid": "#E3DFBE",
  "bg_nonmetal": "#E5C9A9",
  "bg_halogen": "#D29292",
  "bg_noble_gas": "#D26969",
  "bg_lanthanoid": "#DFF4EA",
  "bg_actinoid": "#F4D6D6",
  "bg_she": "#82E0AA",
  "bg_unknown": "#E3E3E3"
};

const elements = [
[1,"H","Hydrogen","bg_hydrogen"],
[2,"He","Helium","bg_noble_gas"],
[3,"Li","Lithium","bg_alkali"],
[4,"Be","Beryllium","bg_alkaline"],
[5,"B","Boron","bg_metalloid"],
[6,"C","Carbon","bg_nonmetal"],
[7,"N","Nitrogen","bg_nonmetal"],
[8,"O","Oxygen","bg_nonmetal"],
[9,"F","Fluorine","bg_halogen"],
[10,"Ne","Neon","bg_noble_gas"],
[11,"Na","Sodium","bg_alkali"],
[12,"Mg","Magnesium","bg_alkaline"],
[13,"Al","Aluminium","bg_post_transition_metal"],
[14,"Si","Silicon","bg_metalloid"],
[15,"P","Phosphorus","bg_nonmetal"],
[16,"S","Sulfur","bg_nonmetal"],
[17,"Cl","Chlorine","bg_halogen"],
[18,"Ar","Argon","bg_noble_gas"],
[19,"K","Potassium","bg_alkali"],
[20,"Ca","Calcium","bg_alkaline"],
[21,"Sc","Scandium","bg_transition_metal"],
[22,"Ti","Titanium","bg_transition_metal"],
[23,"V","Vanadium","bg_transition_metal"],
[24,"Cr","Chromium","bg_transition_metal"],
[25,"Mn","Manganese","bg_transition_metal"],
[26,"Fe","Iron","bg_transition_metal"],
[27,"Co","Cobalt","bg_transition_metal"],
[28,"Ni","Nickel","bg_transition_metal"],
[29,"Cu","Copper","bg_transition_metal"],
[30,"Zn","Zinc","bg_transition_metal"],
[31,"Ga","Gallium","bg_post_transition_metal"],
[32,"Ge","Germanium","bg_metalloid"],
[33,"As","Arsenic","bg_metalloid"],
[34,"Se","Selenium","bg_nonmetal"],
[35,"Br","Bromine","bg_halogen"],
[36,"Kr","Krypton","bg_noble_gas"],
[37,"Rb","Rubidium","bg_alkali"],
[38,"Sr","Strontium","bg_alkaline"],
[39,"Y","Yttrium","bg_transition_metal"],
[40,"Zr","Zirconium","bg_transition_metal"],
[41,"Nb","Niobium","bg_transition_metal"],
[42,"Mo","Molybdenum","bg_transition_metal"],
[43,"Tc","Technetium","bg_transition_metal"],
[44,"Ru","Ruthenium","bg_transition_metal"],
[45,"Rh","Rhodium","bg_transition_metal"],
[46,"Pd","Palladium","bg_transition_metal"],
[47,"Ag","Silver","bg_transition_metal"],
[48,"Cd","Cadmium","bg_transition_metal"],
[49,"In","Indium","bg_post_transition_metal"],
[50,"Sn","Tin","bg_post_transition_metal"],
[51,"Sb","Antimony","bg_metalloid"],
[52,"Te","Tellurium","bg_metalloid"],
[53,"I","Iodine","bg_halogen"],
[54,"Xe","Xenon","bg_noble_gas"],
[55,"Cs","Cesium","bg_alkali"],
[56,"Ba","Barium","bg_alkaline"],
[57,"La","Lanthanum","bg_lanthanoid"],
[58,"Ce","Cerium","bg_lanthanoid"],
[59,"Pr","Praseodym.","bg_lanthanoid"],
[60,"Nd","Neodymium","bg_lanthanoid"],
[61,"Pm","Promethium","bg_lanthanoid"],
[62,"Sm","Samarium","bg_lanthanoid"],
[63,"Eu","Europium","bg_lanthanoid"],
[64,"Gd","Gadolinium","bg_lanthanoid"],
[65,"Tb","Terbium","bg_lanthanoid"],
[66,"Dy","Dysprosium","bg_lanthanoid"],
[67,"Ho","Holmium","bg_lanthanoid"],
[68,"Er","Erbium","bg_lanthanoid"],
[69,"Tm","Thulium","bg_lanthanoid"],
[70,"Yb","Ytterbium","bg_lanthanoid"],
[71,"Lu","Lutetium","bg_lanthanoid"],
[72,"Hf","Hafnium","bg_transition_metal"],
[73,"Ta","Tantalum","bg_transition_metal"],
[74,"W","Tungsten","bg_transition_metal"],
[75,"Re","Rhenium","bg_transition_metal"],
[76,"Os","Osmium","bg_transition_metal"],
[77,"Ir","Iridium","bg_transition_metal"],
[78,"Pt","Platinum","bg_transition_metal"],
[79,"Au","Gold","bg_transition_metal"],
[80,"Hg","Mercury","bg_transition_metal"],
[81,"Tl","Thallium","bg_post_transition_metal"],
[82,"Pb","Lead","bg_post_transition_metal"],
[83,"Bi","Bismuth","bg_post_transition_metal"],
[84,"Po","Polonium","bg_post_transition_metal"],
[85,"At","Astatine","bg_halogen"],
[86,"Rn","Radon","bg_noble_gas"],
[87,"Fr","Francium","bg_alkali"],
[88,"Ra","Radium","bg_alkaline"],
[89,"Ac","Actinium","bg_actinoid"],
[90,"Th","Thorium","bg_actinoid"],
[91,"Pa","Protactinium","bg_actinoid"],
[92,"U","Uranium","bg_actinoid"],
[93,"Np","Neptunium","bg_actinoid"],
[94,"Pu","Plutonium","bg_actinoid"],
[95,"Am","Americium","bg_actinoid"],
[96,"Cm","Curium","bg_actinoid"],
[97,"Bk","Berkelium","bg_actinoid"],
[98,"Cf","Californium","bg_actinoid"],
[99,"Es","Einsteinium","bg_actinoid"],
[100,"Fm","Fermium","bg_actinoid"],
[101,"Md","Mendelev.","bg_actinoid"],
[102,"No","Nobelium","bg_actinoid"],
[103,"Lr","Lawrencium","bg_actinoid"],
[104,"Rf","Rutherford.","bg_she"],
[105,"Db","Dubnium","bg_she"],
[106,"Sg","Seaborgium","bg_she"],
[107,"Bh","Bohrium","bg_she"],
[108,"Hs","Hassium","bg_she"],
[109,"Mt","Meitnerium","bg_unknown"],
[110,"Ds","Darmstadt.","bg_unknown"],
[111,"Rg","Roentgen.","bg_unknown"],
[112,"Cn","Copernicium","bg_she"],
[113,"Nh","Nihonium","bg_unknown"],
[114,"Fl","Flerovium","bg_unknown"],
[115,"Mc","Moscovium","bg_unknown"],
[116,"Lv","Livermorium","bg_unknown"],
[117,"Ts","Tennessine","bg_unknown"],
[118,"Og","Oganesson","bg_unknown"]
];


//-------------------------------------------------------------- Pseudo Database
const pseudoDB = [
  {
    type: "nc",
    rel: "sr",
    version: "0.4",
    xc: ["PBE","PBEsol","LDA"],
    formats: ["psp8","upf","psml","html","djrepo"],
    cite: "Citation 1",
    link: "https://link.to/citation/1/"
  },
  {
    type: "nc",
    rel: "fr",
    version: "0.4",
    xc: ["PBE","PBEsol"],
    formats: ["psp8","upf","psml","html","djrepo"],
    cite: "Citation 2",
    link: "https://link.to/citation/2/"
  },
  {
    type: "paw",
    rel: "sr",
    version: "1.1",
    xc: ["PBE","LDA"],
    formats: ["xml"],
    cite: "Citation 3",
    link: "https://link.to/citation/3/"
  }
];


//-------------------------------------------------------------- Main Entry Point
var FILES = null;
var TARGZ = null;
function dojo_start() {
    // Load dictionaries from json files, set the global variables FILES and TARGZ and build the user interface.
    var a = $.getJSON("json/files.json");
    var b = $.getJSON("json/targz.json");

    $.when(a, b).done(function(v1, v2){
       // when all requests are successful
       FILES = v1[0];
       TARGZ = v2[0];
       build_ui();
    });
}

//-------------------------------------------------------------- Build User Interface
function build_ui(){
  //document.getElementById('av').style.visibility = "hidden";
  // fill the options for XCF, TABLE and FMT based on the type.
  set_options();
  load_set_info();

  var params = decodeURIComponent(window.location.search.slice(1))
              .split('&')
              .reduce(function _reduce (/*Object*/ a, /*String*/ b) {
                        b = b.split('=');
                        a[b[0]] = b[1];
                        return a;
              }, {});

  $(document).ready(function($) {
    $(".plugin:nth-of-type(2)").addClass('nth-of-type-float');
    $(".plugin:nth-of-type(5), .plugin:nth-of-type(13)").addClass('nth-of-type-margin');
    $(".plugin:nth-of-type(1), .plugin:nth-of-type(3), .plugin:nth-of-type(11), .plugin:nth-of-type(19), .plugin:nth-of-type(37), .plugin:nth-of-type(55)").addClass('nth-of-type-clear');

    //Sets what happens when element is hovered (TODO: extend to focus mode as well)
    $('.plugin')
      .hover(onEnter, onLeave)
      .on('focus', onEnter)
      .on('blur', onLeave);

    //Sets what happens when element is clicked
    $('.plugin').on('click', function() {
    
      var mythis = $(this);
      var sel = _get_pseudo_selection(mythis);
    
      if (!sel.url) {
        show_toast("Sorry but this file is not available!");
        return;
      }
    
      // 🔑 Determine mode
      var isValidation = document.getElementById("modeToggle").checked;
    
      // =========================
      // VALIDATION MODE
      // =========================
      if (isValidation) {
        const url = `/validation/${sel.element || mythis.text().trim()}.html`;
        window.open(url, '_blank');
        return;
      }
    
      // =========================
      // DOWNLOAD MODE (existing behavior)
      // =========================
    
      if (sel.fmt === 'html') {
        $.get(sel.url)
          .done(function() {
            window.location.href = sel.url;
          })
          .fail(function() {
            show_toast("File not found.");
          });
    
      } else {
        $.get(sel.url)
          .done(function() {
            window.downloadFile(sel.url);
          })
          .fail(function() {
            show_toast("File not found.");
          });
      }
    
    });

    $('.download_button').hover(
      // .hover( handlerIn, handlerOut)
      function(){
        // Download the targz file with the full table.
        var mythis = $(this);
        var sel = _get_targz_selection();

        if (sel.url) {
            mythis.css("background-color", "#44AA44");
            mythis.css("color", "#FFFFFF");
        }
        else {
            // tgz not available.
            mythis.css("background-color", "#CC4444");
            mythis.css("color", "#FFFFFF");
        }
      },
      function(){
        var mythis = $(this);
        mythis.css("background-color", "#4D4D4D");
        mythis.css("color", "#FFFFFF");
        setTimeout(function(){
          mythis.css("background-color", "#4D4D4D");
          mythis.css("color", "#FFFFFF");
        },500);
    });

    $('.download_button').on('click', function(e) {
      // Download the targz file with the full table.
      var sel = _get_targz_selection();

      if (! sel.url) {
        show_toast("Sorry but this targz is not available!");
        return;
      }

      $.get(sel.url)
        .done(function() {
            // exists code
          window.location.href = sel.url;
        })
        .fail(function() {
            // not exists code
        })
    });

    if (getParameterByName('layout') === 'light'){
      make_light();
    }

    window.downloadFile = function (sUrl) {
        //iOS devices do not support downloading.
        // We have to inform user about this.
        if (/(iP)/g.test(navigator.userAgent)) {
            alert('Your device does not support files downloading. Please try again in desktop browser.');
            return false;
        }
    
        //If in Chrome or Safari - download via virtual link click
        if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
            //Creating new link node.
            var link = document.createElement('a');
            link.href = sUrl;

            if (link.download !== undefined) {
                // Set HTML5 download attribute. This will prevent file from opening if supported.
                var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
                link.download = fileName;
            }
    
            // Dispatching click event.
            if (document.createEvent) {
                var e = document.createEvent('MouseEvents');
                e.initEvent('click', true, true);
                link.dispatchEvent(e);
                return true;
            }
        }
    
        // Force file download (whether supported by server).
        var query = '?download';

        window.open(sUrl + query, '_self');
    }
    
    window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

  });
}

//-------------------------------------------------------------- Toggle
const toggle = document.getElementById("modeToggle");

function getMode() {
  return toggle.checked ? "validation" : "download";
}

//-------------------------------------------------------------- Citation Box
function set_citation(txt) {
  // Set the text in the citation box
  var citationbox = document.getElementById('citebox');
  citationbox.innerHTML = "<div class=\"pleasecite\"><strong>PLEASE CITE</strong></div><div class=\"citation\">".concat(txt, "</div>");
}

//-------------------------------------------------------------- Warning Box
function set_warning(type,txt) {
  // type can be "info", "warning", or "success".
  // Set the text in the warning box
  let heading;
  if (type === "warning") {
    heading = "WARNING!";
  }
  else if (type === "info") {
    heading = "NOTE:";
  }
  else {
    heading = "SUCCESS!";
  };
  var warningbox = document.getElementById('warning_box');
  warningbox.innerHTML = `<div class="alert ${type}"><span id="cbn" class="closebtn">&times;</span><div class="warning-text"><strong>${heading}</strong> ${txt}</div></div>`;
  var close = document.getElementById("cbn");
  close.onclick = function(){
     var div = document.getElementById('warning_box');
     setTimeout(function(){div.innerHTML = "";}, 100);
  }
}

//-------------------------------------------------------------- Periodic Table
document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("periodic-table");

  if (!container) {
    console.error("Periodic table container not found");
    return;
  }

  elements.forEach(([z,symbol,name,bg]) => {

    const id = String(z).padStart(3,"0") + "_" + symbol;

    var oc_add = "";
    if (z === 118) {
      var oc_add = `onclick="chaos()"`;
    }
    if (z === 40) {
      var oc_add = `id="zirconium"`;
    }

    const html =
`  <button class="plugin ${bg} ${id}" ${oc_add}>
    <div class="zee hide">${z}</div>
    <div class="top valence hide" id="${symbol}_nv">nv</div>
    <div class="l_top hide" id="${symbol}_hl">hl</div>
    <div class="l_middle hide" id="${symbol}_hn">hn</div>
    <div class="l_bottom hide" id="${symbol}_hh">hh</div>
    <div class="element">${symbol}</div>
    <div class="name-wrap hide">
      <div class="name hide">${name}</div>
    </div>
  </button>`;

    container.insertAdjacentHTML("beforeend", html);

  });

});

//----------------
//What happens when the cursor starts hovering over the object.
function onEnter(){
  var mythis = $(this);
  var sel = _get_pseudo_selection(mythis);

  // update the color and properties of the  X_n box.
  set_X(sel.elm, sel.color, sel.zeen);

  // If the file exists, then background-color of element is green, otherwise red.
  if (sel.url) {
      mythis.css("background-color", "#44AA44");
      mythis.css("color", "#FFFFFF");
  } else { 
      mythis.css("background-color", "#CC4444");
      mythis.css("color", "#FFFFFF");
  }
}

//----------------
// What happens when the cursor stops hovering over the object
function onLeave(){
  reset_X();
  var mythis = $(this);
  var str = mythis.attr("class");
  var res = str.split(" ");
  mythis.removeAttr("style");
  mythis.css("color", "black");
  document.getElementById('X_n').style.color = "#4B4B4D";
}


function getParameterByName(name) {
    // Extract parameter from the url
    var url = window.location.href;
    //console.log(url);
    var name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// function set_warning(txt) {
//   // Set the text in the warning box
//   var warningbox = document.getElementById('warning_box');
//   warningbox.innerHTML = "<div class='alert warning'><span id='cbn' class='closebtn'>&times;</span><strong>Warning!</strong> ".concat(txt, "</div>");
//   var close = document.getElementById("cbn");
//   close.onclick = function(){
//      var div = document.getElementById('warning_box');
//      setTimeout(function(){div.innerHTML = "";}, 100);
//   }
// }
// 
// 
// function make_light() {
//     document.getElementById('FMT').value = 'psp8'
//     const hide_classes = ["hide", "name", 'intro', "styled-longselect",
//                           "selection_bar", "help_button", "description", "menubar"];
//     for (cls of hide_class) {
//         for (tohide of document.getElementsByClassName(hide_class)) {
//             tohide.style.visibility = "hidden";
//         }
//     }
// 
//     document.getElementById('X_n').setAttribute("style","left:326px; top:91px; height:170px; width:140px;");
//     document.getElementById('N').setAttribute("style","left:326px; top:91px; height:170px; width:140px; font-size=20px");
//     document.getElementById("download_button").setAttribute("style","left:70px; top:151px; width:200px; height:55px; padding:15px");
//     elements = document.getElementsByClassName('element')
//     for (var i; i < elements.length; i++){
//        elements[i].setAttribute('style', 'font-size:24px; margin-top:12px; line-height:1; text-align:center;');
//     }
//     document.getElementById("X_el").setAttribute('style', 'margin-top:20px;');
//     document.getElementById("X_hl").setAttribute('style', 'font-size:20px; padding:2px');
//     document.getElementById("X_hn").setAttribute('style', 'font-size:20px; padding:2px');
//     document.getElementById("X_hh").setAttribute('style', 'font-size:20px; padding:2px');
//     document.getElementById("X_nv").setAttribute('style', 'font-size:20px; margin-top:-158px; padding:2px');
//     document.getElementById("det_test").setAttribute('style', 'font-size:20px; padding:2px');
//     document.getElementById("det_hints").setAttribute('style', 'font-size:20px; margin-top:5px; padding:2px');
//     document.getElementById("X_d").setAttribute('style', 'font-size:20px; padding:2px');
//     document.getElementById("X_dp").setAttribute('style', 'font-size:20px; padding:2px');
//     document.getElementById("X_gb").setAttribute('style', 'font-size:20px; padding:2px');
// }

function set_info(info) {
    var averages = {};
    var sums = {};
    for (key of ALL_KEYS) {
      averages[key] = 0.0;
      sums[key] = 0.0;
    }

    if (ANIMATE === 1){
        //console.log('in set_info with animate option');
        $('.plugin').removeClass('anim');
        $('.plugin').removeClass('chaos');
        setTimeout("$('.plugin').addClass('anim')", 10)
    }

    for (var el of elements) {
        for (const key of ALL_KEYS) {
            var id_key = el[1] + '_' + key;
            var x = document.getElementById(id_key);
            var el_info = info[el[1]];
            if (x === null) console.log("null for id_key:", id_key, "el:", el[1], "key", key, "el_info", el_info);

            var val = 'na';
            if (el_info === undefined || el_info === null) {
                val = 'na';
            }
            else {
                val = el_info[key];
                if (val === undefined || val === null) val = "na";
            }

            if (val === 'na' || val === 'nan'){
                var xx = 1;
            }
            else {
                averages[key] += parseFloat(val);
                sums[key] += 1;
            }
            x.innerHTML = val;
        }
    }

    //console.log("averages:", averages);
    //console.log("sums:", sums);

    for (var key of ALL_KEYS) {
        averages[key] = averages[key] / sums[key];
        averages[key] = averages[key].toFixed(1);
    }

    if (sums["hl"] > 0) {
        set_average(averages);
        reset_X();
    }
}


function load_set_info() {
    var type = document.getElementById('TYPE').value;
    var xcf = document.getElementById('XC').value;
    var acc = document.getElementById('ACC').value;
    //if (DEBUG) console.log("In load_set_info with type:", type, "xcf:", xcf, "table:", table);

    // Build dictionary element_symbol -> metadata.
    var meta = {};
    for (const elm of elements) {
        try {
            meta[elm[1]] = FILES[type][xcf][acc][elm[1]]["meta"];
        }
        catch (error) {
            if (DEBUG) console.log("Cannot find element:", elm[1], "with type:", type, "xcf:", xcf, "accuracy:", acc, "\n", error);
            meta[elm[1]] = {};
        }
    }
    if (DEBUG) console.log("meta:", meta);
    set_info(meta);
}


function set_X(elm, color, zee) {
    // Update parameters shown in the detail box upon hover or focus.
    var ALL_ELEMENTS = elements.map(function(value,index) { return value[1]; });
    var ielm = ALL_ELEMENTS.indexOf(elm);
    if (ielm >= 0) {
        document.getElementById('X_n').style.backgroundColor = COLORS[color];
        document.getElementById('X_z').innerHTML = zee;
        document.getElementById('X_el').innerHTML = elm;
        document.getElementById('X_name').innerHTML = elements[ielm][2];
        for (var key of ALL_KEYS) {
            var id_key = 'X_' + key;
            var id_key_in = elm + '_' + key;
            // Get the params from the pseudo associated with this element and copy to the detail box.
            var x = document.getElementById(id_key_in);
            var y = document.getElementById(id_key);
            if (color === "bg_unknown") {
                y.innerHTML = "";
                document.getElementById('X_n').style.color = "#A3A3A3";
            } else {
            y.innerHTML = x.innerHTML;
            }
        }
    }
}

function reset_X(){
    // Reset the params shown in the X_n box.
    document.getElementById('X_n').style.backgroundColor = "#ffffff";
    document.getElementById('X_z').innerHTML = 'Z';
    document.getElementById('X_nv').innerHTML = '#';
    document.getElementById('X_hl').innerHTML = 'low';
    document.getElementById('X_hn').innerHTML = 'middle';
    document.getElementById('X_hh').innerHTML = 'high';
    document.getElementById('X_el').innerHTML = 'X';
    document.getElementById('X_name').innerHTML = 'element name';
}


function set_average(vals){
    document.getElementById('av_el').innerHTML = 'Mean'
    for (var key of ALL_KEYS) {
        var node = document.getElementById("av_" + key)
        if (key === "nv") {
            node.innerHTML = "<small>n<sub>v</sub></small>" + vals[key];
        }
        else {
            node.innerHTML = vals[key];
        }
    }
}

function show_X(){
    // Show the X_n box.
    document.getElementById('X_n').style.visibility = "visible";
}


function hide_X(){
    // Hide the X_n box.
    document.getElementById('X_n').style.visibility = "hidden";
}


function humanize(size) {
	var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	var ord = Math.floor(Math.log(size) / Math.log(1024));
	ord = Math.min(Math.max(0, ord), units.length - 1);
	var s = Math.round((size / Math.pow(1024, ord)) * 100) / 100;
	return s + ' ' + units[ord];
}


function populateSelect(selectId, values) {

  const sel = document.getElementById(selectId);
  sel.innerHTML = "";

  values.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    sel.appendChild(opt);
  });

}

function updateMenus() {

  const type = document.getElementById("TYPE").value;
  const rel  = document.getElementById("REL").value;
  const ver  = document.getElementById("VER").value;
  const xc   = document.getElementById("XC").value;

  /* ----- Version ----- */

  const versions = [...new Set(
    pseudoDB
      .filter(d => d.type === type && d.rel === rel)
      .map(d => d.version)
  )];

  populateSelect("VER", versions);

  /* ----- XC ----- */

  const xcOptions = [...new Set(
    pseudoDB
      .filter(d =>
        d.type === type &&
        d.rel === rel &&
        d.version === document.getElementById("VER").value
      )
      .flatMap(d => d.xc)
  )];

  populateSelect("XC", xcOptions);

  /* ----- Format ----- */

  const formats = [...new Set(
    pseudoDB
      .filter(d =>
        d.type === type &&
        d.rel === rel &&
        d.version === document.getElementById("VER").value
      )
      .flatMap(d => d.formats)
  )];

  populateSelect("FMT", formats);

  set_citation("M. J. van Setten <i>et al.</i>, Computer Physics Communications <strong>226</strong> 39-54 (2018)");
  //set_warning("info","In v0.5, the following elements have been updated for PBE: Ba, Bi, I, Pb, Po, Rb, Rn, S, Te, Tl, Xe. Use v0.4.1 for LDA or PBEsol.");
}

window.addEventListener("load", updateMenus);
document.getElementById("TYPE").addEventListener("change", updateMenus);
document.getElementById("REL").addEventListener("change", updateMenus);
document.getElementById("VER").addEventListener("change", updateMenus);
document.getElementById("XC").addEventListener("change", updateMenus);

/*function dynamic_dropdown(type){
  // Set the values of the XC/Table/Format widgets given the pseudo type.
  if (DEBUG) console.log('dynamic dropdown: setting for type:', type);
  var table = document.getElementById("TABLE");
  var xcf = document.getElementById("XCF");
  var fmt = document.getElementById("FMT");
  // Empty options before starting.
  table.length = 0;
  xcf.length = 0;
  fmt.length = 0;

  document.getElementById('warning_box').innerHTML = "";
  //set_warning('warning',' this version is outdated')

  switch (type) {
    case "jth-sr-v2.0" :
      // List of tables
      table.options[0] = new Option("standard", "standard");
      //table.options[1] = new Option("stringent", "stringent");
      // List of XC functionals
      xcf.options[0] = new Option("PBE", "PBE");
      xcf.options[1] = new Option("LDA", "LDA");
      // List of file formats
      fmt.options[0] = new Option("xml", "xml");
      fmt.options[1] = new Option("upf", "UPF");
      fmt.options[2] = new Option("html", "html");
      //fmt.options[3] = new Option("djrepo", "djrepo");
      break;

    case "nc-sr-v0.4" :
      //set_warning(' this version is outdated')
      // List of tables
      table.options[0] = new Option("standard", "standard");
      table.options[1] = new Option("stringent", "stringent");
      //table.options[2] = new Option("f-frozen", "f-frozen");
      // List of XC functionals
      xcf.options[0] = new Option("PBE", "PBE");
      xcf.options[1] = new Option("PBEsol", "PBEsol");
      xcf.options[2] = new Option("LDA", "LDA");
      // List of file formats
      fmt.options[0] = new Option("psp8", "psp8");
      fmt.options[1] = new Option("upf", "upf");
      fmt.options[2] = new Option("psml", "psml");
      fmt.options[3] = new Option("html", "html");
      fmt.options[4] = new Option("djrepo", "djrepo");
      break;

    case "nc-fr-v0.4" :
      //set_warning(' this version is outdated')
      // List of tables
      table.options[0] = new Option("standard", "standard");
      table.options[1] = new Option("stringent", "stringent");
      // List of XC functionals
      xcf.options[0] = new Option("PBE", "PBE");
      xcf.options[1] = new Option("PBEsol", "PBEsol");
      //xcf.options[2] = new Option("LDA", "LDA");
      // List of file formats
      fmt.options[0] = new Option("psp8", "psp8");
      fmt.options[1] = new Option("upf", "upf");
      fmt.options[2] = new Option("psml", "psml");
      fmt.options[3] = new Option("html", "html");
      fmt.options[4] = new Option("djrepo", "djrepo");
      break;

    //case "nc-sr-04-3plus" :
    //  set_warning("warning," this table contains Lanthanide potentials for use in the 3+ configuration only. " +
    //            "<b>They all have the f-electrons frozen in the core.</b> " +
    //            "The hints are based on the convergence of the nitride lattice parameter, see the report under format:html for details.");
    //  table.options[0] = new Option("standard", "standard");
    //  xcf.options[0] = new Option("PBE", "PBE");
    //  fmt.options[0] = new Option("psp8", "psp8");
    //  fmt.options[1] = new Option("upf", "upf");
    //  fmt.options[2] = new Option("psml", "psml");
    //  fmt.options[3] = new Option("html", "html");
    //  fmt.options[4] = new Option("djrepo", "djrepo");
    //  break;

    //case "core" :
    //  // TODO or perhaps add new format and handle file download.
    //  document.getElementById("table").options[0] = new Option("", "standard");
    //  document.getElementById("XCF").options[0] = new Option("PBE","pbe");
    //  document.getElementById("FMT").options[2] = new Option("FC","fc");
    //  break;
    default:
      //throw 'Invalid type: ' + type;
      throw new Error(`Invalid type: ${type}`);
  }
}*/


//-------------------------------------------------------------- Select pseudo
//Finds the url and other properties of the selected pseudopotential.
function _get_pseudo_selection(dom_object){

  var str = dom_object.attr("class");
  var res = str.split(" ");
  var dum = res[2];
  var zeen = parseInt(dum.split("_")[0]);    //Atomic Z
  var color = res[1];                        //background color (e.g., bg_transition_metal)
  var res = dum.split("_");
  var elm = res[1];                          //element code (e.g., C for carbon)

  var type = $("#TYPE").val();               //NC or PAW
  var rel = $("#REL").val();                 //Relativistic treatment
  var vers = $("#VER").val();                //PD or JTH version
  var xcf = $("#XC").val();                  //XC functional
  var acc = $("#ACC").val();                 //Stringent or standard
  var fmt = $("#FMT").val();                 //Format type
  
  try {
    var url = FILES[type][xcf][acc][elm][fmt];
  } 
  catch (error) {
    var url = null;
    if (DEBUG) {
        console.log("Error in _get_pseudo_selection for elm:", elm, "type: ", type, "xcf:", xcf, "acc:", acc, "fmt:", fmt);
        console.log(error);
    }
  }

  var select = {elm: elm, url: url, type: type, xcf: xcf, acc: acc, fmt: fmt, color: color, zeen: zeen};
  if (DEBUG) {
    console.log("in _get_pseudo_selection with url:", url);
    console.log("select:", select);
  }

  return select;
}


function _get_targz_selection(){
  var type = $("#TYP").val();
  var xcf = $("#XCF").val();
  var acc = $("#ACC").val();
  var fmt = $("#FMT").val();

  try {
    var url = TARGZ[type][xcf][acc][fmt];
  } 
  catch (error) {
    console.log("Error in _get_targz_selection:", error);
    var url = null;
  }
  if (DEBUG) console.log("in _get_targz_selection with url:", url)

  return {url: url, type: type, xcf: xcf, acc: acc, fmt: fmt};
}

function set_options(){
  // fill the options for XCF TABLE and FMT based on the type.
  var typ = getParameterByName('typ');
  if (typ === null){
    typ = document.getElementById('TYPE').value;
  }
  var options = document.getElementById('TYPE').options;
  for (var i in options){
    if (options[i].value == typ){
         options[i].selected = true;
    }
  }

  // if XCF TABLE and FMT have been changed previously set them back to those selections 
  if (localStorage.getItem('selectedXCF')) {
    var options = document.getElementById('XCF').options
    for (var i in options){
       if (options[i].value == localStorage.getItem('selectedXCF')){
         options[i].selected = true;
       }
    }
  }

  if (localStorage.getItem('selectedTABLE')) {
    var options = document.getElementById('TABLE').options
    for (var i in options){
       if (options[i].value == localStorage.getItem('selectedTABLE')){
         options[i].selected = true;
       }
    }
  }

  if (localStorage.getItem('selectedFMT')) {
    var options = document.getElementById('FMT').options
    for (var i in options){
       if (options[i].value == localStorage.getItem('selectedFMT')){
         options[i].selected = true;
       }
    }
  }
}

//-------------------------------------------------------------- Guided Tour
function dojoTour_guidedtour() {
    var intro = introJs();
    intro.setOptions({
      steps: [
        {
          intro: "Welcome to the PseudoDojo! Let's go on a brief tour of the website."
        },
        {
          element: '#DojoMode',
          intro: "First stop: are you here to download pseudopotentials or to inspect the " +
                 "validation tests that went into making them? Use to toggle to select your preferred mode."
        },
        { 
          element: "#zirconium",
          intro:  "In download mode, click on an element to download its pseudopotential. " +
                  "In validation test mode, clicking on an element will open up the testing suite in a separate tab. " +
                  "In either case, if the element's box turns green, the file/testing suite is available. If it turns red, its not available."
        },
        {
          element: '#TYPE',
          intro: "Here, you'll select the type of pseudopotential— " +
                 "either norm-conserving or projector-augmented wave (PAW)."
        },
        {
          element: '#REL',
          intro: "Next, select the type of relativistic considerations. " +
                 "SR stands for scalar relativistic and FR for fully relativistic (i.e., including spin-orbit coupling). " +
                 `NOTE: Relativistic considerations in the JTH PAW datasets are a bit complicated. <a href="https://doi.org/10.1016/j.cpc.2013.12.023">Read more</a> to learn why.`
        },
        {
          element: '#VER',
          intro: "Select the most recent or prior versions of this table."
        },
        {
          element: '#XC',
          intro:  "Then, you can pick one of the available exchange-correlation functionals. " +
                  "Have a look at the F.A.Q. if your fuctional of choice is not available."
        },
        {
          element: '#ACC',
          intro:  "We offer pseudopotential tables in two degrees of accuracy—standard or stringent. " +
                  "Have a look at the F.A.Q. for a detailed description."
        },
        {
          element: '#FMT',
          intro:  "Here you can select the format of the pseudopotential file. " +
                  "Use .psp8 for ABINIT, .upf for Quantum Espresso, and .psml Siesta. " +
                  "Finally djrepo will give you all the numerical results of the valdiation tests in JSON format."
        },
        {
          element: '#X_n',
          intro:  "As long as you don't hover/focus on one of the elements, this box shows the average values " +
                  " for the table you've selected. " +
                  "Once you hover the element, the box shows the values for that element. "
        },
        {
          element: "#X_nv",
          intro:  "This is the number of orbitals included in the valence manifold (i.e., not apart of the frozen core)."
        },
        {
          element: "#LEVS",
          intro:  "These are our recommendations for the cutoff energy (e<sub>cut</sub>) in Hartree. " +
                  "The low suggestion is good for a quick calculation or as a starting point for convergence studies. " +
                  "The normal cutoff is both accurate and computationally light enough for  high-throughput calculations." +
                  "Beyond the high cutoff energy value, your results are unlikely to change significantly."
        },
        {
          element: ".download_button",
          intro:  "Alternatively, with the download button you can get a tarball with the full table, " +
                  "one pseudopotential per element."
        },
        {
          element: "#papers",
          intro:  "A list of papers using PseudoDojo pseudopotentials. Did you use them? " +
                  "Send us the DOI and we'll add yours as well."
        },
        {
          element: ".logo",
          intro:  "Finally, if you want to learn the periodic table by heart try clicking here."
        }
      ],
      showProgress: true,
      overlayOpacity: 0.3
    });

    intro.start();
}

//-------------------------------------------------------------- Small warning banners
function show_toast(text){
  Toastify({
    text: text,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}

//-------------------------------------------------------------- Make layout less stimulating
// When user clicks on Tennessine
function make_light() {
    document.getElementById('FMT').value = 'psp8'
    const hide_classes = ["hide", "name", 'intro', "styled-longselect",
                          "selection_bar", "help_button", "description", "menubar"];
    for (cls of hide_class) {
        for (tohide of document.getElementsByClassName(hide_class)) {
            tohide.style.visibility = "hidden";
        }
    }

    document.getElementById('X_n').setAttribute("style","left:326px; top:91px; height:170px; width:140px;");
    document.getElementById('N').setAttribute("style","left:326px; top:91px; height:170px; width:140px; font-size=20px");
    document.getElementById("download_button").setAttribute("style","left:70px; top:151px; width:200px; height:55px; padding:15px");
    elements = document.getElementsByClassName('element')
    for (var i; i < elements.length; i++){
       elements[i].setAttribute('style', 'font-size:24px; margin-top:12px; line-height:1; text-align:center;');
    }
    document.getElementById("X_el").setAttribute('style', 'margin-top:20px;');
    document.getElementById("X_hl").setAttribute('style', 'font-size:20px; padding:2px');
    document.getElementById("X_hn").setAttribute('style', 'font-size:20px; padding:2px');
    document.getElementById("X_hh").setAttribute('style', 'font-size:20px; padding:2px');
    document.getElementById("X_nv").setAttribute('style', 'font-size:20px; margin-top:-158px; padding:2px');
    document.getElementById("det_test").setAttribute('style', 'font-size:20px; padding:2px');
    document.getElementById("det_hints").setAttribute('style', 'font-size:20px; margin-top:5px; padding:2px');
    document.getElementById("X_d").setAttribute('style', 'font-size:20px; padding:2px');
    document.getElementById("X_dp").setAttribute('style', 'font-size:20px; padding:2px');
    document.getElementById("X_gb").setAttribute('style', 'font-size:20px; padding:2px');
}


//-------------------------------------------------------------- Easter egg
// When the user clicks on Oganesson
function chaos() {
    $('.plugin').removeClass('anim');
    $('.plugin').removeClass('chaos');
    setTimeout("$('.plugin').addClass('chaos')",10)
    var plugins = document.querySelectorAll(".plugin");
    for (var plugin of plugins) {
      animatePlugin(plugin);
    }

    function animatePlugin(plugin) {
      var xMax = 500;
      var yMax = 500;
      var x1 = Math.random() - 0.5;
      x1 = x1 * xMax;
      var x2 = Math.random() - 0.5;
      x2 = x2 * xMax;
      var y1 = Math.random() - 0.5;
      y1 = y1 * yMax;
      var y2 = Math.random() - 0.5;
      y2 = y2 * yMax;

      plugin.keyframes = [{
        opacity: 1,
        transform: "translate3d(" + x1 + "px, " + y1 + "px, 0px)"
      }, {
        opacity: 0.2,
        transform: "translate3d(" + x2 + "px, " + y2 + "px, 0px)"
      }, {
        opacity: 0.2,
        transform: "translate3d(" + -x1 + "px, " + -y1 + "px, 0px)"
      }, {
        opacity: 1,
        transform: "translate3d(" + -x2 + "px, " + -y2 + "px, 0px)"
      }];

      plugin.animProps = {
        duration: 2000 + Math.random() * 4000,
        easing: "ease-out",
        iterations: 1
      }
    var animationPlayer = plugin.animate(plugin.keyframes, plugin.animProps);
    }
}
