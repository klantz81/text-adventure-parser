var Handler =  {
        log: true,
        
        init: function() {
                var el = document.getElementById('container');
                
                var div = document.createElement('div');
                div.style.fontSize = '12pt';
                div.style.padding = '4px';
                div.style.margin = '4px';
                div.innerHTML = title;
                el.insertBefore(div, el.children[el.children.length-1]);
                
                var div = document.createElement('div');
                div.style.padding = '4px';
                div.style.margin = '4px 4px 4px 24px';
                div.innerHTML = "by " + author;
                el.insertBefore(div, el.children[el.children.length-1]);
                
                document.getElementById('input').onkeydown = function(e) {
                        if (e.key == 'ArrowUp') {
                                e.preventDefault();
                                this.value = Parser.last_string;
                                this.focus();
                        }

                        if (e.key == 'Enter') {
                                var value = this.value.split(/\.|,\sand\sthen\s|\sand\sthen\s|,\sthen\s|\sthen\s/gi);
                                
                                var el = document.getElementById('container');
                                var div = document.createElement('div');
                                div.style.padding = '4px';
                                div.style.margin = '4px';
                                div.innerHTML = "&gt; "+this.value;
                                el.insertBefore(div, el.children[el.children.length-1]);
                                
                                for (var j = 0; j < value.length; j++) {
                                        if (value[j].length > 0) {
                                                var res = Parser.parse(value[j]);
                                                Handler.handle(res, j > 0);
                                        }
                                }
                                
                                this.value = "";
                                this.focus();
                                
                        }
                };
                document.getElementById('input').focus();
                
                
                Handler.handle(null);
        },
        
        updateHeader: function() {
                document.getElementById('header').innerHTML = Objects[Objects.Player.location].title()+"&nbsp;&nbsp;&nbsp;&nbsp;Score: "+Objects.Player.score+"&nbsp;&nbsp;&nbsp;&nbsp;Moves: "+Objects.Player.moves;
        },
        
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// shortcuts
        inspect: function(possibly_short) {
                if (typeof(possibly_short) != 'undefined' && possibly_short)
                        return Objects[target.location].visited ? Objects[target.location].title().toUpperCase() : (Objects[target.location].title().toUpperCase()+"<br>"+Objects[target.location].inspect());
                
                return Objects[target.location].title().toUpperCase()+"<br>"+Objects[target.location].inspect();
        },
        inventory: function() {
                return "You are carrying:<br>"+smalllist(Objects.Player);
        },
        move: function(direction) {
                var key = "";

                switch (direction) {
                        case "north": case "n": key = "north"; break;
                        case "south": case "s": key = "south"; break;
                        case "east": case "e": key = "east"; break;
                        case "west": case "w": key = "west"; break;
                        case "northeast": case "ne": key = "northeast"; break;
                        case "southeast": case "se": key = "southeast"; break;
                        case "southwest": case "sw": key = "southwest"; break;
                        case "northwest": case "nw": key = "northwest"; break;
                        case "starboard": case "sb": key = "starboard"; break;
                        case "port": key = "port"; break;
                        case "aft": key = "aft"; break;
                        case "fore": key = "fore"; break;
                        case "up": key = "up"; break;
                        case "down": key = "down"; break;
                        case "in": case "enter": key = "in"; break;
                        case "out": case "exit": key = "out"; break;
                }

                if (typeof(Objects[target.location][key]) == "function")
                        return Objects[target.location][key]();
                else
                        return "You can't go that way.";
        },
        wait: function() {
                return "Time passes...";
        },
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        
        expect_answer: null,
        
        previous_answer: null,
        previous_shortcut: null,
        previous_action: null,
        
        previous_counts: null,
        previous_nouns: null,
        previous_adjectives: null,
        previous_objects: null,
        
        previous_tcounts: null,
        previous_tnoun: null,
        previous_tadjectives: null,
        previous_tobjects: null,
        
        previous_icount: null,
        previous_inoun: null,
        previous_iadjectives: null,
        previous_iobjects: null,
        
        previous_pcount: null,
        previous_pnoun: null,
        previous_padjectives: null,
        previous_pobjects: null,
        
        previous_it:null,                                               // drop it  /  drop them
        
        handle: function(r, retain_target) {
                if (Handler.log) console.log(r);
                
                var answer = Handler.previous_answer;
                var shortcut = Handler.previous_shortcut;
                var action = Handler.previous_action;

                var counts = Handler.previous_counts;
                var nouns = Handler.previous_nouns;
                var adjectives = Handler.previous_adjectives;
                var objects = Handler.previous_objects;
                
                var tcount = Handler.previous_tcount;
                var tnoun = Handler.previous_tnoun;
                var tadjectives = Handler.previous_tadjectives;
                var tobjects = Handler.previous_tobjects;
                
                var icount = Handler.previous_icount;
                var inoun = Handler.previous_inoun;
                var iadjectives = Handler.previous_iadjectives;
                var iobjects = Handler.previous_iobjects;
                
                var pcount = Handler.previous_pcount;
                var pnoun = Handler.previous_pnoun;
                var padjectives = Handler.previous_padjectives;
                var pobjects = Handler.previous_pobjects;
                
                
                
                var response = "";
                
                if (r == null) {
                        response = Handler.inspect();

                } else if (r.success) {
                        
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  process variables
                        var answer = Handler.previous_answer = Parser.getClass("ANSWER");
                        
                        if (answer && Handler.expect_answer) {
                                
                                
                                if (Handler.expect_answer == "tnoun") {
                                        var ttnoun = Handler.previous_tnoun = Parser.getPValue("OBJECT", "NOUN");
                                        if (ttnoun)
                                                tnoun = ttnoun;
                                        var tadjectives = Handler.previous_tadjectives = Parser.getArray("ADJECTIVE");
                                        var tobjects = Handler.previous_tobjects = findCharacters(tnoun, tadjectives);
                                        
                                } else {
                                        tnoun = Handler.previous_tnoun;
                                        tadjectives = Handler.previous_tadjectives;
                                        tobjects = Handler.previous_tobjects;
                                }
                                if (tobjects.length == 1 && Objects[tobjects[0]].type == "character")
                                        target = Objects[tobjects[0]];
                                else if (!retain_target)
                                        target = Objects.Player;
                                
                                
                                
                                for (var j = 12; j >= 0; j--) {
                                        var id = "noun"+j;
                                        
                                        if (Handler.expect_answer == id) {
                                                var count = Parser.getPValue("OBJECT", "COUNT");
                                                if (count)
                                                        counts[j] = Handler.previous_counts[j] = count;
                                                else
                                                        counts[j] = Handler.previous_counts[j];
                                                
                                                var noun = Parser.getPValue("OBJECT", "NOUN");
                                                if (noun)
                                                        nouns[j] = Handler.previous_nouns[j] = noun;
                                                else
                                                        nouns[j] = Handler.previous_nouns[j];
                                                
                                                adjectives[j] = Handler.previous_adjectives[j] = Parser.getArray("ADJECTIVE");
                                                objects[j] = Handler.previous_objects[j] = findObjects(nouns[j], adjectives[j], j == 12 ? undefined : (objects[12].length == 1 ? objects[12][0] : undefined));
                                        } else {
                                                counts[j] = Handler.previous_counts[j];
                                                nouns[j] = Handler.previous_nouns[j];
                                                adjectives[j] = Handler.previous_adjectives[j];
                                                objects[j] = Handler.previous_objects[j] = findObjects(nouns[j], adjectives[j], j == 12 ? undefined : (objects[12].length == 1 ? objects[12][0] : undefined));
                                        }
                                }
                                
                                if (Handler.expect_answer == "inoun") {
                                        var ticount = Handler.previous_icount = Parser.getPValue("OBJECT", "COUNT");
                                        if (ticount)
                                                icount = ticount;
                                        var tinoun = Handler.previous_inoun = Parser.getPValue("OBJECT", "NOUN");
                                        if (tinoun)
                                                inoun = tinoun;
                                        var iadjectives = Handler.previous_iadjectives = Parser.getArray("ADJECTIVE");
                                        var iobjects = Handler.previous_iobjects = findCharacters(inoun, iadjectives);
                                        
                                } else {
                                        icount = Handler.previous_icount;
                                        inoun = Handler.previous_inoun;
                                        iadjectives = Handler.previous_iadjectives;
                                        iobjects = Handler.previous_iobjects;
                                }
                                
                                if (Handler.expect_answer == "pnoun") {
                                        var tpcount = Handler.previous_pcount = Parser.getPValue("OBJECT", "COUNT");
                                        if (tpcount)
                                                pcount = tpcount;
                                        var tpnoun = Handler.previous_pnoun = Parser.getPValue("OBJECT", "NOUN");
                                        if (tpnoun)
                                                pnoun = tpnoun;
                                        var padjectives = Handler.previous_padjectives = Parser.getArray("ADJECTIVE");
                                        var pobjects = Handler.previous_pobjects = findObjects(pnoun, padjectives);
                                        
                                } else {
                                        pcount = Handler.previous_count;
                                        pnoun = Handler.previous_pnoun;
                                        padjectives = Handler.previous_padjectives;
                                        pobjects = Handler.previous_pobjects;
                                }
                        } else {
                                var shortcut = Handler.previous_shortcut = Parser.getClass("SHORTCUT");
                                var action = Handler.previous_action = Parser.getClass("ACTION");
                                
                                
                                var tcount = Handler.previous_tcount = Parser.getPValue("TARGET_OBJECT", "COUNT");
                                var tnoun = Handler.previous_tnoun = Parser.getPValue("TARGET_OBJECT", "NOUN");
                                var tadjectives = Handler.previous_tadjectives = Parser.getPArray("TARGET_OBJECT", "ADJECTIVE");
                                var tobjects = Handler.previous_tobjects = findCharacters(tnoun, tadjectives);
                                if (tobjects.length == 1 && Objects[tobjects[0]].type == "character")
                                        target = Objects[tobjects[0]];
                                else if (!retain_target)
                                        target = Objects.Player;
                                
                                var counts = [], nouns = [], adjectives = [], objects = [];
                                
                                for (var j = 12; j >= 0; j--) {
                                        var id = "OBJECT"+j;
                                        
                                        var c = Parser.getPValue(id, "COUNT");
                                        var n = Parser.getPValue(id, "NOUN");
                                        var a = Parser.getPArray(id, "ADJECTIVE");

                                        var o = findObjects(n, a, j == 12 ? undefined : (objects[12].length == 1 ? objects[12][0] : undefined));
                                        
                                        counts[j] = c;
                                        nouns[j] = n;
                                        adjectives[j] = a;
                                        objects[j] = (n == "it" || n == "them") ? Handler.previous_it : o;
                                        
                                }
                                
                                Handler.previous_counts = counts;
                                Handler.previous_nouns = nouns;
                                Handler.previous_adjectives = adjectives;
                                Handler.previous_objects = objects;
                
                                var icount = Handler.previous_icount = Parser.getPValue("INDIRECT_OBJECT", "COUNT");
                                var inoun = Handler.previous_inoun = Parser.getPValue("INDIRECT_OBJECT", "NOUN");
                                var iadjectives = Handler.previous_iadjectives = Parser.getPArray("INDIRECT_OBJECT", "ADJECTIVE");
                                var iobjects = Handler.previous_iobjects = findCharacters(inoun, iadjectives);
                                
                                var pcount = Handler.previous_pcount = Parser.getPValue("PREPOSITION_OBJECT", "COUNT");
                                var pnoun = Handler.previous_pnoun = Parser.getPValue("PREPOSITION_OBJECT", "NOUN");
                                var padjectives = Handler.previous_padjectives = Parser.getPArray("PREPOSITION_OBJECT", "ADJECTIVE");
                                var pobjects = Handler.previous_pobjects = findObjects(pnoun, padjectives);
                        }
                        
                        if (tobjects.length == 1 && Objects[tobjects[0]].type == "character")
                                target = Objects[tobjects[0]];
                        
                        else if (tobjects.length == 1)
                                response = "You can only give commands to characters.";
                        
                        else if (tnoun && tobjects.length == 0)
                                response = "There is no such character here.";
                        
                        else if (tnoun && tobjects.length > 1) {
                                response = whichNoun(tobjects);
                                Handler.expect_answer = "tnoun";
                                
                        } else if (!retain_target)
                                target = Objects.Player;
                        
                        
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  process shortcuts
                        if (response.length < 1) {
                                if (shortcut) {
                                        Handler.expect_answer = null;
                                        
                                        Objects.Player.moves++;
                                        
                                        if (shortcut == "INSPECT_ROOM") {
                                                response = Handler.inspect();

                                        } else if (shortcut == "LIST_INVENTORY") {
                                                response = Handler.inventory();

                                        } else if (shortcut == "DIRECTION") {
                                                response = Handler.move(Parser.getValue("DIRECTION"));
                                                
                                        } else if (shortcut == "WAIT") {
                                                response = Handler.wait();
                                                
                                        }
                                        
                                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  process move
                                } else if (action == "ACTION_MOVE") {
                                        Handler.expect_answer = null;
                                        
                                        Objects.Player.moves++;
                                        
                                        response = Handler.move(Parser.getValue("DIRECTION"));
                                        
                                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  process actions
                                } else if (action) {
                                        Handler.expect_answer = null;
                                        
                                        Objects.Player.moves++;
                                        
                                        var method = action.replace(/ACTION_/, '').toLowerCase();

                                        for (var j = 0; j <= 12; j++) {                                                 // check for ambiguity
                                                if (objects[j].length > 1 && PluralNouns.indexOf(nouns[j]) == -1 && !counts[j]) {
                                                        response = whichNoun(objects[j]);
                                                        Handler.expect_answer = "noun"+j;
                                                        break;
                                                }
                                        }
                                        
                                        if (response.length < 1) {                                                      // check for ambiguity
                                                /*if (tobjects.length > 1) {
                                                        response = whichNoun(tobjects);
                                                        Handler.expect_answer = "tnoun";
                                                } else*/
                                                if (iobjects.length > 1) {
                                                        response = whichNoun(iobjects);
                                                        Handler.expect_answer = "inoun";
                                                } else if (pobjects.length > 1) {
                                                        response = whichNoun(pobjects);
                                                        Handler.expect_answer = "pnoun";
                                                        
                                                }
                                        }
                                                
                                        if (response.length < 1) {                                                      // check for items that can't be found
                                                for (var j = 0; j <= 12; j++) {
                                                        if (nouns[j] && objects[j].length == 0) {
                                                                response = "What "+theNoun(nouns[j], adjectives[j], "")+"?";
                                                                break;
                                                        }
                                                }
                                        }

                                        if (response.length < 1) {                                                      // check for items that can't be found
                                                /*if (tnoun && tobjects.length == 0)
                                                        response = "What "+theNoun(tnoun, tadjectives, "")+"?";
                                                else */
                                                if (inoun && iobjects.length == 0)
                                                        response = "What "+theNoun(inoun, iadjectives, "")+"?";
                                                else if (pnoun && pobjects.length == 0)
                                                        response = "What "+theNoun(pnoun, padjectives, "")+"?";
                                        }
                                        
                                        if (response.length < 1) {
                                                var objs = [], eobjs = [];//, oobs = [];
                                                
                                                for (var j = 12; j <= 12; j++)
                                                        for (var k = 0; k < objects[j].length; k++)
                                                                if (!counts[j] || counts[j] && k < getNumber(counts[j]))
                                                                        eobjs.push(objects[j][k]);
                                                        
                                                for (var j = 6; j <= 11; j++)
                                                        for (var k = 0; k < objects[j].length; k++)
                                                                if (!counts[j] || counts[j] && k < getNumber(counts[j]))
                                                                        eobjs.push(objects[j][k]);
                                                        
                                                for (var j = 0; j <= 5; j++)
                                                        for (var k = 0; k < objects[j].length; k++)
                                                                if (eobjs.indexOf(objects[j][k]) == -1)
                                                                        if (!counts[j] || counts[j] && k < getNumber(counts[j]))
                                                                                objs.push(objects[j][k]);

                                                
                                                Handler.previous_it = objs;
                                                
                                                var iobj = iobjects.length > 0 ? iobjects[0] : null;
                                                var pobj = pobjects.length > 0 ? pobjects[0] : null;
                                                        
                                                if (method == "wait" || method == "follow") {
                                                        response = typeof(target[method]) == "function" ? target[method](iobj, pobj) : "You can't do that.";
                                                        
                                                        
                                                } else if (objs.length == 0) {
                                                        response = "Nothing to do.";
                                                        
                                                        
                                                } else if (objs.length == 1) {
                                                        var obj = objs[0];

                                                        response = typeof(Objects[obj][method]) == "function" ? Objects[obj][method](iobj, pobj) : "You can't do that.";
                                                        
                                                        
                                                } else if (objs.length > 1) {
                                                        for (var j = 0; j < objs.length; j++) {
                                                                var obj = objs[j];
                                                                
                                                                if (typeof(Objects[obj][method]) == "function")
                                                                        response += theNoun(Objects[obj].nouns[0],Objects[obj].adjectives,"")+": "+Objects[obj][method](iobj, pobj)+"<br>";
                                                        }
                                                        if (response.length < 1)
                                                                response = "Nothing to do.";
                                                        
                                                        
                                                } else {
                                                        response = "I can't do that.";
                                                        
                                                        
                                                }
                                        }
                                } else {
                                        response = "I don't understand (1).";
                                }
                        }
                } else {
                        response = "I don't understand (2).";
                }
                
                var plot_response = Plot.update();
                
                Handler.updateHeader();
                
                var el = document.getElementById('container');
                var div = document.createElement('div');
                div.style.backgroundColor = '#eee';
                div.style.padding = '8px';
                div.style.margin = '4px';
                div.style.border = '1px solid #ddd';
                div.style.fontWeight = '400';
                div.innerHTML = response;
                el.insertBefore(div, el.children[el.children.length-1]);
                
                if (plot_response.length > 0) {
                        div = document.createElement('div');
                        div.style.backgroundColor = '#ccf';
                        div.style.padding = '8px';
                        div.style.margin = '4px';
                        div.style.border = '1px solid #ddd';
                        div.style.fontWeight = '400';
                        div.innerHTML = plot_response;
                        el.insertBefore(div, el.children[el.children.length-1]);
                }

                Objects[Objects.Player.location].visited = true;
                
		window.scrollTo(0, document.body.scrollHeight);
        }
};