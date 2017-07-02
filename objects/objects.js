var Nouns = ["all","everything","one","it","ones","them"]; // TODO - "her" and "him"
var PluralNouns = ["all","everything","ones","them"];
var Adjectives = ["closed","open","locked","unlocked"];

BNF.NOUN = Nouns;
BNF.ADJECTIVE = Adjectives;
        
var Objects = { };
var Characters = { };

function prepObject(id, type, obj) {
        
        var o = { id: id, type: type };
        
        for (var j in obj)
                o[j] = obj[j];
        
        
        
        if (typeof(o.subtype) == "undefined")
                o.subtype = "";
        
        if (typeof(o.objects) == "undefined")
                o.objects = [];
        
        if (typeof(o.adjectives) == "undefined")
                o.adjectives = [];
        
        if (typeof(o.unlisted_adjectives) == "undefined")
                o.unlisted_adjectives = [];
        
        
        
        if (typeof(o.hidden) == "undefined")
                o.hidden = false;
        
        
        if (typeof(o.opened) == "undefined")
                o.opened = true;
        
        if (typeof(o.locked) == "undefined")
                o.locked = false;
        
        
        if (typeof(o.look_under) == "undefined")
                o.look_under = function() {
                        return "There doesn't appear to be anything interesting.";
                };
        
        if (typeof(o.look_inside) == "undefined")
                o.look_inside = function() {
                        return "There doesn't appear to be anything interesting.";
                };
        
        
        
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
        
        if (type == "character")
                Characters[id] = o;
        
        return o;
}

/*
 * room
 * door
 * container
 * item
 *      clothing
 *      container
 * character
 * 
 * 
 */
