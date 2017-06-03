function addRoom(id, obj) {
        
        var o = prepObject(id, "room", obj);
        
                
        if (typeof(o.title) == "string") {
                var title = o.title;
                o.title = function() {
                        return title;
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
        

}
