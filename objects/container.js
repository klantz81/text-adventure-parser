function addContainer(id, obj) {
        
        var o = prepObject(id, "container", obj);
        
        
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
                                return theNoun(o.nouns[0], o.adjectives, "The")+" is open."+(o.type == "container" || o.subtype == "container" ? ("  The contents include:<br>"+smalllist(id)) : "");
                        } else {
                                if (o.locked)
                                        return theNoun(o.nouns[0], o.adjectives, "The")+" is locked.";
                                else
                                        return theNoun(o.nouns[0], o.adjectives, "The")+" is closed.";//, but it's unlocked.";
                        }
                };
        
                
        modifyAdjectives(o.unlisted_adjectives, o.opened ? "open" : "closed");
        modifyAdjectives(o.unlisted_adjectives, o.locked ? "locked" : "unlocked");

        
}
