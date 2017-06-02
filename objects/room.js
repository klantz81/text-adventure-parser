function addRoom(id, obj) {
        var o = { id: id };
        
        for (var i in obj)
                o[i] = obj[i];
        
        o.type = "room";
        
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
        
                
        if (typeof(o.inspect) == 'undefined')
                o.inspect = function() {
                        return "It is "+theNoun(o.nouns[0], o.adjectives, "a")+".";
                };
        
        var directions = ["north","south","east","west","northeast","southeast","southwest","northwest","starboard","port","aft","fore","up","down","in","out"];
        function setupDirection(dir, door) {
                return function() {
                        if (door)
                                if (!Objects[door].opened)
                                        return "You must first open "+theNoun(Objects[door].nouns[0], Objects[door].adjectives, "the")+".";
                                
                        target.location = dir;
                        
                        return Objects[target.location].visited ? Objects[target.location].title().toUpperCase() : (Objects[target.location].title().toUpperCase()+"<br>"+Objects[target.location].inspect());
                };
        }
        for (var j = 0; j < directions.length; j++) {
                if (typeof(o[directions[j]]) == 'string') {
                        o[directions[j]] = setupDirection(o[directions[j]], typeof(o[directions[j]+"_door"]) == "string" ? o[directions[j]+"_door"] : null);
                }
        }
        
        if (typeof(o.title) == "string") {
                var title = o.title;
                o.title = function() {
                        return title;
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
