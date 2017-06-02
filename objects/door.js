function addDoor(id, obj) {
        var o = { id: id };
        
        for (var i in obj)
                o[i] = obj[i];
        
        o.type = "door";
        
        if (typeof(o.subtype) == 'undefined')
                o.subtype = "";
        
        if (typeof(o.objects) == 'undefined')
                o.objects = [];
        
        if (typeof(o.adjectives) == 'undefined')
                o.adjectives = [];
        
        if (typeof(o.unlisted_adjectives) == 'undefined')
                o.unlisted_adjectives = [];
        
        
        if (typeof(o.look_under) == "undefined") {
                o.look_under = function() {
                        return "There doesn't appear to be anything interesting.";
                };
        }
        
        if (typeof(o.look_inside) == "undefined") {
                o.look_inside = function() {
                        return "There doesn't appear to be anything interesting.";
                };
        }
        
        
        if (typeof(o.opened) == 'undefined')
                o.opened = false;
        
        if (typeof(o.locked) == 'undefined')
                o.locked = false;
        
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
                        modifyAdjectives(o.unlisted_adjectives, o.opened ? "open" : "closed");

                        return o.inspect();
                };
        
        if (typeof(o.close) == 'undefined')
                o.close = function() {
                        o.opened = false;
                        modifyAdjectives(o.unlisted_adjectives, o.opened ? "open" : "closed");
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
                                return theNoun(o.nouns[0], o.adjectives, "The")+" is open.";
                        } else {
                                if (o.locked)
                                        return theNoun(o.nouns[0], o.adjectives, "The")+" is locked.";
                                else
                                        return theNoun(o.nouns[0], o.adjectives, "The")+" is closed.";//, but it's unlocked.";
                        }
                };
                
        
        modifyAdjectives(o.unlisted_adjectives, o.opened ? "open" : "closed");
        modifyAdjectives(o.unlisted_adjectives, o.locked ? "locked" : "unlocked");
        
        if (typeof(o.nouns) != 'undefined') {
                o.plural_nouns = [];
                
                for (var j = 0; j < o.nouns.length; j++) {
                        o.plural_nouns.push(pluralize(o.nouns[j]));
                        PluralNouns.push(pluralize(o.nouns[j]));
                }
                        
                for (var j = 0; j < o.nouns.length; j++)
                        if (Nouns.indexOf(o.nouns[j].replace(/\s/, '_')) == -1)
                                Nouns.push(o.nouns[j].replace(/\s/, '_'));
                        
                for (var j = 0; j < o.plural_nouns.length; j++)
                        if (Nouns.indexOf(o.plural_nouns[j].replace(/\s/, '_')) == -1)
                                Nouns.push(o.plural_nouns[j].replace(/\s/, '_'));
        }
        
        if (typeof(o.adjectives) != 'undefined')
                for (var j = 0; j < o.adjectives.length; j++)
                        if (Adjectives.indexOf(o.adjectives[j].replace(/\s/, '_')) == -1)
                                Adjectives.push(o.adjectives[j].replace(/\s/, '_'));

        if (typeof(o.unlisted_adjectives) != 'undefined')
                for (var j = 0; j < o.unlisted_adjectives.length; j++)
                        if (Adjectives.indexOf(o.unlisted_adjectives[j].replace(/\s/, '_')) == -1)
                                Adjectives.push(o.unlisted_adjectives[j].replace(/\s/, '_'));

        Objects[id] = o;
}
