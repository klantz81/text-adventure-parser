function addItem(id, obj) {
        
        var o = prepObject(id, "item", obj);
        
        
        
        if (o.subtype == "clothing") {
                o.wear = function() {
                        if (target.has(id)) {
                                if (o.wearing)
                                        return "You are already wearing "+theNoun(o.nouns[0], o.adjectives, "the")+".";
                                o.wearing = true;
                                return "Done.";
                        } else
                                return "You don't have "+theNoun(o.nouns[0], o.adjectives, "the")+".";
                                
                };
                
                o.take_off = function() {
                        if (target.has(id)) {
                                if (!o.wearing)
                                        return "You are not wearing "+theNoun(o.nouns[0], o.adjectives, "the")+".";
                                o.wearing = false;
                                return "Done.";
                        } else
                                return "You don't have "+theNoun(o.nouns[0], o.adjectives, "the")+".";
                };
        }
        
        if (typeof(o.give) == 'undefined') {
                o.give = function(i, p) {
                        if (o.subtype == "clothing" && o.wearing)
                                return "You should take it off first.";
                        
                        var prepend = "";
                        
                        if (i == null) {
                                var characters = [];
                                for (var j in Objects)
                                        if (Objects[j].type == "character" && j != target.id)
                                                characters.push(j);

                                if (characters.length == 1) {
                                        i = characters[0];
                                        prepend = "(to "+theNoun(Objects[i].nouns[0], [], "")+")<br>";
                                }
                        }
                        
                        if (i == null) {
                                Handler.expect_answer = "inoun";
                                return "To whom?";
                        }
                        
                        if (typeof(Objects[i]) != "undefined" && Objects[i].type == "character") {
                                if (!target.has(id))
                                        return "You don't have "+theNoun(o.nouns[0], o.adjectives, "the")+".";
                                
                                if (typeof(Objects[i].receive) == "function") {
                                        return prepend + Objects[i].receive(id);
                                        
                                } else 
                                        return "You can't do that";
                                
                        } else {
                                return "You can give objects only to people.";
                        }
                        
                }
        }
        
        if (typeof(o.get) == 'undefined')
                o.get = function() {
                        if (target.has(id)) {
                                if (getParent(id) != target.id) {
                                        get(id);
                                        return "Taken.";
                                }
                                
                                return "You already have "+theNoun(o.nouns[0], o.adjectives, "the")+".";
                        }
                        get(id);
                        return "Taken.";
                };
        if (typeof(o.drop) == 'undefined')
                o.drop = function() {
                        if (o.subtype == "clothing" && o.wearing)
                                return "You should take it off first.";
                        
                        if (!target.has(id))
                                return "You don't have "+theNoun(o.nouns[0], o.adjectives, "the")+".";
                        
                        drop(id);
                        return "Dropped.";
                };
        if (typeof(o.inspect) == 'undefined' && o.subtype != "container")
                o.inspect = function() {
                        if (o.subtype == "container")
                                return "It is "+theNoun(o.nouns[0], o.adjectives, "a")+" containing:<br>"+smalllist(o);
                        else
                                return "It is "+theNoun(o.nouns[0], o.adjectives, "a")+".";
                };
        
        if (typeof(o.put) == 'undefined')
                o.put = function(i, p) {
                        if (o.subtype == "clothing" && o.wearing)
                                return "You should take it off first.";
                        
                        if (!target.has(id))
                                return "You don't have "+theNoun(o.nouns[0], o.adjectives, "the")+".";
                        
                        if (p == null) {
                                Handler.expect_answer = "pnoun";
                                return "Where do you want to put it?";
                        }
                        
                        if (p == id)
                                return "That would be interesting.";
                        
                        if (Objects[p].type != 'container' && Objects[p].type != 'room' && Objects[p].subtype != 'container')
                                return "You can't put "+theNoun(o.nouns[0], o.adjectives, "the")+" there.";
                        
                        if (!Objects[p].opened && Objects[p].type != 'room')
                                return theNoun(Objects[p].nouns[0], Objects[p].adjectives, "The")+" is not open.";
                        
                        drop(id, p);
                        return "Done.";
                };
        
                        
        
        if (o.subtype == 'container') {
                
                if (typeof(o.open) == 'undefined')
                        o.open = function(i, p) {
                                if (o.locked && p == o.key) {
                                        o.locked = false;
                                        o.opened = true;
                                        modifyAdjectives(o.unlisted_adjectives, o.opened ? "open" : "closed");
                                        modifyAdjectives(o.unlisted_adjectives, o.locked ? "locked" : "unlocked");
                                        return o.inspect();
                                }
                                
                                var o0 = findObjectsOnTarget();
                                var o1 = findObjectsInRoom();
                                
                                if (o.locked && p == null && (o0.indexOf(o.key) > -1 || o1.indexOf(o.key) > -1)) {
                                        o.locked = false;
                                        o.opened = true;
                                        modifyAdjectives(o.unlisted_adjectives, o.opened ? "open" : "closed");
                                        modifyAdjectives(o.unlisted_adjectives, o.locked ? "locked" : "unlocked");
                                        return "(with "+theNoun(Objects[o.key].nouns[0], Objects[o.key].adjectives, "the")+")<br>"+o.inspect();
                                }
                                
                                if (o.locked && !p)
                                        return "It's locked.";

                                if (o.locked && p)
                                        return "You can't open it with that!";
                                        
                                o.opened = true;
                                return o.inspect();
                        };
                
                if (typeof(o.close) == 'undefined')
                        o.close = function() {
                                o.opened = false;
                                return o.inspect();
                        };
                
                if (typeof(o.key) != 'undefined' && typeof(o.unlock) == 'undefined')
                        o.unlock = function(i, p) {
                                var o0 = findObjectsOnTarget();
                                var o1 = findObjectsInRoom();
                                
                                if (o.locked && p == null && (o0.indexOf(o.key) > -1 || o1.indexOf(o.key) > -1)) {
                                        o.locked = false;
                                        modifyAdjectives(o.unlisted_adjectives, o.opened ? "open" : "closed");
                                        modifyAdjectives(o.unlisted_adjectives, o.locked ? "locked" : "unlocked");
                                        return "(with "+theNoun(Objects[o.key].nouns[0], Objects[o.key].adjectives, "the")+")<br>"+o.inspect();
                                }
                                
                                if (p == null)
                                        return "You need a key.";
                                else if (p != o.key)
                                        return "You need the right key.";
                                o.locked = false;
                                modifyAdjectives(o.unlisted_adjectives, o.opened ? "open" : "closed");
                                modifyAdjectives(o.unlisted_adjectives, o.locked ? "locked" : "unlocked");
                                return o.inspect();
                        };
                
                if (typeof(o.key) != 'undefined' && typeof(o.lock) == 'undefined')
                        o.lock = function(i, p) {
                                if (p == null)
                                        return "You need a key.";
                                else if (p != o.key)
                                        return "You need the right key.";
                                o.opened = false;
                                o.locked = true;
                                modifyAdjectives(o.unlisted_adjectives, o.opened ? "open" : "closed");
                                modifyAdjectives(o.unlisted_adjectives, o.locked ? "locked" : "unlocked");
                                return o.inspect();
                        };
                
                if (typeof(o.inspect) == 'undefined')
                        o.inspect = function() {
                                if (o.opened) {
                                        return theNoun(o.nouns[0], o.adjectives, "The")+" is open."+(o.type == "container" || o.subtype == "container" ? ("  The contents include:<br>"+smalllist(id)) : "");
                                } else {
                                        if (o.locked)
                                                return theNoun(o.nouns[0], o.adjectives, "The")+" is locked.";
                                        else
                                                return theNoun(o.nouns[0], o.adjectives, "The")+" is closed.";//, but it's unlocked.";
                                }
                        };
                
                
                
                
                
        }
        
        
}
