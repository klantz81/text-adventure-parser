function addCharacter(id, obj) {
        var o = { id: id };
        
        for (var i in obj)
                o[i] = obj[i];
        
        
        
        o.type = "character";
        o.health = 100;
        o.moves = 0;
        o.score = 0;
        o.waiting = false;
        o.following = false;
        
        
        
        if (typeof(o.objects) == 'undefined')
                o.objects = [];
        
        if (typeof(o.adjectives) == 'undefined')
                o.adjectives = [];
        
        if (typeof(o.unlisted_adjectives) == 'undefined')
                o.unlisted_adjectives = [];
        
        
        if (typeof(o.inspect) == 'undefined') {
                o.inspect = function() {
                        return "It is "+theNoun(o.nouns[0], [], "")+" carrying:<br>"+smalllist(o);
                }
        }
        
        if (typeof(o.has) == 'undefined') {
                o.has = function(id) {
                        var list = findObjectsOnTarget(o);
                        return list.indexOf(id) > -1;
                }
        }
        
        
        
        if (typeof(o.receive) == 'undefined') {
                o.receive = function(objid) {
                        get(objid, id);
                        return theNoun(o.nouns[0], [], "")+": Received.";
                }
        }
        
        if (typeof(o.follow) == 'undefined') {
                o.follow = function() {
                        o.waiting = false;
                        o.following = true;
                        return theNoun(o.nouns[0], [], "")+": Following.";
                };
        }
        
        if (typeof(o.wait) == 'undefined') {
                o.wait = function() {
                        o.waiting = true;
                        o.following = false;
                        return theNoun(o.nouns[0], [], "")+": Waiting.";
                };
        }
        
        
        
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
