function addCharacter(id, obj) {
        
        var o = prepObject(id, "character", obj);
        
        o.health = 100;
        o.moves = 0;
        o.score = 0;
        o.waiting = false;
        o.following = false;
        
        
        if (typeof(o.inspect) == 'undefined')
                o.inspect = function() {
                        return "It is "+theNoun(o.nouns[0], [], "")+" carrying:<br>"+smalllist(o);
                }
        
        if (typeof(o.has) == 'undefined')
                o.has = function(id) {
                        return findObjectsOnTarget(o).indexOf(id) > -1;
                }
        
        
        
        if (typeof(o.receive) == 'undefined')
                o.receive = function(obj) {
                        get(obj, id);
                        return theNoun(o.nouns[0], [], "")+": Received.";
                }
        
        if (typeof(o.follow) == 'undefined')
                o.follow = function() {
                        o.waiting = false;
                        o.following = true;
                        return theNoun(o.nouns[0], [], "")+": Following.";
                };
        
        if (typeof(o.wait) == 'undefined')
                o.wait = function() {
                        o.waiting = true;
                        o.following = false;
                        return theNoun(o.nouns[0], [], "")+": Waiting.";
                };
        
        
}
